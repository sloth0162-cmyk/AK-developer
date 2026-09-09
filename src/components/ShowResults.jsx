import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { Badge } from "../components/ui/badge";

function ShowResults({ results, searchQuery }) {
  if (!searchQuery) return null;

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 mb-2">
            Search Results
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Results for{" "}
            <span className="text-blue-600">
              "{searchQuery}"
            </span>
          </h2>

          <p className="mt-2 text-gray-500">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"} found
          </p>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              No results found
            </h3>

            <p className="mt-2 text-gray-500">
              Try searching for another area or topic.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {results.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group block"
              >
                <article
                  className="h-full overflow-hidden rounded-2xl border border-gray-200
                             bg-white shadow-sm transition-all duration-300
                             hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  {blog.image_url && (
                    <div className="h-48 sm:h-52 overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform
                                   duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <Badge
                      variant="secondary"
                      className="gap-1.5 rounded-full bg-blue-50 px-3 py-1
                                 text-xs font-semibold text-blue-600"
                    >
                      <Tag className="h-3 w-3" />
                      {blog.area}
                    </Badge>

                    <h3
                      className="mt-4 text-lg sm:text-xl font-bold leading-snug
                                 text-gray-900 transition-colors
                                 group-hover:text-blue-600"
                    >
                      {blog.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-6 text-gray-600 line-clamp-3">
                      {blog.content}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Read article
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200
                                   group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShowResults;