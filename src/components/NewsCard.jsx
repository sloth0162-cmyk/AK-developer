import { useState } from "react";
import { ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) return "";

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function excerpt(text, maxLength = 125) {
  if (!text) return "";

  const cleanText = String(text).replace(/\s+/g, " ").trim();

  return cleanText.length > maxLength
    ? `${cleanText.slice(0, maxLength).trimEnd()}…`
    : cleanText;
}

function NewsImage({ src, alt }) {
  const [fit, setFit] = useState("cover");
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <ImageOff className="h-8 w-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      {/* Blurred background */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
      />

      <div className="absolute inset-0 bg-white/25" />

      {/* Main image */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-3">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          onLoad={(event) => {
            const image = event.currentTarget;

            if (!image.naturalWidth || !image.naturalHeight) {
              return;
            }

            const ratio = image.naturalWidth / image.naturalHeight;

            setFit(ratio >= 1.35 ? "cover" : "contain");
          }}
          className={[
            "h-full w-full transition-transform duration-500 ease-out",
            "group-hover:scale-[1.025]",
            fit === "cover"
              ? "object-cover"
              : "max-h-full max-w-full object-contain",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

function SourceBadge({ source }) {
  return (
    <span className="inline-flex max-w-[60%] truncate rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
      {source || "AK Developer News"}
    </span>
  );
}

function NewsCard({ news }) {
  if (!news) return null;

  const title = news.title || "Untitled article";

  const date = formatDate(news.published_at || news.collected_at);

  const summary = excerpt(news.raw_content, 125);

  return (
    <Link
      to={`/news/${news.id}`}
      className="block h-full"
    >
      <article
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-blue-200
          hover:shadow-xl
        "
      >
        {/* IMAGE */}
        <div className="relative h-56 w-full overflow-hidden sm:h-60">
          <NewsImage
            src={news.image_url}
            alt={title}
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-5">
          {/* SOURCE + DATE */}
          <div className="mb-3 flex items-center gap-2">
            <SourceBadge source={news.source} />

            {date && (
              <span className="truncate text-[11px] text-gray-400">
                {date}
              </span>
            )}
          </div>

          {/* TITLE */}
          <h3
            className="
              mb-2
              line-clamp-2
              text-base
              font-bold
              leading-snug
              text-gray-900
              transition-colors
              duration-300
              group-hover:text-blue-600
            "
          >
            {title}
          </h3>

          {/* SUMMARY */}
          {summary && (
            <p
              className="
                line-clamp-3
                flex-1
                text-xs
                leading-relaxed
                text-gray-500
                sm:text-[13px]
              "
            >
              {summary}
            </p>
          )}

          {/* FOOTER */}
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              border-t
              border-gray-100
              pt-3
            "
          >
            <span className="text-xs font-semibold text-blue-600">
              Read Story
            </span>

            <ArrowRight
              className="
                h-3.5
                w-3.5
                text-blue-600
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default NewsCard;