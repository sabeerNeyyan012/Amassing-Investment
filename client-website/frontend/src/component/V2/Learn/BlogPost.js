import React from "react";
import { Link } from "react-router-dom";
import { convertDateFormat } from "../../Common/DateFunctions";

const BlogPost = ({ blogDetails }) => {
  return (
    <div className="col-md-6 mb-4">
      <img
        className="blog-image"
        src="https://diplomatist.com/wp-content/uploads/2021/06/Amazing-Ways-to-Become-a-Professional-Trader.jpg"
        alt="learn trading"
      />
      <div className="blog-date mb-2">
        <span>{convertDateFormat(blogDetails.blog?.date)}</span>
      </div>
      <Link
        to={`/${blogDetails.blog?.slug}`}
        className="blog-heading"
        dangerouslySetInnerHTML={{
          __html: blogDetails.blog?.title?.rendered,
        }}
      ></Link>
      <p
        className="blog-desc fifty-chars"
        dangerouslySetInnerHTML={{
          __html: blogDetails.blog?.content?.rendered.substr(0, 250) + "...",
        }}
      ></p>
      <Link to={`/${blogDetails.blog?.slug}`} class="btn btn-outline-info">
        Read this post
      </Link>
    </div>
  );
};

export default BlogPost;
