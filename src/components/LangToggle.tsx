"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/dictionary";

interface Props {
  locale: Locale;
}

export default function LangToggle({ locale }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 rounded-lg px-1 py-1 text-sm">
      <button
        onClick={() => router.push("/en")}
        className={`px-2.5 py-1 rounded-md transition-colors ${
          locale === "en"
            ? "bg-slate-800 dark:bg-stone-200 text-white dark:text-stone-900 font-medium"
            : "text-slate-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-stone-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => router.push("/zh")}
        className={`px-2.5 py-1 rounded-md transition-colors ${
          locale === "zh"
            ? "bg-slate-800 dark:bg-stone-200 text-white dark:text-stone-900 font-medium"
            : "text-slate-500 dark:text-stone-400 hover:text-slate-700 dark:hover:text-stone-200"
        }`}
      >
        中文
      </button>
    </div>
  );
}
