import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import NewsCard from "../components/NewsCard";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/news?limit=10`
);
        

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch news");
        }

        setNews(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load news right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <NavbarTwo />

    <main className="min-h-screen bg-gray-50">
  <div className="mx-auto max-w-6xl px-4 py-10">

    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Hyderabad
      </p>

      <h1 className="mt-1 text-3xl font-bold text-gray-900">
        Real Estate News
      </h1>

      <p className="mt-2 text-gray-600">
        Latest updates and information related to Hyderabad real estate.
      </p>
    </div>

    {loading && (
      <div className="py-16 text-center text-gray-500">
        Loading news...
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
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    )}
  </div>
</main>

      <Footer />
    </>
  );
}

export default News;