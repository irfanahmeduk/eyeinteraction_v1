/* eslint-disable @next/next/no-img-element -- small static SVG icons */
import { CheckCircle2, Circle } from "lucide-react";

export function Card({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-[18px] border border-[#e3eaf5] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-[17px] font-semibold text-[#0f172a]">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-semibold tracking-[-0.6px] text-[#0f172a] sm:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-[15px] text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dbe6f7] bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-600">
      <span className="grid size-4 place-items-center rounded-full bg-[#2563b8]">
        <img src="/images/verixa/signup/google.svg" alt="" className="size-2.5" />
      </span>
      Signed in with Google
    </span>
  );
}

const CHAPTER_ICONS = ["icon-identity.svg", "icon-impact.svg", "icon-recognition.svg", "icon-direction.svg"];

/** Chapter summary tiles, same visual language as the questionnaire's final screen. */
export function ChapterTiles({ chapters, compact = false }) {
  return (
    <ul className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-4"}`}>
      {chapters.map((c, i) => (
        <li key={c.number} className="rounded-[16px] border border-[#114182]/60 bg-[#cce1ff] p-[7px]">
          <div className="h-full min-h-[168px] rounded-[11px] bg-[linear-gradient(to_top,#114182_3.6%,#2563b8)] p-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid size-[34px] place-items-center rounded-[8px] bg-[#ddebff]">
                <img src={`/images/verixa/blueprint/${CHAPTER_ICONS[i]}`} alt="" className="max-h-[22px] max-w-[22px]" />
              </span>
              <span className="text-[13px] font-bold">
                {c.number}. {c.short}
              </span>
            </div>
            <p className="mt-4 text-[16px] font-medium leading-[22px] tracking-[-0.3px]">
              {c.summary || <span className="text-white/60">Not answered yet</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Checklist({ steps }) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex gap-3 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className={`absolute left-[11px] top-7 h-[calc(100%-24px)] w-0.5 ${s.done ? "bg-[#2563b8]" : "bg-slate-200"}`} />
          )}
          {s.done ? (
            <CheckCircle2 size={24} className="flex-none fill-[#2563b8] text-white" aria-label="Done" />
          ) : (
            <Circle size={24} className="flex-none text-slate-300" aria-label="To do" />
          )}
          <div className="min-w-0">
            <p className={`text-[15px] font-semibold ${s.done ? "text-[#0f172a]" : "text-slate-700"}`}>{s.label}</p>
            <p className="text-[13px] text-slate-500">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProgressRing({ value, size = 120 }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`Profile ${value}% complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-center">
        <span>
          <span className="block text-[28px] font-semibold leading-none">{value}%</span>
          <span className="mt-1 block text-[11px] font-medium text-white/75">complete</span>
        </span>
      </span>
    </div>
  );
}
