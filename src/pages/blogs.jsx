import { useEffect, useState } from "react";
import { createClient } from "../lib/client";
import BlogCard from "../components/BlogCard";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavbarTwo from "../components/NavbarTwo";
import SEO from "../components/SEO";

const supabase = createClient();

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function Blogs() {
  const params = useParams();

  // Works with either /blog/:id or /blog/:slug
  const area = params.area;
  const slug = params.slug || params.id;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);

      // Single blog: /blog/:slug
      if (slug) {
        const { data, error } = await supabase
          .from("blog")
          .select("*")
          .eq("published", true);

        if (error) {
          console.error("Error fetching blog:", error);
          setBlogs([]);
          setLoading(false);
          return;
        }

        const blog = (data || []).find(
          (item) => slugify(item.title) === slug
        );

        setBlogs(blog ? [blog] : []);
        setLoading(false);
        return;
      }

      // Area blogs: /blogs/:area
      let query = supabase
        .from("blog")
        .select("*")
        .eq("published", true);

      if (area) {
        query = query
          .eq("area", area)
          .order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
        return;
      }

      setBlogs(data || []);
      setLoading(false);
    }

    fetchBlogs();
  }, [area, slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="m-5 mb-2 p-5">
          <NavbarTwo />
        </div>

        <p>Loading...</p>

        <Footer />
      </>
    );
  }

  // /blog/:slug
  if (slug) {
    const blog = blogs[0];

    if (!blog) {
      return (
        <>
          <Navbar />
          <NavbarTwo />

          <p>Blog not found.</p>

          <Footer />
        </>
      );
    }

    return (
      <>
        <Navbar />
        <NavbarTwo />

        <SEO
          title={blog.title}
          description={blog.content?.slice(0, 160)}
          image={blog.image_url}
        />

        <FullBlog blog={blog} />

        <Footer />
      </>
    );
  }

  // /blogs/:area
  if (blogs.length === 0) {
    return (
      <>
        <Navbar />

        <p>No blogs found in this area.</p>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <NavbarTwo />

      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}

      <Footer />
    </>
  );
}

export default Blogs;