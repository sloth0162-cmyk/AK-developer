import { blogs } from "../data/blog";
import BlogCard from "../components/BlogCard";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Blogs() {
  const { area, id } = useParams();

  // Route was /blog/:id
  if (id) {
    const blog = blogs.find((b) => String(b.id) === id);

    if (!blog) return <p>Blog not found.</p>;

    return <>
    <Navbar/>
    <FullBlog blog={blog}/>
  
    <Footer/>
    </>
    
  }

  // Route was /blogs/:area
  const matchingBlogs = blogs.filter((blog) => blog.area === area);

  if (matchingBlogs.length === 0) return <p>No blogs found in this area.</p>;

  return (

    <>
    <Navbar/>
      {matchingBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
      <Footer/>
    </>
  );
}

export default Blogs;