import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";

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

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch article");
        }

        setNews(data.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this news article.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <>
      <Navbar />
      <NavbarTwo />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">

          <Link
            to="/news"
            className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to News
          </Link>

          {loading && (
            <div className="py-20 text-center text-gray-500">
              Loading article...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && news && (
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* IMAGE */}
              {news.image_url && (
                <div className="w-full overflow-hidden bg-gray-100">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="h-auto max-h-[550px] w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-10">

                {/* SOURCE + DATE */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {news.source || "AK Developer News"}
                  </span>

                  {(news.published_at || news.collected_at) && (
                    <span className="text-sm text-gray-400">
                      {formatDate(
                        news.published_at || news.collected_at
                      )}
                    </span>
                  )}
                </div>

                {/* TITLE */}
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {news.title}
                </h1>

                {/* CONTENT */}
                <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
                  {news.raw_content}
                </div>

                {/* ORIGINAL SOURCE - ONLY HERE */}
                {news.url && (
                  <div className="mt-10 border-t border-gray-200 pt-6">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Original Source
                    </p>

                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {news.url}
                    </a>
                  </div>
                )}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsArticle;