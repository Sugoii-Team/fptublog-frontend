import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../services/blogApi";
import BlogStatusApi from "../../../services/blogStatusApi";

TableItems.propTypes = {
  blog: PropTypes.object.isRequired,
};

TableItems.defaultProps = {
  blog: {},
};

function TableItems({ blog }) {
  const [author, setAuthor] = useState({});
  const [blogStatus, setBlogStatus] = useState({});
  const blogDetailUrl = `/blogdetail?${blog.id}`;
  var trimmedTitle = blog.title.slice(0, 50) + "...";
  var colorForSpecStatus = "yellow";
  var styleOfStatus;

  /* Update color by status */
  switch (blogStatus.name) {
    case "approved": {
      colorForSpecStatus = "green";
      break;
    }
    case "delete":
    case "pending deleted":
    case "banned": {
      colorForSpecStatus = "red";
      break;
    }
    case "pending approved":
    case "pending updated":
    case "draft": {
      colorForSpecStatus = "yellow";
      break;
    }
    default: {
    }
  }
  styleOfStatus = `px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${colorForSpecStatus}-100 text-${colorForSpecStatus}-800 capitalize`;

  //Get blog author
  useEffect(() => {
    (async () => {
      try {
        const author = await blogApi.getAuthorById(blog.authorId);
        setAuthor(author.data);
      } catch (error) {}
    })();
  }, [blog.authorId]);

  //Get blog Status
  useEffect(() => {
    (async () => {
      if (blog !== undefined) {
        try {
          const response = BlogStatusApi.getStatusById(blog.statusId);
          response.then((response) => {
            setBlogStatus(response.data);
          });
        } catch (error) {
          console.log("Failed to get Status", error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={blogDetailUrl}
          className="text-sm text-gray-900 font-semibold"
        >
          {trimmedTitle}
        </Link>
        <div className="text-sm text-gray-900">
          {author.firstName + " " + author.lastName}
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm max-w-md">{blog.description}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={styleOfStatus}>{blogStatus.name}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex item-center justify-center cursor-pointer">
          <Link
            to={blogDetailUrl}
            className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default TableItems;
