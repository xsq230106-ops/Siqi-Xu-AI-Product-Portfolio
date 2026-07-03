"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/dictionary";

interface Props {
  locale: Locale;
}

export default function LangToggle({ locale }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-1 py-1 text-sm">
      <button
        onClick={() => router.push("/en")}
        className={`px-2.5 py-1 rounded-md transition-colors ${
          locale === "en"
            ? "bg-slate-800 text-white font-medium"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => router.push("/zh")}
        className={`px-2.5 py-1 rounded-md transition-colors ${
          locale === "zh"
            ? "bg-slate-800 text-white font-medium"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        中文
      </button>
    </div>
  );
}
