import {blogs} from "../data/blog";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
function BlogPage() {
  return (
    <div>
      <Navbar/>
     <BlogCard key={blogs.id} blog = {blogs[0]}/>
     <Footer/>
    </div>
  );
}

export default BlogPage;