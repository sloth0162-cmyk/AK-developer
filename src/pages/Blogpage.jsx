import { useEffect, useState } from "react";
import { createClient } from "../lib/client";
import FullBlog from "../components/FullBlog";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

const supabase = createClient();

function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeDescription(content, area) {
  const cleaned = cleanText(content);

  if (cleaned) {
    return cleaned.slice(0, 155);
  }

  if (area) {
    return `Read real estate insights, property investment information, development updates and local market information about ${area}.`;
  }

  return "Read real estate insights, property investment information and Hyderabad property updates from AK Developer.";
}

function formatArea(area) {
  if (!area) return "";

  return area
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function AdSpace({ label = "ADVERTISEMENT" }) {
  return (
    <aside
      aria-label="Advertisement space"
      className="hidden lg:flex lg:sticky lg:top-28 h-[250px] w-full items-center justify-center self-start rounded-2xl border border-dashed border-slate-300 bg-white/70"
    >
      <div className="px-4 text-center">
        <div className="mx-auto mb-2 h-8 w-8 rounded-full border border-slate-300" />

        <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Ad space
        </p>
      </div>
    </aside>
  );
}

function MobileAdSpace() {
  return (
    <div
      aria-label="Advertisement space"
      className="my-2 flex min-h-[120px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white md:hidden"
    >
      <div className="text-center">
        <div className="mx-auto mb-2 h-7 w-7 rounded-full border border-slate-300" />

        <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          ADVERTISEMENT
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Ad space
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BLOG LIST CARD
───────────────────────────────────────────── */

function BlogListCard({ blog }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">

      <Link
        to={`/blog/${blog.id}`}
        className="block overflow-hidden bg-slate-100"
      >
        {blog.image_url ? (
          <img
            src={blog.image_url}
            alt={blog.title || "Real estate blog"}
            loading="lazy"
            decoding="async"
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-80 lg:h-[420px]"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 sm:h-80 lg:h-[420px]">
            <span className="text-sm font-medium text-slate-400">
              No image available
            </span>
          </div>
        )}
      </Link>

      <div className="p-6 sm:p-7 lg:p-8">

        {blog.area && (
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              <Tag className="h-3.5 w-3.5" />
              {formatArea(blog.area)}
            </span>
          </div>
        )}

        <Link to={`/blog/${blog.id}`}>
          <h2 className="text-2xl font-bold leading-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-3xl">
            {blog.title}
          </h2>
        </Link>

        {blog.content && (
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 sm:text-base">
            {cleanText(blog.content)}
          </p>
        )}

        <Link
          to={`/blog/${blog.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:gap-3"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   SKELETONS
───────────────────────────────────────────── */

function BlogSkeletonCard() {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="h-64 animate-pulse bg-slate-200 sm:h-80 lg:h-[420px]" />

      <div className="space-y-4 p-6 sm:p-7 lg:p-8">
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />

        <div className="h-8 w-4/5 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

        <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />

        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
      </div>
    </article>
  );
}

function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      {Array.from({ length: 3 }).map((_, index) => (
        <BlogSkeletonCard key={index} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */

function EmptyState({ message }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
        <span className="text-xl">📝</span>
      </div>

      <h2 className="text-lg font-semibold text-slate-900">
        Nothing here yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN BLOG COMPONENT
───────────────────────────────────────────── */

function Blogs() {
  const { area, id } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchBlogs() {
      setLoading(true);

      let query = supabase
        .from("blog")
        .select(
          "id, title, content, image_url, area, published, created_at"
        )
        .eq("published", true);

      /*
        /blog/:id
        One specific article
      */
      if (id) {
        query = query
          .eq("id", id)
          .single();
      }

      /*
        /blogs/:area
        All blogs from an area
      */
      else if (area) {
        query = query
          .eq("area", area)
          .order("created_at", { ascending: false });
      }

      /*
        Fallback
      */
      else {
        query = query
          .order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (cancelled) return;

      if (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
        return;
      }

      if (id) {
        setBlogs(data ? [data] : []);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    }

    fetchBlogs();

    return () => {
      cancelled = true;
    };
  }, [area, id]);

  /* ───────────────────────────────────────────
     LOADING
  ─────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        <Navbar />
        <NavbarTwo />

        <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-8">
            <div className="h-9 w-44 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-slate-100" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)_190px] xl:grid-cols-[220px_minmax(0,1fr)_220px]">

            <AdSpace />

            <BlogSkeleton />

            <AdSpace />

          </div>

        </main>

        <Footer />

      </div>
    );
  }

  /* ───────────────────────────────────────────
     SINGLE BLOG
     /blog/:id
  ─────────────────────────────────────────── */

  if (id) {
    const blog = blogs[0];

    if (!blog) {
      return (
        <div className="min-h-screen bg-slate-50">

          <SEO
            title="Blog Not Found | AK Developer"
            description="The requested real estate blog could not be found."
            url={`https://ak-developer.com/blog/${id}`}
          />

          <Navbar />
          <NavbarTwo />

          <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <EmptyState
              message="The blog you are looking for could not be found or is no longer published."
            />
          </main>

          <Footer />

        </div>
      );
    }

    const areaName = formatArea(blog.area);

    const seoTitle = areaName
      ? `${blog.title} | ${areaName} Real Estate | AK Developer`
      : `${blog.title} | AK Developer`;

    const seoDescription = makeDescription(
      blog.content,
      areaName
    );

    return (
      <div className="min-h-screen bg-slate-50">

        <SEO
          title={seoTitle}
          description={seoDescription}
          image={blog.image_url}
          url={`https://ak-developer.com/blog/${blog.id}`}
        />

        <Navbar />
        <NavbarTwo />

        <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)_190px] xl:grid-cols-[220px_minmax(0,1fr)_220px]">

            <AdSpace />

            <article className="min-w-0">
              <FullBlog blog={blog} />
            </article>

            <AdSpace />

          </div>

        </main>

        <Footer />

      </div>
    );
  }

  /* ───────────────────────────────────────────
     AREA PAGE
     /blogs/:area
  ─────────────────────────────────────────── */

  if (blogs.length === 0) {
    const formattedArea = formatArea(area);

    return (
      <div className="min-h-screen bg-slate-50">

        <SEO
          title={
            formattedArea
              ? `${formattedArea} Real Estate Blogs | AK Developer`
              : "Real Estate Blogs | AK Developer"
          }
          description={
            formattedArea
              ? `Read real estate blogs, property insights, investment information and development updates about ${formattedArea}.`
              : "Read real estate blogs, property insights and Hyderabad development updates from AK Developer."
          }
          url={
            area
              ? `https://ak-developer.com/blogs/${encodeURIComponent(area)}`
              : "https://ak-developer.com/blogpage"
          }
        />

        <Navbar />
        <NavbarTwo />

        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

          <EmptyState
            message={
              area
                ? `There are currently no published blogs for ${formattedArea}.`
                : "There are currently no published blogs."
            }
          />

        </main>

        <Footer />

      </div>
    );
  }

  /* ───────────────────────────────────────────
     AREA BLOG LIST
  ─────────────────────────────────────────── */

  const formattedArea = formatArea(area);

  const pageTitle = formattedArea
    ? `${formattedArea} Blogs`
    : "Latest Blogs";

  const pageDescription = formattedArea
    ? `Read real estate insights, property investment information, local development updates and property news about ${formattedArea}.`
    : "Property insights, local updates, investment ideas and real estate news from AK Developer.";

  const canonicalUrl = formattedArea
    ? `https://ak-developer.com/blogs/${encodeURIComponent(area)}`
    : "https://ak-developer.com/blogpage";

  return (
    <div className="min-h-screen bg-slate-50">

      <SEO
        title={
          formattedArea
            ? `${formattedArea} Real Estate Blogs | AK Developer`
            : "Real Estate Blogs | AK Developer Hyderabad"
        }
        description={pageDescription}
        url={canonicalUrl}
      />

      <Navbar />
      <NavbarTwo />

      <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

        <header className="mb-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                AK Developer
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {pageTitle}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                {pageDescription}
              </p>

            </div>

            <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm sm:block">
              {blogs.length}{" "}
              {blogs.length === 1 ? "article" : "articles"}
            </div>

          </div>

        </header>

        <div className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)_190px] xl:grid-cols-[220px_minmax(0,1fr)_220px]">

          <AdSpace />

          <section className="min-w-0">

            <div className="flex flex-col gap-7">

              {blogs.map((blog, index) => (
                <div key={blog.id}>

                  <BlogListCard blog={blog} />

                  {(index + 1) % 3 === 0 && (
                    <MobileAdSpace />
                  )}

                </div>
              ))}

            </div>

          </section>

          <AdSpace />

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Blogs;