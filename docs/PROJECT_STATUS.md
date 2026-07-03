# Siqi Xu — AI Product Portfolio — Project Status

## Current Stage: Stage 3 — Data Pipeline

### ✅ Completed
**Stage 1 — UI Skeleton**
- [x] Two-panel layout with drag-to-resize (snap 320/520/760px)
- [x] Document-style expanded resume
- [x] Mobile full-screen overlay
- [x] Topic list + detail view with ECharts
- [x] Static export (`output: "export"`)

**Stage 2 — Locale**
- [x] Locale routing `/en` / `/zh` with `generateStaticParams`
- [x] `src/locales/en.json` + `zh.json` — all UI text
- [x] All components use `t()` instead of hardcoded text
- [x] `<html lang>` dynamic via HtmlLangSetter
- [x] LangToggle navigates between routes

**Polish**
- [x] Real avatar photo (square, top-cropped)
- [x] Bilingual contact info (email/phone per locale)
- [x] LinkedIn / GitHub links in contact section
- [x] `resume-data.json` fully bilingual

**Stage 3 — Data Pipeline**
- [x] `scripts/build_hotspots.py` — fetch RSS → filter → DeepSeek → output
- [x] Handles RSS 2.0 and Atom formats
- [x] AI keyword filtering + deduplication
- [x] DeepSeek structured prompt with bilingual output
- [x] Backup/fallback on failure
- [x] `--limit`, `--dry-run`, `--verbose` flags
- [x] `scripts/README.md` with usage and cron instructions

### 📋 Remaining
- [ ] Dark/light theme toggle
- [ ] Custom domain + China deployment doc

### Files
```
Created:
  scripts/build_hotspots.py     — Main pipeline (fetch → analyze → write)
  scripts/requirements.txt      — (stdlib only, no deps)
  scripts/README.md             — Usage and automation docs

Modified:
  resume-data.json              — email/phone bilingual
  src/components/LeftPanel.tsx   — square avatar, bilingual contact
  src/components/HomePage.tsx    — square avatar, bilingual contact
```
