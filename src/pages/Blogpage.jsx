import BlogCard from "../components/BlogCard";

function BlogPage({ blog, relatedBlogs }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-10">
        <div className="overflow-hidden rounded-3xl shadow-lg">
          {/* <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[250px] md:h-[450px] object-cover"
          /> */}
        </div>

        <div className="mt-8">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
            {blog.area}
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <article className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700 leading-8">
            {blog.content}
          </div>
        </article>
      </section>

      {/* Related Blogs */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              More from {blog.area}
            </h2>
            <p className="text-gray-500 mt-2">
              Continue reading articles from this location.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.map((item) => (
            <BlogCard key={item.id} blog={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;