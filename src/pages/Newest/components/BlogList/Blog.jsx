import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div>
      <div className=" h-auto overflow-hidden inline-flex mb-7">
        <img
          className="w-60 h-52 min-h-minHForIndexPicture min-w-minWForIndexPicture"
          src="http://placehold.it/240x208"
          alt="profile"
        />
        <div className="px-4">
          <div>
            <Link
              to="/blogDetails"
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
            <p className="text-justify">{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
