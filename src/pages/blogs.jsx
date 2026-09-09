import { useEffect, useState } from "react";
import { createClient } from "../lib/client";
import BlogCard from "../components/BlogCard";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const supabase = createClient();

function Blogs() {
  const { area, id } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);

      let query = supabase
        .from("blog")
        .select("*")
        .eq("published", true);

      // /blog/:id
      if (id) {
        query = query.eq("id", id).single();
      }

      // /blogs/:area
      else if (area) {
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

      if (id) {
        setBlogs(data ? [data] : []);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    }

    fetchBlogs();
  }, [area, id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
        <Footer />
      </>
    );
  }

  // /blog/:id
  if (id) {
    const blog = blogs[0];

    if (!blog) {
      return (
        <>
          <Navbar />
          <p>Blog not found.</p>
          <Footer />
        </>
      );
    }

    return (
      <>
        <Navbar />
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

      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}

      <Footer />
    </>
  );
}

export default Blogs;