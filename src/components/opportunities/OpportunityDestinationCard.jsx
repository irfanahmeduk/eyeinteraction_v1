"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------- Pennant flags (portrait, latke hue) ---------- */
function DestinationFlag({ country }) {
  const base = {
    className: "block h-full w-full",
    viewBox: "0 0 80 120",
    preserveAspectRatio: "xMidYMid slice",
    role: "img",
  };

  if (country === "uk") {
    return (
      <svg {...base} aria-label="United Kingdom flag">
        <rect width="80" height="120" fill="#2b2f78" />
        <path d="M0 0 80 120M80 0 0 120" stroke="#fff" strokeWidth="24" />
        <path d="M0 0 80 120M80 0 0 120" stroke="#c8203c" strokeWidth="9" />
        <path d="M40 0v120M0 60h80" stroke="#fff" strokeWidth="36" />
        <path d="M40 0v120M0 60h80" stroke="#c8203c" strokeWidth="20" />
      </svg>
    );
  }
  if (country === "us") {
    return (
      <svg {...base} aria-label="United States flag">
        <rect width="80" height="120" fill="#fff" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={i * 12.3} width="6.15" height="120" fill="#c8203c" />
        ))}
        <rect x="41" width="39" height="66" fill="#2b2f78" />
        {Array.from({ length: 5 }, (_, c) =>
          Array.from({ length: 7 }, (_, r) => (
            <circle key={`${c}-${r}`} cx={46 + c * 7.2} cy={6 + r * 8.7} r="1.5" fill="#fff" />
          ))
        )}
      </svg>
    );
  }
  if (country === "eu") {
    return (
      <svg {...base} aria-label="European Union flag">
        <rect width="80" height="120" fill="#0636a8" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <circle key={i} cx={40 + 21 * Math.sin(a)} cy={58 - 21 * Math.cos(a)} r="2.6" fill="#ffd617" />;
        })}
      </svg>
    );
  }
  return (
    <svg {...base} aria-label="Saudi Arabia flag">
      <rect width="80" height="120" fill="#1f8a2c" />
      <path d="M14 42c5-9 9 5 14-3s9 9 14 0 8 7 12-2 5 5 8 1" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 56c6-6 10 4 16-1s10 6 16 0 8 4 16-1" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 78h44" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M58 74v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Skyline fallback (jab destination.image na ho) ---------- */
function Skyline({ scene }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      viewBox="0 0 240 118"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
    >
      <g className="fill-white/[0.09]">
        {scene === "london" && (
          <>
            <rect x="150" y="30" width="22" height="88" />
            <path d="M150 30 161 6 172 30z" />
            <rect x="196" y="62" width="40" height="56" />
            <rect x="100" y="76" width="44" height="42" />
            <rect x="60" y="86" width="34" height="32" />
          </>
        )}
        {scene === "new-york" && (
          <>
            <rect x="120" y="62" width="22" height="56" />
            <rect x="150" y="48" width="24" height="70" />
            <rect x="158" y="30" width="8" height="18" />
            <rect x="182" y="70" width="20" height="48" />
            <rect x="214" y="84" width="16" height="34" />
            <circle cx="222" cy="74" r="7" />
            <path d="M225 70 233 40" className="stroke-white/10" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {scene === "venice" && (
          <>
            <path d="M140 84a28 28 0 0 1 56 0z" />
            <rect x="136" y="84" width="64" height="34" />
            <rect x="106" y="40" width="16" height="78" />
            <path d="M106 40 114 18 122 40z" />
            <rect x="208" y="74" width="32" height="44" />
          </>
        )}
        {scene === "riyadh" && (
          <>
            <path d="M120 16H156V38Q138 62 120 38z" />
            <rect x="120" y="16" width="10" height="102" />
            <rect x="146" y="16" width="10" height="102" />
            <rect x="176" y="56" width="20" height="62" />
            <rect x="204" y="70" width="28" height="48" />
            <rect x="86" y="80" width="26" height="38" />
          </>
        )}
      </g>
    </svg>
  );
}

export function OpportunityDestinationCard({
  destination,
  index = 0,
  dimmed = false,
  onActivate,
  onDeactivate,
}) {
  // image (optional): real photo URL, href (optional): button ka link
  const { name, slug, flag, scene, description, image, href } = destination;

  // Mouse ke saath subtle light sheen
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    // h-full: grid row ke saare cards ek barabar height ke rahte hain
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        whileHover={{ y: -4 }}
        className={`group relative isolate h-full min-h-[176px] overflow-hidden rounded-2xl bg-[#12285f] shadow-[0_10px_30px_-14px_rgba(10,26,69,0.6)] ring-1 ring-white/10 transition-[box-shadow,opacity,filter] duration-300 ease-out hover:shadow-[0_24px_44px_-16px_rgba(10,26,69,0.75)] sm:min-h-[196px] ${dimmed ? "opacity-70 saturate-75" : ""
          }`}
        style={{ "--mx": "50%", "--my": "50%" }}
        onMouseMove={handleMove}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
      >
        {/* Background: photo (agar di ho) ya skyline */}
        {image ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <div className="absolute inset-0 -z-20">
            <Skyline scene={scene} />
          </div>
        )}

        {/* Navy overlay (text readable rahe) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#34479a]/70 via-[#17306b]/85 to-[#0a1a45]/95"
        />

        {/* Mouse sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 70%)",
          }}
        />

        {/* Hanging pennant flag */}
        <div className="absolute right-[7%] top-0 h-[104px] w-14 overflow-hidden shadow-[0_10px_20px_-6px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out [clip-path:polygon(0_0,100%_0,100%_86%,50%_100%,0_86%)] group-hover:translate-y-1.5 sm:h-[128px] sm:w-[72px] motion-reduce:transition-none">
          <DestinationFlag country={flag} />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-center px-5 py-6 pr-24 sm:px-8 md:max-w-[72%] md:pr-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[28px]">{name}</h2>
          <p className="mt-2 text-[15px] leading-snug text-white/90">{description}</p>
          <Link
            href={href ?? `/opportunities/${slug}`}
            aria-label={`Explore ${name} opportunities`}
            className="mt-5 inline-flex w-fit items-center gap-3 rounded-lg bg-brand-600 px-5 py-2.5 text-[15px] font-semibold text-white no-underline shadow-lg shadow-blue-950/40 ring-1 ring-white/10 transition duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 active:scale-[0.98] motion-reduce:transition-none"
          >
            Explore {name}
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
}
