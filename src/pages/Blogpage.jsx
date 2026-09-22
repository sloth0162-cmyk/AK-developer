import { useEffect, useState } from "react";
import { createClient } from "../lib/client";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavbarTwo from "../components/NavbarTwo";
import { Search } from "../components/Search";

const supabase = createClient();

function BlogPage({ onSearch }) {
  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
        return;
      }

      setBlogs(data || []);
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  const handleSearch = (query) => {
    const value = query.trim().toLowerCase();

    // Empty search = reset everything
    if (!value) {
      setSearchResults([]);
      setNoResult(false);

      if (onSearch) {
        onSearch("");
      }

      return;
    }

    const matches = blogs.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const content = blog.content?.toLowerCase() || "";
      const area = blog.area?.toLowerCase() || "";

      return (
        title.includes(value) ||
        content.includes(value) ||
        area.includes(value)
      );
    });

    if (matches.length > 0) {
      setSearchResults(matches);
      setNoResult(false);
    } else {
      setSearchResults([]);
      setNoResult(true);

      // Remove the "not found" area after 10 seconds
      setTimeout(() => {
        setNoResult(false);
      }, 10000);
    }

    if (onSearch) {
      onSearch(query);
    }
  };

  // Search results first, then the normal blog list.
  const normalBlogs = blogs.filter(
    (blog) => !searchResults.some((result) => result.id === blog.id)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <NavbarTwo />

      {/* Search */}
      <div className="mx-auto flex max-w-7xl justify-end px-4 pt-5 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[320px] lg:w-[380px]">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Search result / no result area */}
        {searchResults.length > 0 && (
          <section className="mb-8">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Search result
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {searchResults.length}{" "}
                {searchResults.length === 1 ? "blog found" : "blogs found"}
              </h2>
            </div>

            <div className="flex flex-col gap-7">
              {searchResults.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {noResult && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              We don't have that blog
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try searching for another topic, area, or blog title.
            </p>
          </div>
        )}

        {/* Normal blogs */}
        {loading ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Loading blogs...
          </p>
        ) : (
          <section className="flex flex-col gap-7">
            {normalBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default BlogPage;