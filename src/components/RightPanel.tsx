"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/dictionary";
import { t } from "@/i18n/dictionary";
import SentimentPieChart from "@/components/charts/SentimentPieChart";
import StanceBarChart from "@/components/charts/StanceBarChart";

interface Hotspot {
  id: number;
  title: Record<string, string>;
  summary: Record<string, string>;
  fullDescription: Record<string, string>;
  date: string;
  tags: string[];
  source: { name: string; url: string };
  sentiment: { positive: number; neutral: number; negative: number };
  stances: Array<{ label: Record<string, string>; percentage: number }>;
  keywords: Array<{ word: string; weight: number }>;
  evidence: Array<{ text: Record<string, string>; source: string }>;
  methodology: Record<string, string>;
}

import hotspots from "../../data/daily-hotspots.json";
const data = hotspots as Hotspot[];

interface Props {
  locale: Locale;
}

export default function RightPanel({ locale }: Props) {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const T = (key: string) => t(key, locale);

  if (selected) {
    return (
      <DetailView
        hotspot={selected}
        locale={locale}
        onBack={() => setSelected(null)}
      />
    );
  }

  return <ListView locale={locale} onSelect={setSelected} />;
}

/* ───────── List View ───────── */

function ListView({
  locale,
  onSelect,
}: {
  locale: Locale;
  onSelect: (h: Hotspot) => void;
}) {
  const T = (key: string) => t(key, locale);
  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-sm border-b border-slate-200 px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {T("today_topic")}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {T("today_topic_zh")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-6 space-y-3">
        {data.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic)}
            className="w-full text-left bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-sm transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {R(topic.title)}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                  {R(topic.summary)}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 text-[11px] font-medium bg-stone-100 text-slate-500 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px] text-slate-400 ml-auto">
                    {topic.date}
                  </span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors mt-1 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="px-6 lg:px-10 pb-8">
        <p className="text-xs text-slate-400 text-center">
          Static demo — no live data or API connections
        </p>
      </div>
    </main>
  );
}

/* ───────── Detail View ───────── */

function DetailView({
  hotspot,
  locale,
  onBack,
}: {
  hotspot: Hotspot;
  locale: Locale;
  onBack: () => void;
}) {
  const R = (obj: Record<string, string> | undefined) =>
    obj ? obj[locale] ?? "" : "";

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-sm border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-6 lg:px-10 py-3 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to list
        </button>
      </div>

      <div className="px-6 lg:px-10 py-6 max-w-3xl">
        {/* Title + meta */}
        <h1 className="text-xl font-semibold text-slate-900 leading-snug">
          {R(hotspot.title)}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className="text-xs text-slate-400">{hotspot.date}</span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">{hotspot.source.name}</span>
          <div className="flex flex-wrap gap-1.5 ml-0 lg:ml-2">
            {hotspot.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-[11px] font-medium bg-stone-100 text-slate-500 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Full description */}
        <p className="text-sm text-slate-700 leading-relaxed mt-6">
          {R(hotspot.fullDescription)}
        </p>

        <hr className="border-slate-200 my-6" />

        {/* Sentiment — ECharts pie chart */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {locale === "en" ? "Sentiment Distribution" : "情绪分布"}
          </h2>
          <SentimentPieChart
            positive={hotspot.sentiment.positive}
            neutral={hotspot.sentiment.neutral}
            negative={hotspot.sentiment.negative}
            locale={locale}
          />
        </section>

        {/* Stances — ECharts horizontal bar chart */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {locale === "en" ? "Stance Breakdown" : "立场分布"}
          </h2>
          <StanceBarChart
            data={hotspot.stances.map((st) => ({
              label: R(st.label),
              percentage: st.percentage,
            }))}
          />
        </section>

        <hr className="border-slate-200 my-6" />

        {/* Keywords */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {locale === "en" ? "Keywords" : "关键词"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {hotspot.keywords.map((k) => (
              <span
                key={k.word}
                className="inline-block text-slate-600 border border-slate-200 px-2.5 py-1 rounded transition-colors hover:border-slate-300"
                style={{
                  fontSize: `${Math.max(11, Math.min(15, k.weight / 7))}px`,
                }}
              >
                {k.word}
              </span>
            ))}
          </div>
        </section>

        <hr className="border-slate-200 my-6" />

        {/* Evidence */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {locale === "en" ? "Evidence Samples" : "证据样本"}
          </h2>
          <div className="space-y-4">
            {hotspot.evidence.map((e, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-slate-300 pl-4 py-1"
              >
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;{R(e.text)}&rdquo;
                </p>
                <cite className="text-xs text-slate-400 mt-1 block not-italic">
                  &mdash; {e.source}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>

        <hr className="border-slate-200 my-6" />

        {/* Methodology */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {locale === "en" ? "Methodology" : "分析方法"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {R(hotspot.methodology)}
          </p>
        </section>

        <p className="text-xs text-slate-400 text-center pt-4">
          Static demo data — analysis is illustrative, not from live sources
        </p>
      </div>
    </main>
  );
}
