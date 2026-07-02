"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Locale } from "@/i18n/dictionary";
import LangToggle from "@/components/LangToggle";
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

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [leftWidth, setLeftWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  const dragRef = useRef({ x: 0, w: 320 });

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

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800 font-sans antialiased">
      {/* Mobile top bar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <span className="text-sm font-medium text-slate-700">
          Siqi Xu — AI Product Portfolio
        </span>
        <LangToggle locale={locale} onToggle={setLocale} />
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

      {/* Mobile: compact profile bar + overlay trigger */}
      <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden">
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <rect width="80" height="80" rx="40" fill="#e2e8f0" />
              <circle cx="40" cy="32" r="12" fill="#94a3b8" />
              <path d="M18 66c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#94a3b8" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {data.name[locale]}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {data.job_target[locale]}
            </p>
          </div>
          <button
            onClick={() => setMobileOverlayOpen(true)}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 shrink-0"
          >
            Resume &rarr;
          </button>
        </div>
      </div>

      {/* Desktop lang toggle */}
      <div className="hidden lg:block fixed top-4 right-4 z-20">
        <LangToggle locale={locale} onToggle={setLocale} />
      </div>

      {/* Mobile: full-screen resume overlay */}
      {mobileOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
            <span className="text-sm font-semibold text-slate-800">Resume</span>
            <button onClick={() => setMobileOverlayOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

/* ---- Document-style resume content (shared) ---- */
function MobileResumeContent({ locale }: { locale: Locale }) {
  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";

  return (
    <div className="max-w-xl mx-auto space-y-7">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "About" : "个人简介"}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">{R(data.about)}</p>
      </section>

      <hr className="border-slate-200" />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "Education" : "教育背景"}
        </h2>
        <div className="text-sm">
          <p className="font-medium text-slate-900">{R(data.education.degree)}</p>
          <p className="text-slate-500 mt-0.5">{R(data.education.period)}</p>
          <p className="text-slate-500">{R(data.school)}</p>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "Projects" : "项目经验"}
        </h2>
        <div className="space-y-4">
          {data.projects.map((p: any, i: number) => (
            <div key={i}>
              <h3 className="text-sm font-medium text-slate-900">{R(p.title)}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{R(p.description)}</p>
              {p.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.skills.map((s: string) => (
                    <span key={s} className="text-[11px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200" />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "Skills" : "专业技能"}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s: any) => (
            <span key={s.key} className="text-xs text-slate-500 border border-slate-200 px-2 py-0.5 rounded">
              {R(s.label)}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-slate-200" />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "Research Interests" : "研究兴趣"}
        </h2>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          {data.researchInterests[locale]?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <hr className="border-slate-200" />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          {locale === "en" ? "Contact" : "联系方式"}
        </h2>
        <p className="text-sm text-slate-700">{data.email}</p>
        <p className="text-xs text-slate-400 mt-1">
          {locale === "en"
            ? "Feel free to reach out via email. Open to full-time and internship opportunities."
            : "欢迎通过邮箱联系。对全职与实习机会均持开放态度。"}
        </p>
      </section>
    </div>
  );
}
