import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import NewsCard from "../components/NewsCard";
import SEO from "../components/SEO";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news?limit=10`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();

        if (cancelled) return;

        if (data.error) {
          throw new Error(data.error);
        }

        setNews(data.data || []);
      } catch (err) {
        if (cancelled) return;

        console.error("News fetch error:", err);
        setError("Unable to load news right now.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* Static SEO for the news listing page */}
      <SEO
        title="Hyderabad Real Estate News | AK Developer"
        description="Read the latest Hyderabad real estate news, property updates, infrastructure developments, and market information from AK Developer."
        url="https://ak-developer.com/news"
      />

      <Navbar />
      <NavbarTwo />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Hyderabad
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Real Estate News
            </h1>

            <p className="mt-2 max-w-2xl text-gray-600">
              Latest updates and information related to Hyderabad real estate.
            </p>
          </header>

          {loading && (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="h-56 animate-pulse bg-gray-200 sm:h-60" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
              No news available yet.
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <section
              aria-label="Latest Hyderabad real estate news"
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {news.map((item, index) => (
                <NewsCard
                  key={item.id}
                  news={item}
                  priority={index === 0}
                />
              ))}
            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default News;