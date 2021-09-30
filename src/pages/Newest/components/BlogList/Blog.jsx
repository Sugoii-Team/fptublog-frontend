import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const goToBlogDetail = `/blogdetails/${blog.id}`;
  const blogImg = blog.thumnail;
  const defaultImg = "http://placehold.it/240x208";
  const blogContent = blog.content;
  var maxContentLength = 250;
  var trimmedContent = blogContent.substring(0, maxContentLength) + "...";

  return (
    <div>
      <div className=" h-auto overflow-hidden inline-flex mb-7">
        <img
          className="w-60 h-52 min-h-minHForIndexPicture min-w-minWForIndexPicture"
          src={blogImg ? blogImg : defaultImg}
          alt="thumbnail"
        />
        <div className="px-4">
          <div>
            <Link
              to={goToBlogDetail}
              className="text-xl border-b-2 border-gray-300 font-bold "
            >
              {blog.title}
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/users" className="italic">
              Phan Phuoc Thanh
            </Link>
            <span className="text-xs italic block">Posted 05/09/2021</span>
          </div>
          <div className=""></div>
          <div className="mt-3">
            <p className="text-justify">{trimmedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
