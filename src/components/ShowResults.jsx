import { Link } from "react-router-dom";

function cleanText(value) {
  if (!value) return "";

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTitle(item) {
  if (item.type === "property") {
    return item.name || "Property";
  }

  if (item.type === "news") {
    return item.title || "News";
  }

  return item.title || "Blog";
}

function getDescription(item) {
  if (item.type === "property") {
    return cleanText(
      item.summary ||
      item.location ||
      item.highway ||
      item.area ||
      "View property details."
    );
  }

  if (item.type === "news") {
    return cleanText(
      item.classifier ||
      item.source ||
      "Latest real estate news."
    );
  }

  return cleanText(
    item.content || item.area || "Read this blog."
  ).slice(0, 180);
}

function getTypeLabel(type) {
  switch (type) {
    case "property":
      return "Property";
    case "news":
      return "News";
    case "blog":
      return "Blog";
    default:
      return "Result";
  }
}

function getLink(item) {
  if (item.type === "property") {
    return `/property/${item.id}`;
  }

  if (item.type === "news") {
    return `/news/${item.id}`;
  }

  return `/blog/${item.id}`;
}

function getImage(item) {
  return item.image_url || "";
}

export default function ShowResults({
  results = [],
  searchQuery = "",
}) {
  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Search
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Results for "{searchQuery}"
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"} found
          </p>
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No results found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching for a property, news topic, area, or blog.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {results.map((item) => {
              const link = getLink(item);
              const image = getImage(item);

              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  to={link}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {image ? (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={getTitle(item)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                      No image available
                    </div>
                  )}

                  <div className="p-5">

                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {getTypeLabel(item.type)}
                      </span>

                      {item.type === "property" && item.area && (
                        <span className="text-xs text-gray-500">
                          {item.area}
                        </span>
                      )}

                      {item.type === "news" && item.source && (
                        <span className="text-xs text-gray-500">
                          {item.source}
                        </span>
                      )}

                      {item.type === "blog" && item.area && (
                        <span className="text-xs text-gray-500">
                          {item.area}
                        </span>
                      )}
                    </div>

                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-700">
                      {getTitle(item)}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                      {getDescription(item)}
                    </p>

                    <div className="mt-4 text-sm font-semibold text-blue-600">
                      View {getTypeLabel(item.type)} →
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}