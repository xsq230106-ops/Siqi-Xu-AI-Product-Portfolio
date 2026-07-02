export type Locale = "en" | "zh";

export const dictionary: Record<Locale, Record<string, string>> = {
  en: {
    "today_topic": "Today's Topic Lab",
    "today_topic_zh": "今日热点观察",
  },
  zh: {
    "today_topic": "今日热点观察",
    "today_topic_zh": "今日热点观察",
  },
};
 
 export function t(key: string, locale: Locale): string {
   return dictionary[locale][key] ?? key;
 }
