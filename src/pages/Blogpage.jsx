import {blogs} from "../data/blog";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
function BlogPage() {
  return (
    <div>
      <Navbar/>
     {blogs.map((blog) => (
       <BlogCard key={blog.id} blog={blog} />
     ))}
     <Footer/>
    </div>
  );
}

export default BlogPage;