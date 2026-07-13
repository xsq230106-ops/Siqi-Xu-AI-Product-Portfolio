"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Locale } from "@/i18n/dictionary";
import { t } from "@/i18n/dictionary";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import resumeData from "../../resume-data.json";

const SNAP = [320, 520, 760] as const;
const MIN_W = 320;
const MAX_W = 760;

function snap(w: number): number {
  return SNAP.reduce((p, c) => (Math.abs(c - w) < Math.abs(p - w) ? c : p));
}

const data = resumeData as any;

export default function HomePage({ locale }: { locale: Locale }) {
  const [leftWidth, setLeftWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  const dragRef = useRef({ x: 0, w: 320 });
  const T = (key: string) => t(key, locale);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragRef.current = { x: e.clientX, w: leftWidth };
      setIsDragging(true);
    },
    [leftWidth],
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setLeftWidth(
        Math.min(MAX_W, Math.max(MIN_W, dragRef.current.w + (e.clientX - dragRef.current.x))),
      );
    };
    const onUp = () => {
      setIsDragging(false);
      setLeftWidth((w) => snap(w));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-slate-800 dark:text-stone-100 font-sans antialiased">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 lg:px-6 py-2 bg-white dark:bg-stone-900 border-b border-slate-200 dark:border-stone-700 shrink-0">
        <span className="text-sm font-medium text-slate-700 dark:text-stone-300">
          Siqi Xu — AI Product Portfolio
        </span>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <LangToggle locale={locale} />
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel — desktop only */}
        <div
          className="hidden lg:block relative shrink-0"
          style={{
            width: `${leftWidth}px`,
            transition: isDragging ? "none" : "width 0.2s ease",
          }}
        >
          <LeftPanel
            locale={locale}
            isExpanded={leftWidth > 320}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Right Panel */}
        <RightPanel locale={locale} />
      </div>

      {/* Mobile: compact profile bar */}
      <div className="lg:hidden border-b border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden shrink-0 bg-slate-100">
            <img src="./avatar.jpg" alt="Siqi Xu" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {R(data.name)}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {R(data.job_target)}
            </p>
          </div>
          <button
            onClick={() => setMobileOverlayOpen(true)}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 shrink-0"
          >
            {T("resume")} &rarr;
          </button>
        </div>
      </div>



      {/* Mobile overlay */}
      {mobileOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-stone-900 lg:hidden overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-stone-900 border-b border-slate-200 dark:border-stone-700 px-4 py-3 flex items-center justify-between z-10">
            <span className="text-sm font-semibold text-slate-800 dark:text-stone-100">
              {T("resume")}
            </span>
            <button
              onClick={() => setMobileOverlayOpen(false)}
              className="p-1.5 text-slate-400 dark:text-stone-400 hover:text-slate-600 dark:hover:text-stone-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-6 py-6">
            <MobileResumeContent locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
}

function MobileResumeContent({ locale }: { locale: Locale }) {
  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";
  const T = (key: string) => t(key, locale);

  return (
    <div className="max-w-xl mx-auto space-y-7">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("about")}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">{R(data.about)}</p>
      </section>
      <hr className="border-slate-200 dark:border-stone-700" />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("education")}
        </h2>
        <div className="text-sm space-y-3">
          {data.education.map((e: any, i: number) => (
            <div key={i}>
              <p className="font-medium text-slate-900">{R(e.degree)}</p>
              <p className="text-slate-500 mt-0.5">{R(e.school)}</p>
              <p className="text-slate-500">{R(e.period)}</p>
              {R(e.detail) && (
                <p className="text-xs text-slate-400 dark:text-stone-400 mt-0.5">{R(e.detail)}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <hr className="border-slate-200 dark:border-stone-700" />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("projects")}
        </h2>
        <div className="space-y-4">
          {data.projects.map((p: any, i: number) => (
            <div key={i}>
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-medium text-slate-900">{R(p.title)}</h3>
                {p.role && (
                  <span className="text-[11px] text-slate-400 dark:text-stone-400">({R(p.role)})</span>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {R(p.description)}
              </p>
              {p.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.skills.map((s: string) => (
                    <span
                      key={s}
                      className="text-[11px] text-slate-400 dark:text-stone-400 border border-slate-200 dark:border-stone-600 px-1.5 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <hr className="border-slate-200 dark:border-stone-700" />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("skills")}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s: any) => (
            <span
              key={s.key}
              className="text-xs text-slate-500 dark:text-stone-400 border border-slate-200 dark:border-stone-600 px-2 py-0.5 rounded"
            >
              {R(s.label)}
            </span>
          ))}
        </div>
      </section>
      <hr className="border-slate-200 dark:border-stone-700" />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("research")}
        </h2>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          {data.researchInterests[locale]?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      <hr className="border-slate-200 dark:border-stone-700" />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-3">
          {T("contact")}
        </h2>
        <div className="text-sm text-slate-700 space-y-1">
          <p>{R(data.email)}</p>
          <p>{R(data.phone)}</p>
            {data.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            )}
            {data.social?.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            )}
        </div>
        <p className="text-xs text-slate-400 dark:text-stone-400 mt-1">{T("contact_note")}</p>
      </section>
    </div>
  );
}
