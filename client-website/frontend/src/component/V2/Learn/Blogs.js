import React, { useEffect, useState } from "react";
import "./Blog.css";
import BlogPost from "./BlogPost";
import axios from "axios";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const fetchBlog = async () => {
    try {
      let blogData = await axios.get(
        "https://wp.amassinginvestment.com/wp-json/wp/v2/posts"
      );
      setBlog(blogData.data);
    } catch (err) {
      console.log("Failed");
    }
  };
  useEffect(() => {
    fetchBlog();
  });
  return (
    <div className="container mb-4">
      <div className="row main-content">
        <div className="col-12">
          <h1>The Trading Blog</h1>
          <p className="blog-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="row">
        {blog.map((val) => {
          return <BlogPost blogDetails={{ blog: val }} />;
        })}
      </div>
    </div>
  );
};

export default Blogs;
