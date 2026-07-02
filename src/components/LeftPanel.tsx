"use client";

import type { Locale } from "@/i18n/dictionary";
import resumeData from "../../resume-data.json";

const data = resumeData as any;

interface Props {
  locale: Locale;
  isExpanded: boolean;
  onDragStart: (e: React.MouseEvent) => void;
}

export default function LeftPanel({ locale, isExpanded, onDragStart }: Props) {
  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";

  return (
    <div className="h-full bg-white border-r border-slate-200 overflow-y-auto relative">
      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Compact profile rail — always visible */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <rect width="80" height="80" rx="40" fill="#e2e8f0" />
              <circle cx="40" cy="32" r="12" fill="#94a3b8" />
              <path d="M18 66c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#94a3b8" />
            </svg>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-xl font-semibold text-slate-900">{R(data.name)}</h1>
            <p className="text-sm text-slate-500 mt-0.5">{data.email}</p>
            <p className="text-sm text-slate-500">{R(data.school)}</p>
          </div>
        </div>

        {/* Job target highlight */}
        <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm font-medium text-blue-800">{R(data.job_target)}</p>
          <p className="text-xs text-blue-600 mt-0.5">{R(data.job_tagline)}</p>
        </div>

        {/* Skills tag cloud */}
        <div className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {locale === "en" ? "Skills" : "技能"}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s: any) => (
              <span
                key={s.key}
                className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md"
              >
                {R(s.label)}
              </span>
            ))}
          </div>
        </div>

        {/* Expanded: document-style resume */}
        {isExpanded && (
          <>
            <hr className="border-slate-200 my-6" />

            <div className="space-y-6">
              {/* About */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {locale === "en" ? "About" : "个人简介"}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">{R(data.about)}</p>
              </section>

              <hr className="border-slate-200" />

              {/* Education */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {locale === "en" ? "Education" : "教育背景"}
                </h2>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">{R(data.education.degree)}</p>
                  <p className="text-slate-500 mt-0.5">{R(data.education.period)}</p>
                  <p className="text-slate-500">{R(data.school)}</p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* Projects */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {locale === "en" ? "Projects" : "项目经验"}
                </h2>
                <div className="space-y-3">
                  {data.projects.map((p: any, i: number) => (
                    <div key={i}>
                      <h3 className="text-sm font-medium text-slate-900">{R(p.title)}</h3>
                      <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {R(p.description)}
                      </p>
                      {p.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {p.skills.map((s: string) => (
                            <span
                              key={s}
                              className="text-[11px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded"
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

              <hr className="border-slate-200" />

              {/* Skills */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {locale === "en" ? "Skills" : "专业技能"}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s: any) => (
                    <span
                      key={s.key}
                      className="text-xs text-slate-500 border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {R(s.label)}
                    </span>
                  ))}
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* Research Interests */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {locale === "en" ? "Research Interests" : "研究兴趣"}
                </h2>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-0.5">
                  {data.researchInterests[locale]?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <hr className="border-slate-200" />

              {/* Contact */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
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
          </>
        )}
      </div>

      {/* Drag handle on right edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize z-10 flex flex-col items-center justify-center group"
        onMouseDown={onDragStart}
      >
        <div className="w-px h-8 bg-slate-300 group-hover:bg-blue-400 transition-colors rounded-full" />
      </div>
    </div>
  );
}
