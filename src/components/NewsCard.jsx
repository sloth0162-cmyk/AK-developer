function NewsCard({ news }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {news.image_url && (
        <div className="h-64 w-full overflow-hidden">
          <img
            src={news.image_url}
            alt={news.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <p className="text-sm font-medium text-blue-600">
          {news.source || "Hyderabad Real Estate"}
        </p>

        <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">
          {news.title}
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          {news.raw_content}
        </p>

        {news.url && (
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Read source →
          </a>
        )}
      </div>
    </article>
  );
}

export default NewsCard;