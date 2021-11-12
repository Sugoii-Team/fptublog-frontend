import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Call API
import BlogStatusApi from "../../../services/blogStatusApi";

OwnBlogItems.propTypes = {
  onDeleteClick: PropTypes.func,
};

function OwnBlogItems({ blogObj, onDeleteClick, isDisable, onUndoDeleted }) {
  const [blogStatus, setBlogStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const blogDetailUrl = `/blogDetail?${blogObj.id}`;
  const updateBlogUrl = `/updateBlog?${blogObj.id}`;
  const blogOnPendingDelete = blogStatus.name === "pending deleted";
  var styleOfStatus = "";

  //Status config
  var colorForSpecStatus = "green";
  var trimmedTitle = blogObj.title.slice(0, 50);
  if (trimmedTitle.length > 49) {
    trimmedTitle += "...";
  }

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

  //Get blog Status
  useEffect(() => {
    (async () => {
      if (blogObj !== undefined) {
        try {
          setLoading(true);
          const response = BlogStatusApi.getStatusById(blogObj.statusId);
          response.then((response) => {
            setBlogStatus(response.data);
            setLoading(false);
          });
        } catch (error) {
          console.log("Failed to get Status", error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handle delete blog
  const handleDeleteOwnBlog = () => {
    onDeleteClick(blogObj.id);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap border rounded-md shadow-md">
        <div className="text-sm text-gray-900 font-semibold ">
          {trimmedTitle}
        </div>
        <div className="text-sm text-gray-900">{trimmedTitle}</div>
      </td>
      <td className="px-6 py-4 border rounded-md shadow-md">
        <p className="text-sm max-w-md">{blogObj.description}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap border rounded-md shadow-md">
        {loading ? (
          <Skeleton variant="text" width={120} height={25} />
        ) : (
          <span className={styleOfStatus}>{blogStatus.name}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border rounded-md shadow-md">
        Categories here
      </td>
      <td className="py-3 px-6 text-center border rounded-md shadow-md">
        <div className="flex item-center justify-center cursor-pointer">
          {/* View Icon */}
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
          {/* Edit Icon */}
          <Link
            /* If blog is on pending deleted then not allowed to edit */
            to={blogOnPendingDelete ? "#" : updateBlogUrl}
            onClick={
              /* If this blog is in pending deleted then click will handle undo delete else onclick will do nothing */
              blogOnPendingDelete
                ? () => {
                    onUndoDeleted(blogObj.id);
                  }
                : () => {}
            }
            className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
            disabled={isDisable}
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
          {/* Delete Icon */}
          <button
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
            disabled={isDisable}
            onClick={handleDeleteOwnBlog}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default OwnBlogItems;
