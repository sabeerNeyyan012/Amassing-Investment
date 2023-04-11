import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const EachTopic = () => {
  const navigate = useNavigate();
  let { subject } = useParams();
  const myFunction = (event) => {
    navigate(`/${subject}/${event.target.value}`);
  };
  const [blog, setBlog] = useState([]);
  const [metaTag, setMetatag] = useState();
  const fetchBlog = async () => {
    try {
      let blogData = await axios.get(
        "https://wp.amassinginvestment.com/wp-json/wp/v2/posts"
      );
      subject = subject.trim();
      const selectedBlog = blogData.data.filter((val) => {
        if (val.slug.indexOf(subject) !== -1) return val;
      });
      setBlog(selectedBlog);
      fetchDetails(selectedBlog[0].link);
    } catch (err) {
      console.log("Failed");
    }
  };
  const fetchDetails = async (link) => {
    try {
      let details = await axios.get(
        `https://wp.amassinginvestment.com/wp-json/rankmath/v1/getHead?url=${link}`
      );
      setMetatag(details.data.head);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      <Helmet>{metaTag}</Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12 top-background">
            <h2
              style={{ paddingTop: "100px" }}
              dangerouslySetInnerHTML={{
                __html: blog[0]?.title?.rendered,
              }}
            ></h2>
          </div>
          <div className="col-12 pb-3 chapter-area">
            <span>Explore the chapters: &nbsp;&nbsp;</span>
            <select
              className="select-chapter mt-3"
              style={{ width: "120px" }}
              onChange={myFunction}
            >
              <option selected disabled hidden>
                Chapters
              </option>
              <option value="Introduction">Introduction</option>
              <option value="Learn basic of trading">
                Learn basic of trading
              </option>
              <option value="Learn more about trading">
                Learn more about trading
              </option>
            </select>
            <span style={{ float: "right" }} className="mt-3">
              <button
                type="button"
                className="btn btn-outline-primary next-btn mx-3"
              >
                Next
              </button>
              <button
                type="button"
                className="btn btn-outline-primary next-btn"
              >
                Previous
              </button>
            </span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            {blog.map((val, index) => {
              return (
                <>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: val.content?.rendered,
                    }}
                    key={index}
                  ></p>
                </>
              );
            })}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default EachTopic;
