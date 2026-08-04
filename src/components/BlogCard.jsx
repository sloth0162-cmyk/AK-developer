import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Blog Image */}
      <Link to={`/blog/${blog.id}`}>
        <div className="overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide">
          {blog.area}
        </span>

        <h2 className="mt-4 text-2xl font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>

        <p className="mt-4 text-gray-600 leading-7 line-clamp-3">
          {blog.content}
        </p>

        <div className="mt-6">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Read More
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;