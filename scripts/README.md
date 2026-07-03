# Data Pipeline Scripts

## build_hotspots.py

AI news analysis pipeline. Fetches articles from RSS sources, analyzes them via DeepSeek API, and outputs `data/daily-hotspots.json` in the portfolio's expected schema.

### Requirements

- Python 3.8+ (no external packages needed)
- DeepSeek API key

### Usage

```bash
export DEEPSEEK_API_KEY="sk-your-key-here"

# Fetch and analyze 4 articles (default)
python scripts/build_hotspots.py

# Fetch and analyze 2 articles
python scripts/build_hotspots.py --limit 2

# Preview output without writing
python scripts/build_hotspots.py --dry-run
```

### Output

- `data/daily-hotspots.json` — frontend-ready JSON array
- `data/daily-hotspots.json.bak` — previous run (backup, auto-restored on failure)

### Pipeline steps

1. **Fetch** — RSS feeds from Hacker News and TechCrunch AI
2. **Filter** — keeps AI/tech related articles, deduplicates by title
3. **Analyze** — calls DeepSeek API with structured prompt
4. **Write** — outputs JSON with backup/fallback

### Automation

To run daily:

```bash
# crontab
0 8 * * * cd /path/to/project && DEEPSEEK_API_KEY="sk-..." python scripts/build_hotspots.py
```

After each run, rebuild the static site:

```bash
npm run build
```
