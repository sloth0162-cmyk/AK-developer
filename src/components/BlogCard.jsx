import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

/**
 * BlogCard
 * Responsive by default:
 *  - Narrow window / mobile: stacked layout (image on top, content below)
 *  - Desktop / wide window: horizontal layout (image on the side, content next to it)
 *
 * Usage:
 *   <BlogCard blog={blog} />
 */
function BlogCard({ blog }) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-gray-200 bg-white
                 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                 lg:flex-row lg:items-stretch
                 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500
                  p-8
                 "
    >
      {/* Image */}
      <Link
        to={`/blog/${blog.id}`}
        className="block overflow-hidden lg:w-2/5 lg:shrink-0"
      >
        <div className="h-60 w-full overflow-hidden lg:h-full">
          <img
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 border border-gray-200 rounded-lg"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50"
          >
            <Tag className="h-3 w-3" />
            {blog.area}
          </Badge>

          {blog.readTime && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              {blog.readTime}
            </span>
          )}
        </div>

        <h2 className="mt-4 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600 lg:text-2xl">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h2>

        <p className="mt-3 line-clamp-3 flex-1 leading-7 text-gray-600">
          {blog.content}
        </p>

        <div className="mt-6">
          <Button
            asChild
            className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:gap-3 hover:bg-blue-700"
          >
            <Link to={`/blog/${blog.id}`} className="inline-flex items-center gap-2">
              Read more
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>

  );
}

export default BlogCard;