import { Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";

/**
 * FullBlog
 * Responsive full-page blog view:
 *  - Mobile: image on top, content stacked below
 *  - Desktop: wider container, image as a banner
 *
 * Usage:
 *   <FullBlog blog={blog} />
 */
function FullBlog({ blog }) {
  if (!blog) return null;

  return (
    <article
      className="mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-gray-200 bg-white
                 shadow-sm motion-safe:animate-in motion-safe:fade-in
                 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500
                 my-8 lg:my-12"
    >
      {/* Back link */}
      <div className="px-6 pt-6 lg:px-10 lg:pt-8">
        <Link
          to="/blogpage"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500
                     transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>
      </div>

      {/* Image */}
      {blog.image_url && (
        <div className="mt-4 h-64 w-full overflow-hidden sm:h-80 lg:h-[420px]">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="h-full w-full border border-gray-200 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-6 lg:p-10">
        {/* Area */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-blue-50 px-3 py-1
                       text-xs font-semibold text-blue-600 hover:bg-blue-50"
          >
            <Tag className="h-3 w-3" />
            {blog.area}
          </Badge>
        </div>

        {/* Title */}
        <h1
          className="mt-4 text-2xl font-bold leading-snug text-gray-900
                     lg:text-4xl"
        >
          {blog.title}
        </h1>

        {/* Content */}
        <p
          className="mt-6 whitespace-pre-line leading-7 text-gray-600
                     lg:text-lg lg:leading-8"
        >
          {blog.content}
        </p>
      </div>
    </article>
  );
}

export default FullBlog;