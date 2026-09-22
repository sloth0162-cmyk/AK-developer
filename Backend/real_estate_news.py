"""
Hyderabad real-estate news collector.

This is a small first version of the backend news pipeline.

Pipeline:
    Wikipedia search
        ↓
    collect Hyderabad real-estate related pages
        ↓
    scrape page text + image
        ↓
    summarize with OpenRouter LLM
        ↓
    save to Supabase `news`

Expected Supabase `news` columns:
    id
    source
    title
    url
    raw_content
    image_url
    classifier

The table does not have to exist yet while developing this file.
Create it later in Supabase with the columns above.
"""

import html
import re
from urllib.parse import quote, urljoin

import requests
from bs4 import BeautifulSoup

from llm import ask_openrouter
from supabase_client import supabase


WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php"
WIKIPEDIA_BASE = "https://en.wikipedia.org/wiki/"

HEADERS = {
    "User-Agent": (
        "AKDeveloperNewsBot/1.0 "
        "(Hyderabad real-estate news collector)"
    )
}

MAX_WIKIPEDIA_RESULTS = 10
MIN_ARTICLE_LENGTH = 300
MAX_ARTICLE_LENGTH = 30000


def clean_text(text):
    text = html.unescape(text or "")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def search_wikipedia():
    """
    Search Wikipedia for pages related to Hyderabad real estate.

    Wikipedia is being used as the initial source for this version.
    It is not a breaking-news feed, so the output should be treated
    as informational real-estate content.
    """

    queries = [
        "Hyderabad real estate",
        "Hyderabad property",
        "Hyderabad infrastructure real estate",
        "Hyderabad residential development",
    ]

    results = []
    seen_urls = set()

    for query in queries:
        print(f"[WIKIPEDIA] Searching: {query}")

        params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": query,
            "srnamespace": 0,
            "srlimit": MAX_WIKIPEDIA_RESULTS,
        }

        try:
            response = requests.get(
                WIKIPEDIA_API,
                params=params,
                headers=HEADERS,
                timeout=20,
            )
            response.raise_for_status()

            data = response.json()

            for item in data.get("query", {}).get("search", []):
                title = (item.get("title") or "").strip()

                if not title:
                    continue

                url = (
                    WIKIPEDIA_BASE
                    + quote(title.replace(" ", "_"))
                )

                if url in seen_urls:
                    continue

                seen_urls.add(url)

                results.append(
                    {
                        "title": title,
                        "url": url,
                        "source": "Wikipedia",
                    }
                )

        except Exception as exc:
            print(f"[WIKIPEDIA] Search failed for '{query}': {exc}")

    print(f"[WIKIPEDIA] Total unique pages: {len(results)}")
    return results


def extract_image(soup, page_url):
    """Try to get the page's OpenGraph or first useful image."""

    og_image = soup.find(
        "meta",
        attrs={"property": "og:image"},
    )

    if og_image:
        content = og_image.get("content")
        if content:
            return urljoin(page_url, content)

    twitter_image = soup.find(
        "meta",
        attrs={"name": "twitter:image"},
    )

    if twitter_image:
        content = twitter_image.get("content")
        if content:
            return urljoin(page_url, content)

    return None


def scrape_article(url):
    """Extract readable text and an optional image from Wikipedia."""

    print(f"[SCRAPE] {url}")

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=25,
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    image_url = extract_image(soup, url)

    # Remove page elements that are not article content.
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
        ]
    ):
        tag.decompose()

    paragraphs = []

    for element in soup.find_all(["p", "h1", "h2", "h3"]):
        text = clean_text(
            element.get_text(" ", strip=True)
        )

        if len(text) >= 40:
            paragraphs.append(text)

    article_text = "\n\n".join(paragraphs)
    article_text = article_text[:MAX_ARTICLE_LENGTH]

    if len(article_text) < MIN_ARTICLE_LENGTH:
        return None, image_url

    return article_text, image_url


def summarize_article(title, content):
    """Turn Wikipedia source material into concise news-style content."""

    prompt = f"""
You are a factual Hyderabad real-estate news editor.

SOURCE:
Wikipedia

TITLE:
{title}

SOURCE CONTENT:
{content}

Write a concise, useful Hyderabad real-estate information article.

Rules:
- Use only information supported by the supplied source.
- Do not invent current events, prices, projects, statistics, or dates.
- Do not present old/background information as breaking news.
- Do not copy the source word-for-word.
- Rewrite it naturally.
- Keep the important facts.
- Do not mention scraping.
- Do not mention this prompt.
- Do not mention that you are an AI.
- Do not use Markdown.
- Return only the final article text.
"""

    result = ask_openrouter(
        prompt,
        system_prompt=(
            "You are a factual Hyderabad real-estate editor. "
            "Never invent information."
        ),
    )

    return result.strip()


def save_to_supabase(article, summary, image_url):
    """Save the generated article to the future `news` table."""

    row = {
        "source": article["source"],
        "title": article["title"],
        "url": article["url"],
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


def process_article(article):
    """Scrape -> summarize -> save one Wikipedia page."""

    try:
        content, image_url = scrape_article(article["url"])

        if not content:
            print(
                f"[SKIP] Not enough content: {article['title']}"
            )
            return None

        print(f"[LLM] Summarizing: {article['title']}")

        summary = summarize_article(
            title=article["title"],
            content=content,
        )

        if not summary:
            print(f"[SKIP] Empty summary: {article['title']}")
            return None

        saved = save_to_supabase(
            article=article,
            summary=summary,
            image_url=image_url,
        )

        print(f"[SAVED] {article['title']}")
        return saved

    except Exception as exc:
        print(f"[ERROR] {article['title']}: {exc}")
        return None


def collect_news():
    """
    Run the complete Hyderabad real-estate news pipeline.

    Returns a simple result that Flask can send to React.
    """

    articles = search_wikipedia()

    saved = []
    failed = 0

    for article in articles:
        result = process_article(article)

        if result:
            saved.extend(result if isinstance(result, list) else [result])
        else:
            failed += 1

    return {
        "found": len(articles),
        "saved": len(saved),
        "failed": failed,
        "data": saved,
    }


if __name__ == "__main__":
    collect_news()