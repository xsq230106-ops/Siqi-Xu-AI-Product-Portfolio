"use client";

import { t, type Locale } from "@/i18n/dictionary";
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
  const T = (key: string) => t(key, locale);

  return (
    <div className="h-full bg-white dark:bg-stone-900 border-r border-slate-200 dark:border-stone-700 overflow-y-auto relative">
      <div className="p-6 lg:p-8">
        {/* Compact profile rail */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="w-20 h-20 overflow-hidden shrink-0 bg-slate-100">
            <img src="./avatar.jpg" alt="Siqi Xu" className="w-full h-full object-cover object-top" />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-stone-100">{R(data.name)}</h1>
            <p className="text-sm text-slate-500 dark:text-stone-400 mt-0.5">{R(data.email)}</p>
            <p className="text-sm text-slate-500 dark:text-stone-400">{R(data.phone)}</p>
          </div>
        </div>

        {/* Job target */}
        <div className="mt-5 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{R(data.job_target)}</p>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">{R(data.job_tagline)}</p>
        </div>

        {/* Skills tag cloud */}
        <div className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-stone-400 mb-2">
            {T("skills_compact")}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s: any) => (
              <span
                key={s.key}
                className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 dark:text-stone-300 rounded-md"
              >
                {R(s.label)}
              </span>
            ))}
          </div>
        </div>

        {/* Expanded document-style resume */}
        {isExpanded && (
          <>
            <hr className="border-slate-200 dark:border-stone-700 my-6" />

            <div className="space-y-6">
              {/* About */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
                  {T("about")}
                </h2>
                <p className="text-sm text-slate-700 dark:text-stone-300 leading-relaxed">{R(data.about)}</p>
              </section>

              <hr className="border-slate-200" />

              {/* Education (array) */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
                  {T("education")}
                </h2>
                <div className="text-sm space-y-3">
                  {data.education.map((e: any, i: number) => (
                    <div key={i}>
                      <p className="font-medium text-slate-900 dark:text-stone-100">{R(e.degree)}</p>
                      <p className="text-slate-500 dark:text-stone-400 mt-0.5">{R(e.school)}</p>
                      <p className="text-slate-500 dark:text-stone-400">{R(e.period)}</p>
                      {R(e.detail) && (
                        <p className="text-xs text-slate-400 mt-0.5">{R(e.detail)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* Projects */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
                  {T("projects")}
                </h2>
                <div className="space-y-3">
                  {data.projects.map((p: any, i: number) => (
                    <div key={i}>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-sm font-medium text-slate-900 dark:text-stone-100">{R(p.title)}</h3>
                        {p.role && (
                          <span className="text-[11px] text-slate-400">({R(p.role)})</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                        {R(p.description)}
                      </p>
                      {p.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {p.skills.map((s: string) => (
                            <span
                              key={s}
                              className="text-[11px] text-slate-400 border border-slate-200 dark:border-stone-600 px-1.5 py-0.5 rounded"
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
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
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

              <hr className="border-slate-200" />

              {/* Research Interests */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
                  {T("research")}
                </h2>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-stone-400 space-y-0.5">
                  {data.researchInterests[locale]?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <hr className="border-slate-200" />

              {/* Contact */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-stone-400 mb-2">
                  {T("contact")}
                </h2>
                <div className="text-sm text-slate-700 dark:text-stone-300 space-y-1">
                  <p>{R(data.email)}</p>
                  <p>{R(data.phone)}</p>
                </div>
                <p className="text-xs text-slate-400 dark:text-stone-400 mt-1">
                  {T("contact_note")}
                </p>
              </section>
            </div>
          </>
        )}
      </div>

      {/* Drag handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-5 cursor-col-resize z-10 flex flex-col items-center justify-center group hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
        onMouseDown={onDragStart}
        title="Drag to resize"
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-stone-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-400 transition-colors" />
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-stone-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-400 transition-colors" />
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-stone-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-400 transition-colors" />
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-stone-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-400 transition-colors" />
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-stone-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-400 transition-colors" />
        </div>
      </div>
      </div>
  );
}
