# Deployment Guide

## Overview

This project generates a fully static site via `next build` (output: `./out/`).
It can be deployed to any static hosting (Vercel, GitHub Pages, S3, etc.).

## Build

```bash
npm run build
```

Output goes to `./out/`. This directory is ready to serve.

## GitHub Pages (Recommended)

### One-time Setup

1. Push the repo to GitHub.
2. Go to Settings → Secrets and variables → Actions → New repository secret.
   - Name: `DEEPSEEK_API_KEY`
   - Value: your DeepSeek API key
3. Go to Settings → Pages → Source → **GitHub Actions**.

That's it. The `.github/workflows/daily-hotspots.yml` workflow handles everything:

- **Daily at 08:00 UTC+8**: fetches news → analyzes with DeepSeek → builds → deploys
- **Manual trigger**: GitHub Actions → workflow → "Run workflow"
- The site is served from the `gh-pages` branch at `https://<user>.github.io/<repo>/`

### Custom Domain

1. Buy a domain (e.g., `siqixu.com`).
2. Go to Settings → Pages → Custom domain, enter your domain.
3. Add a CNAME record pointing to `<user>.github.io` at your DNS provider.

## Vercel

1. Push repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → Import repository.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: `out`.
6. Environment variable: `DEEPSEEK_API_KEY`.
7. Deploy.

## China Access Optimization

Since the site is static HTML, it loads fine in mainland China if hosted on a
China-friendly CDN. Options (cost involved):

| Option | Pros | Cons |
|---|---|---|
| **Vercel China** (BA required) | Official CDN, good speed | ICP Beian required |
| **Tencent Cloud COS + CDN** | Cheap, fast in China | Setup complexity |
| **Aliyun OSS + CDN** | Reliable, pay-as-you-go | ICP Beian for custom domain |
| **Netlify** | Free | Slow from China |

Without ICP Beian, you can still:
- Use the default `*.github.io` domain (accessible but slow)
- Share the site via direct link for recruiters in Hong Kong/overseas

## Verify Deployment

```bash
curl -I https://your-domain.com/en
# Expect: 200 OK, Content-Type: text/html
```
