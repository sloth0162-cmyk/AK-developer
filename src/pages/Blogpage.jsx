import { useEffect, useState } from "react";
import { createClient } from "../lib/client";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const supabase = createClient();

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
        return;
      }

      setBlogs(data);
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      )}

      <Footer />
    </div>
  );
}

export default BlogPage;