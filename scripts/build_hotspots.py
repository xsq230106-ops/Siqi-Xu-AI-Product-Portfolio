#!/usr/bin/env python3
"""
build_hotspots.py — AI News Analysis Pipeline
===============================================

Fetches AI/tech news from RSS sources, analyzes them via DeepSeek API,
and writes the results to data/daily-hotspots.json in the portfolio's
expected schema, ready for the topic detail view.

Usage:
    export DEEPSEEK_API_KEY="sk-..."
    python scripts/build_hotspots.py [--limit 4] [--dry-run]

Output:
    data/daily-hotspots.json         (frontend-ready JSON)
    data/daily-hotspots.json.bak     (previous run backup)

Requires: Python 3.8+, no external packages.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import logging
import os
import re
import socket
import sys
import time
import xml.etree.ElementTree as ET
from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.request import Request, urlopen

logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(message)s")
log = logging.getLogger("hotspots")

# ── Configuration ──────────────────────────────────────────────────────────

DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"
MAX_RETRIES = 2
REQUEST_TIMEOUT = 120

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = PROJECT_ROOT / "data" / "daily-hotspots.json"
BACKUP_PATH = PROJECT_ROOT / "data" / "daily-hotspots.json.bak"

SOURCES: list[dict[str, str]] = [
    {"name": "Hacker News", "url": "https://hnrss.org/frontpage"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/"},
]

# Keywords to filter AI/tech articles
AI_KEYWORDS = [
    "AI", "artificial intelligence", "machine learning", "deep learning",
    "LLM", "large language model", "GPT", "OpenAI", "Claude", "Gemini",
    "neural network", "transformer", "multimodal", "agent", "autonomous",
    "robotics", "computer vision", "NLP", "natural language",
    "diffusion", "generative", "language model", "fine-tuning",
    "PyTorch", "TensorFlow", "AI safety", "alignment",
    "regulation", "AI act", "data science", "algorithm",
]

# ── Data Sources ──────────────────────────────────────────────────────────

AI_KEYWORDS_LOWER = [kw.lower() for kw in AI_KEYWORDS]


def _is_ai_related(title: str, snippet: str) -> bool:
    """Check if an article title/snippet is related to AI/tech."""
    text = f"{title} {snippet}".lower()
    return any(kw in text for kw in AI_KEYWORDS_LOWER)


def _normalize_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _parse_rss2(root: ET.Element) -> list[dict[str, Any]]:
    """Parse RSS 2.0 XML into article dicts."""
    articles = []
    for item in root.iter("item"):
        title = _normalize_whitespace(html.unescape(item.findtext("title", "")))
        desc = _normalize_whitespace(html.unescape(item.findtext("description", "")))
        link = item.findtext("link", "")
        pub_date = item.findtext("pubDate", "")
        
        # Strip HTML tags from description
        desc_clean = re.sub(r"<[^>]+>", "", desc)
        
        if not title:
            continue
        
        articles.append({
            "title": title,
            "content": desc_clean or title,
            "url": link,
            "date": pub_date,
            "source": "",
        })
    return articles


def _parse_atom(root: ET.Element) -> list[dict[str, Any]]:
    """Parse Atom XML into article dicts."""
    ns = "http://www.w3.org/2005/Atom"
    articles = []
    for entry in root.iter(f"{{{ns}}}entry"):
        title_el = entry.find(f"{{{ns}}}title")
        title = _normalize_whitespace(html.unescape(title_el.text or "")) if title_el is not None else ""
        
        content_el = entry.find(f"{{{ns}}}content")
        summary_el = entry.find(f"{{{ns}}}summary")
        raw = (content_el or summary_el)
        content = _normalize_whitespace(html.unescape(raw.text or "")) if raw is not None else ""
        content_clean = re.sub(r"<[^>]+>", "", content)
        
        link_el = entry.find(f"{{{ns}}}link")
        link = link_el.get("href", "") if link_el is not None else ""
        
        published = entry.findtext(f"{{{ns}}}published", "")
        
        if not title:
            continue
        
        articles.append({
            "title": title,
            "content": content_clean or title,
            "url": link,
            "date": published,
            "source": "",
        })
    return articles


def fetch_articles(source: dict[str, str]) -> list[dict[str, Any]]:
    """Fetch and parse an RSS/Atom feed. Returns list of article dicts."""
    log.info(f"  Fetching: {source['name']} ({source['url']})")
    req = Request(source["url"], headers={"User-Agent": "Mozilla/5.0"})
    
    try:
        with urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
            xml_data = resp.read()
    except URLError as e:
        log.warning(f"  ↳ Network error: {e.reason}")
        return []
    except TimeoutError:
        log.warning(f"  ↳ Timeout")
        return []
    
    try:
        root = ET.fromstring(xml_data)
    except ET.ParseError as e:
        log.warning(f"  ↳ XML parse error: {e}")
        return []
    
    # Detect format: RSS 2.0 has <rss> root, Atom has <feed> root
    tag = root.tag.lower()
    if tag == "rss":
        articles = _parse_rss2(root)
    elif tag == "feed":
        articles = _parse_atom(root)
    else:
        log.warning(f"  ↳ Unknown feed format: {tag}")
        return []
    
    for a in articles:
        a["source"] = source["name"]
    
    log.info(f"  ↳ {len(articles)} articles found")
    return articles


# ── Article Selection ────────────────────────────────────────────────────

def _title_key(title: str) -> str:
    """Normalize title for dedup comparison."""
    t = title.lower().strip()
    t = re.sub(r"[^a-z0-9\s]", "", t)
    return " ".join(t.split())


def select_articles(all_articles: list[dict[str, Any]], limit: int) -> list[dict[str, Any]]:
    """Deduplicate, filter for AI relevance, and select top N."""
    # Filter AI-related
    ai_articles = [a for a in all_articles if _is_ai_related(a["title"], a["content"])]
    log.info(f"  AI-related: {len(ai_articles)} / {len(all_articles)}")
    
    if not ai_articles:
        log.warning("  No AI-related articles found — falling back to all articles")
        ai_articles = all_articles
    
    # Deduplicate by normalized title
    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for a in ai_articles:
        key = _title_key(a["title"])
        if key and key not in seen:
            seen.add(key)
            unique.append(a)
    
    log.info(f"  Unique: {len(unique)}")
    return unique[:limit]


# ── DeepSeek API ─────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an AI news analyst. Given a news article about AI/tech, return a JSON object matching this exact schema (no markdown, no code blocks, ONLY valid JSON):

{
  "title": {"en": "English title", "zh": "Chinese translation of title"},
  "summary": {"en": "2-3 sentence English summary", "zh": "2-3 sentence Chinese summary"},
  "fullDescription": {"en": "3-4 paragraph English analysis", "zh": "3-4 paragraph Chinese analysis"},
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "sentiment": {"positive": 0-100, "neutral": 0-100, "negative": 0-100},
  "stances": [
    {"label": {"en": "Supportive", "zh": "支持"}, "percentage": 0-100},
    {"label": {"en": "Cautious", "zh": "谨慎"}, "percentage": 0-100},
    {"label": {"en": "Skeptical", "zh": "质疑"}, "percentage": 0-100}
  ],
  "keywords": [{"word": "keyword", "weight": 0-100}],
  "evidence": [{"text": {"en": "quote", "zh": "translation"}, "source": "Name"}],
  "methodology": {"en": "English method desc", "zh": "Chinese method desc"}
}

Rules:
- Sentiment percentages MUST sum to 100
- Stance percentages MUST sum to 100
- Keyword weights 1-100. Generate 6-8 keywords
- 2-3 evidence items with named sources
- Generate both English AND Chinese for all bilingual fields
- Return ONLY valid JSON, no other text"""


def analyze_article(api_key: str, article: dict[str, Any]) -> dict[str, Any] | None:
    """Call DeepSeek to analyze an article. Returns parsed JSON or None."""
    user_prompt = f"""Title: {article['title']}
Source: {article['source']}
Content: {article['content']}

Analyze this article and return JSON matching the schema."""

    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.3,
        "max_tokens": 2048,
    }

    body = json.dumps(payload).encode("utf-8")
    req = Request(
        DEEPSEEK_API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
    )

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read())
            raw = result["choices"][0]["message"]["content"]
            
            # Strip code fences if present
            raw = re.sub(r"^```(?:json)?\s*", "", raw.strip())
            raw = re.sub(r"\s*```$", "", raw)
            
            parsed = json.loads(raw)
            # Add source/date metadata
            parsed["source"] = {"name": article["source"], "url": article["url"]}
            parsed["date"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
            return parsed
            
        except (URLError, TimeoutError, json.JSONDecodeError, KeyError, IndexError) as e:
            log.warning(f"  ↳ Attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(3)
    
    return None


# ── Output ────────────────────────────────────────────────────────────────

def assign_ids(analyses: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Assign sequential IDs based on current date."""
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    for i, a in enumerate(analyses, 1):
        a["id"] = int(f"{today}{i:02d}")
    return analyses


def load_fallback() -> list[dict[str, Any]] | None:
    """Load existing data as fallback if available."""
    for path in [BACKUP_PATH, OUTPUT_PATH]:
        if path.exists():
            try:
                with open(path) as f:
                    return json.load(f)
            except (json.JSONDecodeError, OSError):
                continue
    return None


def write_output(analyses: list[dict[str, Any]], dry_run: bool) -> bool:
    """Write analyses to JSON file with backup."""
    # Backup existing data
    if OUTPUT_PATH.exists():
        try:
            OUTPUT_PATH.rename(BACKUP_PATH)
        except OSError:
            pass
    
    if dry_run:
        log.info("  [dry-run] Would write:")
        print(json.dumps(analyses, indent=2, ensure_ascii=False))
        return True
    
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(OUTPUT_PATH, "w") as f:
            json.dump(analyses, f, indent=2, ensure_ascii=False)
        log.info(f"  Written: {OUTPUT_PATH} ({len(analyses)} articles)")
        return True
    except OSError as e:
        log.error(f"  Failed to write: {e}")
        # Restore backup
        if BACKUP_PATH.exists():
            BACKUP_PATH.rename(OUTPUT_PATH)
        return False


# ── Main ──────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="AI News Analysis Pipeline — fetch, analyze, output",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--limit", type=int, default=4, help="Max articles to analyze (default: 4)")
    parser.add_argument("--dry-run", action="store_true", help="Print result without writing file")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show debug logs")
    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if not api_key:
        log.error("DEEPSEEK_API_KEY not set. Run: export DEEPSEEK_API_KEY='sk-...'")
        sys.exit(1)

    # ── Step 1: Fetch ──
    log.info("Step 1/4: Fetching articles from RSS sources")
    all_articles: list[dict[str, Any]] = []
    for src in SOURCES:
        all_articles.extend(fetch_articles(src))
    log.info(f"  Total fetched: {len(all_articles)}")

    if not all_articles:
        log.warning("No articles fetched. Using fallback data.")
        fallback = load_fallback()
        if fallback:
            log.info(f"  Fallback: {len(fallback)} articles from previous run")
        else:
            log.error("No fallback data available. Aborting.")
            sys.exit(1)
        return

    # ── Step 2: Select ──
    log.info("Step 2/4: Filtering and deduplicating")
    selected = select_articles(all_articles, args.limit)
    log.info(f"  Selected: {len(selected)} articles")
    for a in selected:
        log.info(f"    • [{a['source']}] {a['title'][:80]}")

    if not selected:
        log.warning("No articles selected. Using fallback data.")
        fallback = load_fallback()
        if fallback:
            log.info(f"  Fallback: {len(fallback)} articles from previous run")
        else:
            log.error("No fallback data available.")
            sys.exit(1)
        return

    # ── Step 3: Analyze ──
    log.info("Step 3/4: Analyzing with DeepSeek")
    analyses: list[dict[str, Any]] = []
    for i, article in enumerate(selected, 1):
        log.info(f"  [{i}/{len(selected)}] {article['title'][:60]}...")
        try:
            result = analyze_article(api_key, article)
        except Exception as e:
            log.warning(f"  ✗ Unexpected error: {e}")
            result = None
        if result:
            analyses.append(result)
            log.info(f"    ✓ Sentiment: {result.get('sentiment', {})}")
        else:
            log.warning(f"    ✗ Analysis failed, skipping")

    if not analyses:
        log.warning("All analyses failed. Using fallback data.")
        fallback = load_fallback()
        if fallback:
            log.info(f"  Fallback: {len(fallback)} articles from previous run")
        else:
            log.error("No fallback data available.")
            sys.exit(1)
        return

    # ── Step 4: Write ──
    log.info("Step 4/4: Writing output")
    analyses = assign_ids(analyses)
    
    if write_output(analyses, args.dry_run):
        log.info("Done. Run 'npm run build' to regenerate the static site.")
    else:
        log.error("Failed to write output.")
        sys.exit(1)


if __name__ == "__main__":
    main()
