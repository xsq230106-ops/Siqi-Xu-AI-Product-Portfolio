// Auto-generated from src/locales/*.json — edit those files, then rebuild this module.

export type Locale = "en" | "zh";

const en: Record<string, string> = {
  "today_topic": "Today's Topic Lab",
  "about": "About",
  "education": "Education",
  "projects": "Projects",
  "skills": "Skills",
  "skills_compact": "Skills",
  "research": "Research Interests",
  "contact": "Contact",
  "sentiment": "Sentiment Distribution",
  "stance": "Stance Breakdown",
  "positive": "Positive",
  "neutral": "Neutral",
  "negative": "Negative",
  "keywords": "Keywords",
  "evidence": "Evidence Samples",
  "methodology": "Methodology",
  "back_to_list": "Back to list",
  "resume": "Resume",
  "contact_note": "Open to full-time and internship opportunities.",
  "footer_note": "Daily analysis powered by DeepSeek AI — data from RSS news feeds",
  "footer_list": "Updated daily via automated pipeline (RSS + DeepSeek analysis)"
};

const zh: Record<string, string> = {
  "today_topic": "今日热点观察",
  "about": "个人简介",
  "education": "教育背景",
  "projects": "项目经验",
  "skills": "专业技能",
  "skills_compact": "技能",
  "research": "研究兴趣",
  "contact": "联系方式",
  "sentiment": "情绪分布",
  "stance": "立场分布",
  "positive": "正面",
  "neutral": "中性",
  "negative": "负面",
  "keywords": "关键词",
  "evidence": "证据样本",
  "methodology": "分析方法",
  "back_to_list": "返回列表",
  "resume": "履历",
  "contact_note": "对全职与实习机会均持开放态度。",
  "footer_note": "每日更新 — 基于 DeepSeek AI 分析，数据来源 RSS 新闻",
  "footer_list": "每天自动更新（RSS 抓取 + DeepSeek 分析）"
};

const locales = { en, zh } as const;

export function t(key: string, locale: Locale): string {
  const dict = locales[locale] as Record<string, string>;
  return dict[key] ?? key;
}