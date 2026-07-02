# Siqi Xu — AI Product Portfolio — Project Status

## Current Stage: Stage 1 — UI Skeleton & Interaction

### ✅ Completed
- [x] Next.js 15 project initialization (App Router, TypeScript, Tailwind)
- [x] Basic two-panel layout (desktop side-by-side, mobile stacked)
- [x] System font stack (no Google Fonts dependency)
- [x] Language toggle component (EN/ZH)
- [x] Left panel with avatar, name, job target, skills tag cloud
- [x] Right panel with topic list + detail views (list cards → click → detail)
- [x] `docs/CLAUDE.md` and `docs/PROJECT_STATUS.md` (project documentation)
- [x] `resume-data.json` structured data file (personal data source of truth)
- [x] `public/data/daily-hotspots.json` enriched sample data
- [x] Left panel drag-to-resize (snap points 320/520/760px)
- [x] Document-style expanded resume layout (not card-stacked)
- [x] Mobile full-screen overlay for resume
- [x] Removed old `src/data/profile.ts` — data migrated to `resume-data.json`
- [x] Removed old `src/data/topics.ts` — data migrated to `public/data/daily-hotspots.json`
- [x] Cleaned up `src/i18n/dictionary.ts` — removed data keys, kept only UI labels

### 📋 Stage 1 Remaining
- [ ] Static export build config

### 📅 Next Stages
- **Stage 2** (zh/en locale): Locale routing, locale JSON files, full text switching
- **Stage 3** (data rendering): Link resume-data.json to components, missing-field handling
- **Stage 4** (charts): ECharts for sentiment/stance/region, topic detail completion
- **Stage 5** (data pipeline): Python script, DeepSeek integration, daily update
- **Stage 6** (deployment): Vercel, custom domain, China optimization docs

### Files Changed This Session
```
Created:
  public/data/daily-hotspots.json    — 4 enriched hotspots with sentiment/stance/keywords/evidence/methodology

Modified:
  src/components/RightPanel.tsx      — list/detail dual view, click interaction, text-based analytics

Deleted:
  src/data/topics.ts                 — data migrated to daily-hotspots.json
```

### Known Issues
- Locale routing not set up (uses useState-based toggle).
- No dark/light theme toggle.
- No social links or contact form.
- Avatar is a placeholder SVG silhouette.
- ECharts not yet integrated — analytics shown as text bars/labels.
