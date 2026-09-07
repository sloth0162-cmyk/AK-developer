import { blogs } from "../data/blog";
import BlogCard from "../components/BlogCard";
import { useParams } from "react-router-dom";

function Blogs() {
  const { area } = useParams();

  const matchingBlogs = blogs.filter(
    (blog) => blog.area === area
  );

  return (
    <>
      {matchingBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </>
  );
}

export default Blogs;