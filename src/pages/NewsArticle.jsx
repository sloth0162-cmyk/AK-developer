import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import SEO from "../components/SEO";

function cleanText(text) {
  if (!text) return "";

  return String(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeDescription(content, classifier) {
  const cleaned = cleanText(content);

  if (cleaned) {
    return cleaned.slice(0, 155);
  }

  if (classifier) {
    return `Read the latest ${classifier.replace(/_/g, " ")} news and updates from AK Developer.`;
  }

  return "Read the latest real estate news and updates from AK Developer.";
}

function formatClassifier(classifier) {
  if (!classifier) return "";

  return classifier
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value) {
  if (!value) return "";

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function NewsArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch article");
        }

        if (cancelled) return;

        /*
          Current backend returns the article directly.

          data.data fallback keeps this compatible with
          an API that wraps the article inside { data: ... }.
        */
        setArticle(data.data || data);
      } catch (err) {
        if (cancelled) return;

        console.error("News article fetch error:", err);
        setError("Unable to load this news article.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NavbarTwo />

        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-72 w-full rounded-2xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-5/6 rounded bg-gray-100" />
              <div className="h-4 w-4/5 rounded bg-gray-100" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SEO
          title="News Article Not Found | AK Developer"
          description="The requested news article could not be found."
          url={`https://ak-developer.com/news/${id}`}
        />

        <Navbar />
        <NavbarTwo />

        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              News article not found
            </h1>

            <p className="mt-3 text-gray-500">
              {error || "The requested article is unavailable."}
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const classifier = formatClassifier(article.classifier);

  const seoTitle = classifier
    ? `${article.title} | ${classifier} News | AK Developer`
    : `${article.title} | AK Developer News`;

  const seoDescription = makeDescription(
    article.raw_content,
    article.classifier
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* DYNAMIC SEO */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={article.image_url}
        url={`https://ak-developer.com/news/${article.id}`}
      />

      <Navbar />
      <NavbarTwo />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {article.image_url && (
            <div className="h-64 w-full overflow-hidden sm:h-96">
              <img
                src={article.image_url}
                alt={article.title || "News article"}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {classifier && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {classifier}
                </span>
              )}

              {(article.published_at || article.collected_at) && (
                <span className="text-sm text-gray-500">
                  {formatDate(
                    article.published_at || article.collected_at
                  )}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {article.title}
            </h1>

            {article.source && (
              <p className="mt-3 text-sm font-medium text-gray-500">
                Source: {article.source}
              </p>
            )}

            {article.raw_content && (
              <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
                {article.raw_content}
              </div>
            )}

            {article.url && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Read original source →
                </a>
              </div>
            )}

          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}

export default NewsArticle;