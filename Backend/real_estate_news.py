"""
Hyderabad real-estate news collector.

Updated pipeline:
    Google News RSS (source-filtered searches)
        ↓
    collect recent Hyderabad real-estate stories
        ↓
    resolve publisher URL + scrape article text/image
        ↓
    relevance filter + deduplication
        ↓
    summarize with OpenRouter LLM
        ↓
    save to Supabase `news`

The existing Supabase schema is kept compatible:
    id
    source
    title
    url
    raw_content
    image_url
    classifier

Why Google News RSS instead of Wikipedia?
    Wikipedia is useful for background information, but it is not a
    current-news feed. Google News RSS lets us query the specific sources
    you collected while keeping the backend relatively simple.
"""

import html
import re
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from urllib.parse import parse_qsl, urlencode, urljoin, urlsplit, urlunsplit
import xml.etree.ElementTree as ET

import requests
from bs4 import BeautifulSoup

from llm import ask_openrouter
from supabase_client import supabase


GOOGLE_NEWS_RSS = "https://news.google.com/rss/search"

HEADERS = {
    "User-Agent": (
        "AKDeveloperNewsBot/2.0 "
        "(Hyderabad real-estate news collector; contact site owner)"
    ),
    "Accept-Language": "en-IN,en;q=0.9",
}

# Only look at recent stories.
NEWS_DAYS_BACK = 14

# Fetch a manageable number from each source, then keep the strongest matches.
MAX_RESULTS_PER_SOURCE = 8
MAX_ARTICLES_TO_SAVE = 8

MIN_ARTICLE_LENGTH = 400
MAX_ARTICLE_LENGTH = 30000
RSS_FALLBACK_MAX_LENGTH = 5000

REQUEST_TIMEOUT = 25


# These are the sources from the information you collected.
# `domain=None` means use the source name/phrase in Google News instead of
# restricting the query to one domain. This is useful for Property Pulse,
# whose exact domain is not included in the supplied notes.
NEWS_SOURCES = [
    {
        "name": "Telangana RERA",
        "domain": "rera.telangana.gov.in",
        "query": "Hyderabad RERA project registration property compliance complaints",
    },
    {
        "name": "Telangana Today",
        "domain": "telanganatoday.com",
        "query": "Hyderabad real estate property plots land infrastructure TDR",
    },
    {
        "name": "Times of India",
        "domain": "timesofindia.indiatimes.com",
        "query": "Hyderabad real estate property plots land infrastructure TDR",
    },
    {
        "name": "The Hindu",
        "domain": "thehindu.com",
        "query": "Hyderabad real estate property land infrastructure developers",
    },
    {
        "name": "Economic Times",
        "domain": "economictimes.indiatimes.com",
        "query": "Hyderabad real estate property land investment infrastructure",
    },
    {
        "name": "Magicbricks",
        "domain": "magicbricks.com",
        "query": "Hyderabad property prices real estate PropIndex locality",
    },
    {
        "name": "AptLok",
        "domain": "aptlok.com",
        "query": "Hyderabad locality real estate infrastructure property",
    },
    {
        "name": "Property Pulse",
        "domain": None,
        "query": "Property Pulse Hyderabad real estate infrastructure property",
    },
]


# Relevance scoring is about usefulness to your property/news site, not
# whether the article is emotionally positive or negative.
RELEVANCE_KEYWORDS = {
    "hyderabad": 8,
    "real estate": 8,
    "property": 7,
    "plot": 7,
    "plots": 7,
    "land": 6,
    "housing": 5,
    "residential": 5,
    "development": 4,
    "infrastructure": 5,
    "corridor": 5,
    "metro": 4,
    "road": 3,
    "highway": 4,
    "airport": 4,
    "orr": 5,
    "rera": 8,
    "tdr": 6,
    "kokapet": 5,
    "financial district": 5,
    "gachibowli": 4,
    "shamshabad": 4,
    "shadnagar": 4,
    "growth": 3,
    "investment": 4,
    "developer": 3,
    "prices": 4,
    "price": 4,
    "registration": 3,
}


session = requests.Session()
session.headers.update(HEADERS)


def clean_text(text):
    text = html.unescape(text or "")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def normalize_url(url):
    """Remove tracking parameters so the same article is easier to dedupe."""
    if not url:
        return ""

    try:
        parts = urlsplit(url)
        query = [
            (key, value)
            for key, value in parse_qsl(parts.query, keep_blank_values=True)
            if not key.lower().startswith("utm_")
            and key.lower() not in {"fbclid", "gclid"}
        ]

        normalized_path = parts.path.rstrip("/") or "/"

        return urlunsplit(
            (
                parts.scheme.lower(),
                parts.netloc.lower(),
                normalized_path,
                urlencode(query),
                "",
            )
        )
    except Exception:
        return url.strip()


def parse_published_date(value):
    if not value:
        return None

    try:
        parsed = parsedate_to_datetime(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except (TypeError, ValueError, OverflowError):
        return None


def google_news_url(query):
    """Build a recent Google News RSS search URL."""
    recent_query = f"{query} when:{NEWS_DAYS_BACK}d"

    return (
        f"{GOOGLE_NEWS_RSS}"
        f"?q={requests.utils.quote(recent_query)}"
        f"&hl=en-IN&gl=IN&ceid=IN:en"
    )


def extract_rss_link(item):
    link = item.find("link")
    if link is not None and link.text:
        return link.text.strip()
    return ""


def extract_rss_image(item):
    """Read common RSS media fields when a publisher provides one."""
    media_ns = "http://search.yahoo.com/mrss/"

    for tag_name in (
        f"{{{media_ns}}}content",
        f"{{{media_ns}}}thumbnail",
    ):
        node = item.find(tag_name)
        if node is not None:
            url = node.attrib.get("url")
            if url:
                return url

    enclosure = item.find("enclosure")
    if enclosure is not None:
        url = enclosure.attrib.get("url")
        if url:
            return url

    return None


def search_source(source):
    """Collect recent RSS items for one configured source."""
    query = source["query"]

    if source.get("domain"):
        query = f"site:{source['domain']} {query}"

    feed_url = google_news_url(query)

    print(f"[RSS] Searching {source['name']}: {query}")

    try:
        response = session.get(feed_url, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        root = ET.fromstring(response.content)
    except Exception as exc:
        print(f"[RSS] Failed for {source['name']}: {exc}")
        return []

    items = []

    for item in root.findall(".//item")[:MAX_RESULTS_PER_SOURCE]:
        title = clean_text(item.findtext("title", default=""))
        link = extract_rss_link(item)
        description = clean_text(item.findtext("description", default=""))
        published_at = parse_published_date(
            item.findtext("pubDate", default="")
        )
        image_url = extract_rss_image(item)

        if not title or not link:
            continue

        items.append(
            {
                "title": title,
                "url": link,
                "source": source["name"],
                "rss_description": description,
                "published_at": published_at,
                "rss_image_url": image_url,
            }
        )

    print(f"[RSS] {source['name']}: {len(items)} candidates")
    return items


def search_all_sources():
    """Collect and deduplicate recent stories from the configured sources."""
    results = []

    for source in NEWS_SOURCES:
        results.extend(search_source(source))

    return deduplicate_candidates(results)


def deduplicate_candidates(candidates):
    """Deduplicate by normalized URL and then by normalized title."""
    seen_urls = set()
    seen_titles = set()
    unique = []

    for article in candidates:
        normalized_url = normalize_url(article.get("url"))
        normalized_title = re.sub(
            r"[^a-z0-9]+",
            " ",
            (article.get("title") or "").lower(),
        ).strip()

        if normalized_url and normalized_url in seen_urls:
            continue

        if normalized_title and normalized_title in seen_titles:
            continue

        if normalized_url:
            seen_urls.add(normalized_url)
        if normalized_title:
            seen_titles.add(normalized_title)

        unique.append(article)

    print(f"[RSS] Unique candidates: {len(unique)}")
    return unique


def relevance_score(article):
    """Score a story based on Hyderabad real-estate relevance."""
    haystack = " ".join(
        [
            article.get("title", ""),
            article.get("rss_description", ""),
            article.get("url", ""),
        ]
    ).lower()

    score = 0

    for keyword, weight in RELEVANCE_KEYWORDS.items():
        if keyword in haystack:
            score += weight

    # Prefer fresher articles when relevance is similar.
    published_at = article.get("published_at")
    if published_at:
        age = datetime.now(timezone.utc) - published_at
        if age <= timedelta(days=2):
            score += 6
        elif age <= timedelta(days=7):
            score += 3

    return score


def rank_candidates(candidates):
    for article in candidates:
        article["relevance_score"] = relevance_score(article)

    candidates = [
        article
        for article in candidates
        if article["relevance_score"] >= 10
    ]

    candidates.sort(
        key=lambda item: (
            item.get("relevance_score", 0),
            item.get("published_at") or datetime.min.replace(tzinfo=timezone.utc),
        ),
        reverse=True,
    )

    return candidates[:MAX_ARTICLES_TO_SAVE]


def resolve_publisher_url(url):
    """Resolve a Google News URL to the publisher URL."""
    try:
        response = session.get(
            url,
            timeout=REQUEST_TIMEOUT,
            allow_redirects=True,
            stream=True,
        )
        final_url = response.url or url
        response.close()

        if "news.google.com" in urlsplit(final_url).netloc.lower():
            return url

        return final_url
    except Exception as exc:
        print(f"[RESOLVE] Failed: {url} -> {exc}")
        return url


def extract_image(soup, page_url):
    """Try OpenGraph, Twitter, then common article image metadata."""
    for attrs in (
        {"property": "og:image"},
        {"name": "twitter:image"},
    ):
        tag = soup.find("meta", attrs=attrs)
        if tag:
            content = tag.get("content")
            if content:
                return urljoin(page_url, content)

    return None


def scrape_article(url):
    """Extract readable article text and an optional image."""
    print(f"[SCRAPE] {url}")

    response = session.get(
        url,
        timeout=REQUEST_TIMEOUT,
        allow_redirects=True,
    )
    response.raise_for_status()

    final_url = response.url or url
    content_type = response.headers.get("Content-Type", "").lower()

    if "html" not in content_type:
        return None, None, final_url

    soup = BeautifulSoup(response.text, "html.parser")
    image_url = extract_image(soup, final_url)

    for tag in soup(
        [
            "script",
            "style",
            "noscript",
            "nav",
            "footer",
            "header",
            "aside",
            "form",
            "svg",
            "iframe",
        ]
    ):
        tag.decompose()

    paragraphs = []

    # Paragraphs + headings works reasonably across many news sites.
    for element in soup.find_all(["p", "h1", "h2", "h3"]):
        text = clean_text(element.get_text(" ", strip=True))

        if len(text) >= 50:
            paragraphs.append(text)

    article_text = "\n\n".join(paragraphs)
    article_text = article_text[:MAX_ARTICLE_LENGTH]

    if len(article_text) < MIN_ARTICLE_LENGTH:
        return None, image_url, final_url

    return article_text, image_url, final_url


def get_existing_urls():
    """Read existing URLs so repeated runs do not save the same story."""
    try:
        result = (
            supabase
            .table("news")
            .select("url")
            .limit(2000)
            .execute()
        )

        return {
            normalize_url(row.get("url"))
            for row in (result.data or [])
            if row.get("url")
        }
    except Exception as exc:
        print(f"[DB] Could not load existing URLs: {exc}")
        return set()


def summarize_article(article, content):
    """Turn source material into concise, factual site-ready news copy."""
    published = article.get("published_at")
    published_text = (
        published.strftime("%Y-%m-%d") if published else "Date not available"
    )

    prompt = f"""
You are a factual Hyderabad real-estate news editor.

SOURCE:
{article['source']}

PUBLISHED DATE:
{published_text}

TITLE:
{article['title']}

SOURCE CONTENT:
{content}

Write a concise, useful article for a Hyderabad real-estate website.

Rules:
- Use only information supported by the supplied source content.
- Do not invent prices, projects, statistics, approvals, dates, locations, or claims.
- Keep Hyderabad relevance clear when the source supports it.
- Preserve important numbers, named places, project names, and policy terms.
- Distinguish current news from background information.
- If the source is an excerpt or limited text, only summarize what is actually provided.
- Do not copy sentences word-for-word.
- Do not mention scraping, Google News, this prompt, or AI.
- Do not use Markdown.
- Return only the final article text.
"""

    result = ask_openrouter(
        prompt,
        system_prompt=(
            "You are a factual Hyderabad real-estate editor. "
            "Never invent information or fill missing facts."
        ),
    )

    return (result or "").strip()


def save_to_supabase(article, summary, image_url):
    """Save one generated article using the existing news-table schema."""
    row = {
        "source": article["source"],
        "title": article["title"],
        "url": normalize_url(article["url"]),
        "raw_content": summary,
        "image_url": image_url,
        "classifier": "hyderabad_real_estate",
    }

    result = (
        supabase
        .table("news")
        .insert(row)
        .execute()
    )

    return result.data


def process_article(article, existing_urls):
    """Resolve -> scrape -> summarize -> save one candidate."""
    try:
        resolved_url = resolve_publisher_url(article["url"])
        normalized_url = normalize_url(resolved_url)

        if normalized_url in existing_urls:
            print(f"[SKIP] Already saved: {article['title']}")
            return None

        content, image_url, final_url = scrape_article(resolved_url)

        if not content:
            # RSS description is a controlled fallback when a publisher blocks
            # full-page extraction/paywall access.
            content = (article.get("rss_description") or "").strip()
            if content:
                content = content[:RSS_FALLBACK_MAX_LENGTH]
                print(f"[FALLBACK] Using RSS excerpt: {article['title']}")

        if not content or len(content) < 100:
            print(f"[SKIP] Not enough content: {article['title']}")
            return None

        if not image_url:
            image_url = article.get("rss_image_url")

        article = {
            **article,
            "url": normalize_url(final_url or resolved_url),
        }

        if article["url"] in existing_urls:
            print(f"[SKIP] Already saved after redirect: {article['title']}")
            return None

        print(
            f"[LLM] Summarizing ({article['source']} | score={article['relevance_score']}): "
            f"{article['title']}"
        )

        summary = summarize_article(article, content)

        if not summary:
            print(f"[SKIP] Empty summary: {article['title']}")
            return None

        saved = save_to_supabase(
            article=article,
            summary=summary,
            image_url=image_url,
        )

        existing_urls.add(article["url"])
        print(f"[SAVED] {article['title']}")
        return saved

    except Exception as exc:
        print(f"[ERROR] {article.get('title', 'Unknown')}: {exc}")
        return None


def collect_news():
    """
    Run the complete Hyderabad real-estate news pipeline.

    Returns a simple result that Flask can send to React.
    """
    candidates = search_all_sources()
    candidates = rank_candidates(candidates)

    print(f"[FILTER] Selected {len(candidates)} relevant candidates")

    existing_urls = get_existing_urls()
    saved = []
    failed = 0

    for article in candidates:
        result = process_article(article, existing_urls)

        if result:
            saved.extend(result if isinstance(result, list) else [result])
        else:
            failed += 1

    return {
        "found": len(candidates),
        "saved": len(saved),
        "failed": failed,
        "data": saved,
    }


if __name__ == "__main__":
    result = collect_news()
    print("\n=== COLLECTION COMPLETE ===")
    print(f"Found:  {result['found']}")
    print(f"Saved:  {result['saved']}")
    print(f"Failed: {result['failed']}")
