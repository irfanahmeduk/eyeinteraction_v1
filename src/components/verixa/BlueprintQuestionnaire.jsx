"use client";

/* eslint-disable @next/next/no-img-element -- decorative SVGs exported from Figma */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ACHIEVEMENTS,
  AMBITIONS,
  CHAPTERS,
  ENVIRONMENTS,
  EXPERIENCE,
  RECOGNITION,
  RECOGNITION_NONE,
  ROLES,
  chapterSummaries,
  find,
} from "./blueprint-data";

const A = "/images/verixa/blueprint";
const BLUE = "#2563b8";

/* ------------------------------------------------------------------ */
/* Figma asset helper                                                  */
/* Places an exported SVG exactly like the Figma layer: an outer box,  */
/* an optional rotation, and the image bleeding out by `inset` (glow). */
/* ------------------------------------------------------------------ */
function FigmaAsset({ src, left, top, w, h, rotate = 0, innerW = w, innerH = h, inset = "0", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute flex items-center justify-center ${className}`}
      style={{ left, top, width: w, height: h }}
    >
      <div className="flex-none" style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
        <div className="relative" style={{ width: innerW, height: innerH }}>
          <div className="absolute" style={{ inset }}>
            <img alt="" src={src} className="block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** 29px "laptop-programming" icon used on cards and in the blueprint slots. */
function LaptopIcon({ variant, className = "" }) {
  return (
    <span aria-hidden="true" className={`absolute size-[29px] overflow-clip ${className}`}>
      <span className="absolute inset-[10.42%_8.33%]">
        <span className="absolute inset-[-3.27%_-3.1%]">
          <img alt="" src={`${A}/laptop-${variant}.svg`} className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Left panel: "This is your Career Blueprint" + chapter progress rail */
/* Coordinates are relative to the panel (Figma frame x=100, y=142).   */
/* ------------------------------------------------------------------ */
const RAIL_TOPS = [153, 276, 398, 521];
const ring = (i) => ({ src: `${A}/ring.svg`, left: 413, top: RAIL_TOPS[i], w: 36, h: 36, rotate: -90, inset: "-31.39%" });
const line = (top, h, file) => ({ src: `${A}/${file}`, left: 429, top, w: 0, h, rotate: 90, innerW: h, innerH: 0, inset: `-8px -${h === 85 ? 4.71 : 4.82}% -4px -${h === 85 ? 4.71 : 4.82}%` });

// Rail decorations per step, copied from each Figma frame.
const RAIL_STATE = [
  [{ src: `${A}/arc-quarter.svg`, left: 431, top: 153, w: 18, h: 26.674, rotate: -90, innerW: 26.674, innerH: 18, inset: "-51.67% -34.86% -51.67% -34.87%" }],
  [{ src: `${A}/arc-three-quarter.svg`, left: 415.66, top: 153, w: 33.345, h: 36, rotate: -90, innerW: 36, innerH: 33.345, inset: "-27.89% -25.83%" }],
  [ring(0)],
  [ring(0)],
  [
    line(191, 85, "line-1.svg"),
    ring(0),
    { src: `${A}/arc-half.svg`, left: 431, top: 276, w: 18, h: 36, rotate: -90, innerW: 36, innerH: 18, inset: "-51.67% -25.83%" },
  ],
  [
    line(191, 85, "line-2.svg"),
    line(314, 85, "line-2.svg"),
    ring(1),
    { src: `${A}/arc-small.svg`, left: 431, top: 398, w: 18, h: 18, rotate: -90, inset: "-51.67%" },
    ring(0),
  ],
  [line(191, 85, "line-2.svg"), line(314, 83, "line-3.svg"), line(436, 83, "line-3.svg"), ring(1), ring(2), ring(3), ring(0)],
];

// How many blueprint slots are complete (filled dark blue) at each step.
const FILLED_SLOTS = [0, 0, 0, 1, 1, 2, 3];

function BlueprintPanel({ step, answers, chips }) {
  const summaries = chapterSummaries(answers);
  const filled = FILLED_SLOTS[step];

  return (
    <aside aria-label="Your Career Blueprint" className="absolute left-0 top-0 hidden h-[709px] w-[431px] xl:block">
      <img alt="" aria-hidden="true" src={`${A}/panel-bg.svg`} className="absolute inset-0 block size-full max-w-none" />

      <p className="absolute left-[40px] top-[40px] w-[316px] text-[20px] font-semibold leading-[21px] text-[#2563b8]">
        This is your Career Blueprint
      </p>

      {[0, 1, 2, 3].map((i) => {
        const done = i < filled && summaries[i];
        return (
          <div
            key={i}
            className={`absolute left-[40px] flex h-[56px] w-[351px] items-center rounded-[10px] pl-[56px] ${
              done ? "bg-gradient-to-r from-[#114182] to-[#2563b8]" : "border border-dashed border-[#9c9c9c]"
            }`}
            style={{ top: 80 + i * 66 }}
          >
            <LaptopIcon variant={done ? "white" : "grey"} className="left-[15px] top-[13px]" />
            {done ? (
              <p className="line-clamp-2 w-[267px] text-[15px] font-medium leading-[21px] text-white">{summaries[i]}</p>
            ) : (
              <span className="sr-only">{`Chapter ${i + 1} not completed yet`}</span>
            )}
          </div>
        );
      })}

      <div className="absolute left-[40px] top-[350px] h-[319px] w-[351px] rounded-[10px] border-2 border-[#2563b8]">
        <p className="absolute left-[16px] top-[13px] text-[15px] font-semibold leading-[21px] text-[#2563b8]">Current chapter</p>
        <ul className="absolute left-[16px] top-[45px] flex w-[315px] flex-col gap-[10px]">
          {chips.map((chip) => (
            <li
              key={chip}
              className="flex items-center gap-[11px] rounded-[10px] bg-[#cce1ff] py-[17.5px] pl-[13px] pr-[16px] text-[16px] font-medium leading-[21px] text-[#2563b8]"
            >
              <img alt="" aria-hidden="true" src={`${A}/check-green.svg`} className="size-[22px] flex-none" />
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* Chapter rail 1-4 */}
      {RAIL_TOPS.map((top, i) => (
        <div key={i} className="absolute left-[413px] size-[36px]" style={{ top }}>
          <img alt="" aria-hidden="true" src={`${A}/step-circle.svg`} className="absolute inset-0 block size-full max-w-none" />
          <span className="absolute inset-0 grid place-items-center text-[16px] font-bold text-[#2563b8]">{i + 1}</span>
        </div>
      ))}
      {RAIL_STATE[step].map((shape, i) => (
        <FigmaAsset key={i} {...shape} />
      ))}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Answer cards                                                        */
/* ------------------------------------------------------------------ */
const cardBase =
  "relative flex flex-col items-start justify-start rounded-[12px] border text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300";
const cardIdle = "border-[#d4d4d4] bg-white hover:border-[#2563b8]/60";
const cardActive = "border-[#2563b8] bg-[rgba(170,206,255,0.2)]";

/** 240x130 card with icon (screen 1 and 3-column multi-select on screen 6). */
function TileCard({ option, selected, onSelect, multi = false, role = "radio" }) {
  const isNone = option.id === RECOGNITION_NONE;
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onSelect}
      className={`${cardBase} ${selected ? cardActive : cardIdle} ${isNone ? "h-[51px]" : "h-[130px]"} pl-[17px] pr-[16px] pt-[14px]`}
    >
      <span
        className={`block text-[18px] leading-[21px] tracking-[-0.5px] ${selected ? "text-[#2563b8]" : "text-[#181824]"}`}
        style={{ maxWidth: option.w }}
      >
        {option.label}
      </span>
      {selected ? (
        <img alt="" aria-hidden="true" src={`${A}/check-blue.svg`} className="absolute right-[15px] top-[14px] size-[22px]" />
      ) : multi ? (
        <img
          alt=""
          aria-hidden="true"
          src={`${A}/radio-grey.svg`}
          className={`absolute right-[16.83px] size-[20.17px] ${isNone ? "top-[16px]" : "top-[15px]"}`}
        />
      ) : null}
      {!isNone && <LaptopIcon variant={selected ? "blue" : "dark"} className="left-[17px] top-[85px]" />}
    </button>
  );
}

/** 365x72 two-column card (screens 3 and 5). */
function RowCard({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`${cardBase} ${selected ? cardActive : cardIdle} min-h-[72px] !justify-center py-[12px] pl-[17px] ${selected ? "pr-[56px]" : "pr-[15px]"}`}
    >
      <span className={`text-[18px] leading-[21px] tracking-[-0.5px] ${selected ? "text-[#2563b8]" : "text-[#181824]"}`}>
        {option.label}
      </span>
      {selected && (
        <img alt="" aria-hidden="true" src={`${A}/check-blue.svg`} className="absolute right-[17px] top-1/2 size-[22px] -translate-y-1/2" />
      )}
    </button>
  );
}

/** Photo card with dark overlay (screen 7). */
function ImageCard({ option, selected, onSelect }) {
  if (!option.image) {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className={`${cardBase} ${selected ? cardActive : cardIdle} h-[71px] px-[17px] pt-[14px] sm:col-start-1`}
      >
        <span
          className={`block text-[18px] leading-[21px] tracking-[-0.5px] ${selected ? "text-[#2563b8]" : "text-[#181824]"}`}
          style={{ maxWidth: option.w }}
        >
          {option.label}
        </span>
        <img
          alt=""
          aria-hidden="true"
          src={`${A}/${selected ? "check-blue" : "radio-grey"}.svg`}
          className={`absolute ${selected ? "right-[15px] top-[14px] size-[22px]" : "right-[16.83px] top-[16px] size-[20.17px]"}`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative flex h-[130px] flex-col items-start justify-start overflow-hidden rounded-[12px] text-left transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${
        selected ? "border-2 border-[#006cff] shadow-[0px_0px_8px_0px_#006cff]" : "border border-[#2563b8]"
      }`}
    >
      <Image
        src={`${A}/${option.image === "business" ? "ambition-card-business" : "ambition-card"}.png`}
        alt=""
        fill
        sizes="240px"
        className="pointer-events-none object-cover"
      />
      <span className="absolute inset-0 bg-[rgba(0,41,96,0.8)]" aria-hidden="true" />
      <span
        className="relative block px-[17px] pt-[14px] text-[18px] font-semibold leading-[21px] tracking-[-0.5px] text-white [text-shadow:0px_2px_2px_rgba(0,0,0,0.3)]"
        style={{ maxWidth: option.w + 17 }}
      >
        {option.label}
      </span>
      {selected ? (
        <img alt="" aria-hidden="true" src={`${A}/check-white.svg`} className="absolute right-[15px] top-[14px] size-[22px]" />
      ) : (
        <span aria-hidden="true" className="absolute right-[16.83px] top-[15px] size-[20.17px]">
          <span className="absolute inset-[-9.92%]">
            <img alt="" src={`${A}/radio-white.svg`} className="block size-full max-w-none" />
          </span>
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Experience slider (screen 2)                                        */
/* ------------------------------------------------------------------ */
const STOPS = [176, 352, 528, 700].map((px) => (px / 705) * 100); // % along the 705px track

function ExperienceSlider({ value, onChange }) {
  const trackRef = useRef(null);
  const index = Math.max(0, EXPERIENCE.findIndex((o) => o.id === value));
  const pct = STOPS[index];

  const pickFromPointer = (clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    let best = 0;
    STOPS.forEach((s, i) => {
      if (Math.abs(s - p) < Math.abs(STOPS[best] - p)) best = i;
    });
    onChange(EXPERIENCE[best].id);
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pickFromPointer(e.clientX);
  };
  const onPointerMove = (e) => {
    if (e.buttons === 1) pickFromPointer(e.clientX);
  };
  const onKeyDown = (e) => {
    const delta = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (e.key === "Home") onChange(EXPERIENCE[0].id);
    else if (e.key === "End") onChange(EXPERIENCE[EXPERIENCE.length - 1].id);
    else if (delta) onChange(EXPERIENCE[Math.min(EXPERIENCE.length - 1, Math.max(0, index + delta))].id);
    else return;
    e.preventDefault();
  };

  return (
    <div className="relative w-full max-w-[705px] select-none">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Years of experience in digital technology"
        aria-valuemin={0}
        aria-valuemax={EXPERIENCE.length - 1}
        aria-valuenow={index}
        aria-valuetext={EXPERIENCE[index].label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        className="relative h-[22px] cursor-pointer touch-none rounded-[12px] border border-[#2563b8] bg-[rgba(170,206,255,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        <div
          className="absolute inset-y-[-1px] left-[-1px] rounded-[12px] bg-gradient-to-r from-[#114182] to-[#2563b8] transition-[width] duration-200"
          style={{ width: `calc(${pct}% + 1px)` }}
        />
        <img
          alt=""
          aria-hidden="true"
          src={`${A}/slider-thumb.svg`}
          className="absolute top-[-8px] size-[36px] -translate-x-1/2 transition-[left] duration-200"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="relative mt-[15px] h-[34px]">
        {EXPERIENCE.map((option, i) => (
          <button
            key={option.id}
            type="button"
            tabIndex={-1}
            onClick={() => onChange(option.id)}
            className={`absolute top-0 w-[80px] -translate-x-1/2 text-center text-[14px] font-medium leading-[17px] tracking-[-0.5px] sm:text-[16px] ${
              i === index ? "text-[#2563b8]" : "text-[#181824]"
            }`}
            style={{ left: `${STOPS[i]}%` }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */
function QuestionHeader({ chapter, question, subtitle, wide = false }) {
  return (
    <>
      <p className="text-[14px] font-bold leading-[48px] text-[#979797]">
        Chapter {chapter.number} - {chapter.title}
      </p>
      <h1
        className={`mt-[5px] text-[26px] font-normal leading-[1.2] tracking-[-1.2px] text-[#181824] sm:text-[34px] sm:leading-[41px] ${
          wide ? "max-w-[740px]" : "max-w-[708px]"
        }`}
      >
        {question}
      </h1>
      {subtitle && (
        <p className="mt-[7px] max-w-[740px] text-[16px] font-medium leading-[1.625] text-[#475569] sm:text-[18px] sm:leading-[29.25px]">
          {subtitle}
        </p>
      )}
    </>
  );
}

function ChapterCheckpoint({ answers }) {
  const items = [
    { label: "Role", value: find(ROLES, answers.role)?.label },
    { label: "Experience", value: find(EXPERIENCE, answers.experience)?.label },
    { label: "Background", value: find(ENVIRONMENTS, answers.environment)?.short },
  ];
  return (
    <div className="flex flex-col items-center pt-[19px] text-center">
      <h1 className="text-[30px] font-normal leading-[41px] tracking-[-1.2px] text-[#181824]">Way to go!</h1>
      <div className="relative mt-[24px] size-[128px]" aria-hidden="true">
        <img alt="" src={`${A}/check-big-bg.svg`} className="absolute inset-0 block size-full" />
        <img alt="" src={`${A}/check-big.svg`} className="absolute left-[11px] top-[11px] size-[106px]" />
      </div>
      <p className="mt-[19px] max-w-[518px] text-[18px] font-medium leading-[29.25px] text-[#475569]">
        You have defined your professional role, experience and working environment.
      </p>
      <dl className="mt-[17.5px] grid w-full grid-cols-1 gap-[10px] sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="h-[130px] rounded-[12px] bg-white px-3 pt-[7px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)]">
            <dt className="text-[16px] font-bold leading-[29.25px] text-[#2563b8]">{item.label}</dt>
            <dd className="mx-auto flex h-[63px] max-w-[163px] items-center justify-center text-[18px] leading-[21px] tracking-[-0.5px] text-[#181824]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-[30px] max-w-[518px] text-[18px] font-medium leading-[29.25px] text-[#475569]">
        Next, let&apos;s explore what you&apos;ve achieved through your work.
      </p>
    </div>
  );
}

/* Final screen icons, positioned inside the 37px tile exactly as in Figma. */
const SUMMARY_ICONS = [
  { src: "icon-identity.svg", box: "left-[6.02px] top-[6.02px] size-[24.953px]", inner: "inset-[10.42%_8.35%_10.42%_8.32%]", img: "inset-[-3.27%_-3.11%_-3.27%_-3.1%]" },
  { src: "icon-impact.svg", box: "left-[2.5px] top-[2.5px] size-[32px]", inner: "inset-[11.46%_12.5%_13.54%_13.54%]", img: "inset-[-3.13%_-3.17%]" },
  { src: "icon-recognition.svg", box: "left-[3.5px] top-[3.5px] size-[30px]", inner: "inset-[9.37%_13.54%_10.08%_13.54%]", img: "inset-0" },
  { src: "icon-direction.svg", box: "left-[5.5px] top-[6px] size-[26px]", inner: "inset-0", img: "inset-0" },
];

function BlueprintReady({ answers, onBack }) {
  const summaries = chapterSummaries(answers);
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* soft background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[-61px] top-[-38px] h-[391px] w-[405px]">
          <div className="absolute inset-[-37.6%_-36.3%]">
            <img alt="" src={`${A}/glow-top.svg`} className="block size-full max-w-none" />
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute left-[974px] top-[386px] hidden h-[688px] w-[656px] lg:block">
          <div className="absolute inset-[-21.37%_-22.41%]">
            <img alt="" src={`${A}/glow-bottom.svg`} className="block size-full max-w-none" />
          </div>
        </div>

        <div className="relative flex flex-col items-center px-6 pb-16 pt-28 text-center xl:px-0 xl:pt-[122px]">
          <div className="relative size-[128px]" aria-hidden="true">
            <img alt="" src={`${A}/check-big-bg.svg`} className="absolute inset-0 block size-full" />
            <img alt="" src={`${A}/check-big.svg`} className="absolute left-[11px] top-[11px] size-[106px]" />
          </div>
          <h1 className="mt-[21px] max-w-[708px] text-[28px] font-normal leading-[1.2] tracking-[-1.2px] text-[#181824] sm:text-[34px] sm:leading-[41px]">
            Your Global Talent Blueprint is ready
          </h1>
          <p className="mt-[11px] max-w-[808px] text-[16px] font-medium leading-[1.625] text-[#475569] sm:text-[18px] sm:leading-[29.25px]">
            You&apos;ve explored ten key areas of your professional background, contributions, recognition and future
            direction. Save your responses to keep your profile information together.
          </p>

          <div className="mt-[39.5px] w-full max-w-[1242px]">
            <ul className="grid grid-cols-1 gap-[10px] text-left sm:grid-cols-2 xl:grid-cols-4">
              {CHAPTERS.map((chapter, i) => (
                <li key={chapter.number} className="h-[244px] rounded-[20px] border border-[#114182] bg-[#cce1ff] p-[10px]">
                  <div className="relative h-[222px] rounded-[12px] bg-[linear-gradient(to_top,#114182_3.606%,#2563b8)]">
                    <span className="absolute left-[14px] top-[14px] size-[37px] rounded-[7.744px] bg-[#ddebff]" aria-hidden="true">
                      <span className={`absolute overflow-clip ${SUMMARY_ICONS[i].box}`}>
                        <span className={`absolute ${SUMMARY_ICONS[i].inner}`}>
                          <span className={`absolute ${SUMMARY_ICONS[i].img}`}>
                            <img alt="" src={`${A}/${SUMMARY_ICONS[i].src}`} className="block size-full max-w-none" />
                          </span>
                        </span>
                      </span>
                    </span>
                    <p className="absolute left-[14px] top-[48px] text-[14px] font-bold leading-[48px] text-white">{chapter.short}</p>
                    <p className="absolute left-[14px] top-[105px] w-[253px] max-w-[calc(100%-28px)] text-[19px] font-medium leading-[24px] tracking-[-0.5px] text-white">
                      {summaries[i]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* 1-2-3-4 progress rail under the cards */}
            <div className="relative mt-[23px] hidden h-[36px] xl:block" aria-hidden="true">
              {[
                { left: 172, w: 276, src: "summary-line-1.svg" },
                { left: 485, w: 275, src: "summary-line-2.svg" },
                { left: 798, w: 275, src: "summary-line-3.svg" },
              ].map((l) => (
                <div key={l.left} className="absolute top-[20px] h-0" style={{ left: l.left, width: l.w }}>
                  <div className="absolute inset-[-6px_-1.45%_-4px_-1.45%]">
                    <img alt="" src={`${A}/${l.src}`} className="block size-full max-w-none" />
                  </div>
                </div>
              ))}
              {[134, 449, 760, 1073].map((left, i) => (
                <div key={left} className="absolute top-0 size-[36px]" style={{ left }}>
                  <img alt="" src={`${A}/summary-circle.svg`} className="absolute inset-0 block size-full -rotate-90" />
                  <div className="absolute inset-0 rotate-180">
                    <div className="absolute inset-[-25.83%]">
                      <img alt="" src={`${A}/summary-ring.svg`} className="block size-full max-w-none" />
                    </div>
                  </div>
                  <span className="absolute inset-0 grid place-items-center text-[16px] font-bold text-[#2563b8]">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-[10px] xl:mt-[76px]">
            <button type="button" onClick={onBack} className={backBtn}>
              Go back
            </button>
            <Link href="#" className="btn btn-primary h-[46px] w-[167px] rounded-[12px] px-0 text-[14px] leading-5">
              Save Your Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main flow                                                           */
/* ------------------------------------------------------------------ */
const backBtn =
  "btn btn-outline h-[46px] w-[110px] rounded-[12px] px-0 text-[14px] leading-5 shadow-[0px_4px_20px_0px_rgba(37,99,184,0.12)]";
const nextBtn = "btn btn-primary h-[46px] w-[110px] rounded-[12px] px-0 text-[14px] leading-5";

const INITIAL = {
  role: null,
  experience: EXPERIENCE[0].id,
  environment: null,
  achievement: null,
  recognition: [],
  ambition: null,
};

export default function BlueprintQuestionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(INITIAL);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const set = (key) => (value) => setAnswers((a) => ({ ...a, [key]: value }));
  const toggleRecognition = (id) =>
    setAnswers((a) => {
      if (id === RECOGNITION_NONE) return { ...a, recognition: a.recognition.includes(id) ? [] : [id] };
      const rest = a.recognition.filter((r) => r !== RECOGNITION_NONE);
      return { ...a, recognition: rest.includes(id) ? rest.filter((r) => r !== id) : [...rest, id] };
    });

  const canContinue = [
    Boolean(answers.role),
    Boolean(answers.experience),
    Boolean(answers.environment),
    true,
    Boolean(answers.achievement),
    answers.recognition.length > 0,
    Boolean(answers.ambition),
  ][step];

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => canContinue && setStep((s) => Math.min(7, s + 1));

  if (step === 7) return <BlueprintReady answers={answers} onBack={goBack} />;

  // "Current chapter" chips on the left panel
  let chips = [];
  if (step <= 3) {
    chips = [
      find(ROLES, answers.role)?.label,
      step >= 1 && find(EXPERIENCE, answers.experience)?.chip,
      step >= 2 && find(ENVIRONMENTS, answers.environment)?.chip,
    ];
  } else if (step === 4) chips = [find(ACHIEVEMENTS, answers.achievement)?.chip];
  else if (step === 5) chips = answers.recognition.map((id) => find(RECOGNITION, id)?.chip);
  else if (step === 6) chips = [find(AMBITIONS, answers.ambition)?.chip];
  chips = chips.filter(Boolean);

  let content;
  switch (step) {
    case 0:
      content = (
        <>
          <QuestionHeader
            chapter={CHAPTERS[0]}
            question="Which role best describes your work in digital technology?"
            subtitle="Every professional journey is different. Let's start with what you do."
          />
          <div role="radiogroup" aria-label="Your role" className="mt-[30px] grid grid-cols-1 gap-[10px] sm:grid-cols-3">
            {ROLES.map((o) => (
              <TileCard key={o.id} option={o} selected={answers.role === o.id} onSelect={() => set("role")(o.id)} />
            ))}
          </div>
        </>
      );
      break;
    case 1:
      content = (
        <>
          <QuestionHeader chapter={CHAPTERS[0]} question="How long have you worked in digital technology?" />
          <p className="mt-[17px] text-[18px] font-medium leading-[29.25px] text-[#475569]">Drag the circle to adjust</p>
          <div className="mt-[23px]">
            <ExperienceSlider value={answers.experience} onChange={set("experience")} />
          </div>
          <p className="mt-[55px] rounded-[10px] bg-[rgba(240,240,240,0.8)] px-[20px] py-[15px] text-[16px] leading-[29.25px] text-[#475569] sm:px-[28px]">
            Your experience helps us understand the context of your professional journey. Years of experience alone do
            not define your achievements.
          </p>
        </>
      );
      break;
    case 2:
      content = (
        <>
          <QuestionHeader chapter={CHAPTERS[0]} question="Where have you made most of your professional contributions?" wide />
          <div role="radiogroup" aria-label="Where you have worked" className="mt-[29px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {ENVIRONMENTS.map((o) => (
              <RowCard key={o.id} option={o} selected={answers.environment === o.id} onSelect={() => set("environment")(o.id)} />
            ))}
          </div>
        </>
      );
      break;
    case 3:
      content = <ChapterCheckpoint answers={answers} />;
      break;
    case 4:
      content = (
        <>
          <QuestionHeader
            chapter={CHAPTERS[1]}
            question="Which achievement best represents the impact of your work?"
            subtitle="Think about a contribution you would be proud to explain to someone outside your organization."
          />
          <div role="radiogroup" aria-label="Your achievement" className="mt-[30px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {ACHIEVEMENTS.map((o) => (
              <RowCard key={o.id} option={o} selected={answers.achievement === o.id} onSelect={() => set("achievement")(o.id)} />
            ))}
          </div>
        </>
      );
      break;
    case 5:
      content = (
        <>
          <QuestionHeader
            chapter={CHAPTERS[2]}
            question="Has your work received recognition beyond your immediate team?"
            subtitle="Recognition can take different forms. Select anything that reflects your experience."
          />
          <div role="group" aria-label="Recognition you have received" className="mt-[30px] grid grid-cols-1 gap-[10px] sm:grid-cols-3">
            {RECOGNITION.map((o) => (
              <TileCard
                key={o.id}
                option={o}
                multi
                role="checkbox"
                selected={answers.recognition.includes(o.id)}
                onSelect={() => toggleRecognition(o.id)}
              />
            ))}
          </div>
        </>
      );
      break;
    case 6:
      content = (
        <>
          <QuestionHeader
            chapter={CHAPTERS[3]}
            question="What would you most like to achieve in the United Kingdom?"
            subtitle="Your ambitions help us understand the direction you want your professional journey to take."
          />
          <div role="radiogroup" aria-label="Your ambition" className="mt-[30px] grid grid-cols-1 gap-[10px] sm:grid-cols-3">
            {AMBITIONS.map((o) => (
              <ImageCard key={o.id} option={o} selected={answers.ambition === o.id} onSelect={() => set("ambition")(o.id)} />
            ))}
          </div>
        </>
      );
      break;
    default:
      content = null;
  }

  return (
    <section className="bg-white pb-16 pt-28 xl:pb-[49px] xl:pt-[142px]">
      <div className="px-6 xl:px-0">
        <div className="relative mx-auto xl:h-[709px] xl:w-[1240px]">
          <BlueprintPanel step={step} answers={answers} chips={chips} />

          <div className="relative mx-auto max-w-[740px] xl:absolute xl:left-[500px] xl:top-0 xl:h-[709px] xl:w-[740px] xl:max-w-none">
            <p className="mb-4 text-[13px] font-semibold text-[#2563b8] xl:hidden">Step {step + 1} of 8</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="xl:pt-[8px]"
              >
                {content}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-[10px] xl:absolute xl:left-0 xl:top-[658px] xl:mt-0">
              {step === 0 ? (
                <Link href="/verixa" className={backBtn}>
                  Go back
                </Link>
              ) : (
                <button type="button" onClick={goBack} className={backBtn}>
                  Go back
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                aria-disabled={!canContinue}
                className={`${nextBtn} disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
