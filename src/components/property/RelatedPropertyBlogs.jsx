import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../../lib/client";

const supabase = createClient();

const RelatedPropertyBlogs = ({ property }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      if (!property?.area) {
        setBlogs([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("blogs")
        .select("id, area, title, description, tags, relational_tags")
        .eq("area", property.area)
        .order("id", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error loading related blogs:", error);
        setBlogs([]);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    };

    loadBlogs();
  }, [property?.area]);

  // Don't show the section when there is no related content.
  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            From Our Blog
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Related Articles
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Learn more about {property.area}, its development, connectivity
            and investment opportunities.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 text-sm text-gray-500">
            Loading related articles...
          </div>
        )}

        {/* Blog cards */}
        {!loading && blogs.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex-1">
                  {blog.area && (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                      {blog.area}
                    </p>
                  )}

                  <h3 className="mt-3 text-xl font-semibold leading-snug text-gray-900">
                    {blog.title}
                  </h3>

                  {blog.description && (
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                      {blog.description}
                    </p>
                  )}
                </div>

                <Link
                  to={`/blogs/${blog.area}`}
                  className="mt-6 text-sm font-semibold text-gray-900 transition hover:underline"
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedPropertyBlogs;