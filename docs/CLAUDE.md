# CLAUDE.md — Siqi Xu AI Product Portfolio

## Project identity
- A bilingual (zh/en) AI product portfolio site for job-seeking (Hong Kong / mainland China / international).
- Left panel: personal profile & resume document, supports drag-to-resize with snap points (320/520/760px).
- Right panel: "Daily Hotspot Lab" — static analysis workspace showing sentiment, stance, keywords, and evidence samples.
- Design is professional and restrained. No flashy AI gradients, no purple-heavy aesthetics.
- After-expand resume must look like a document, not a card-stacked dashboard.

## Tech stack
- Next.js 15 (App Router), React 19, TypeScript (strict)
- Tailwind CSS 3, Inter font
- ECharts (for topic detail charts)
- Static export target

## Source of truth
- Personal data: only from `resume-data.json` — never infer, invent, or hallucinate resume content.
- Hotspot data: `public/data/daily-hotspots.json` (static JSON for v1).
- All UI text from locale JSON files (`public/locales/zh.json`, `public/locales/en.json`).

## File structure conventions
```
├── docs/
│   ├── CLAUDE.md              (this file)
│   └── PROJECT_STATUS.md      (active task tracking)
├── resume-data.json           (personal info source of truth)
├── public/
│   ├── data/
│   │   └── daily-hotspots.json
│   └── locales/
│       ├── zh.json
│       └── en.json
├── src/
│   ├── app/
│   │   ├── [locale]/          (locale-routed pages)
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
│       ├── profile/           (avatar, compact info rail)
│       ├── resume/            (document-style expanded layout)
│       ├── topic-lab/         (right-panel topic list + detail)
│       ├── charts/            (ECharts wrappers)
│       └── ui/                (LangToggle, ThemeToggle, etc.)
├── scripts/
│   └── build_hotspots.py      (v2: automated data pipeline)
```

## Hard rules
- Do NOT invent resume content. All personal data comes from `resume-data.json`.
- If a field is missing in the data, show nothing or a placeholder — never hallucinate.
- All UI text must go through locale files. No hardcoded Chinese/English in components.
- Resume content is NOT a literal translation — optimize per locale context.
- Design stays professional, restrained, and readable. No flashy gradients or purple themes.
- Keep code modular — one file per component, components grouped by domain.

## Session workflow
1. Read `docs/CLAUDE.md` and `docs/PROJECT_STATUS.md` first.
2. Only work on the active task defined in PROJECT_STATUS.md.
3. Before coding: list files to create/modify, state assumptions and risks, get approval.
4. After coding: update PROJECT_STATUS.md.
