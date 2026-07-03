import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

const locales = { en, zh } as const;

export type Locale = "en" | "zh";

export function t(key: string, locale: Locale): string {
  const dict = locales[locale] as Record<string, string>;
  return dict[key] ?? key;
}
