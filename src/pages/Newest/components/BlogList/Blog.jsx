import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../../services/blogApi";

const Blog = ({ blog }) => {
  const [author, setAuthor] = useState({});

  const goToBlogDetail = `/blogdetail?${blog.id}`;
  const goToUserDetail = `/users/${author.id}`;
  const blogImg = blog.thumnail;
  const defaultImg = "http://placehold.it/240x208";
  const blogContent = blog.description;
  var maxContentLength = 250;
  var trimmedContent = blogContent.substring(0, maxContentLength) + "...";

  useEffect(() => {
    (async () => {
      try {
        const authorData = await blogApi.getAuthorById(blog.authorId);
        setAuthor(authorData.data);
      } catch (error) {
        console.log("Failed to get author: ", error);
      }
    })();
  }, [blog.authorId]);

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
              className="text-xl border-b-2 border-gray-300 font-bold hover:text-gray-400 transition ease-in-out duration-200"
            >
              {blog.title}
            </Link>
          </div>
          <div className="mt-2">
            <Link to={goToUserDetail} className="italic">
              Author:{" "}
              <span className="font-semibold hover:text-gray-500 transition ease-in-out duration-200">
                {author.firstName + " " + author.lastName}{" "}
              </span>
            </Link>
            <span className="text-xs italic block">Posted 05/09/2021</span>
          </div>
          <div className=""></div>
          <div className="mt-3">
            <p className="text-justify max-w-md max-h-28">{trimmedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
