import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../services/blogApi";
import PropTypes from "prop-types";
//Firebase
CommentsFeature.propTypes = {
  handleDeleteComment: PropTypes.func,
};

CommentsFeature.defaultProps = {};

function CommentsFeature(props) {
  const { commentObj, handleDeleteComment } = props;
  const [commentAuthor, setCommentAuthor] = useState({});
  const currentDate = moment(commentObj.postedDateTime)
    .startOf("minutes")
    .fromNow();
  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = commentAuthor.avatarUrl;
  //Get comment's author
  useEffect(() => {
    (async () => {
      try {
        const authorData = await blogApi.getAuthorById(commentObj.authorId);
        setCommentAuthor(authorData.data);
      } catch (error) {
        console.log("Failed to get comment's author:", error);
      }
    })();
  }, [commentObj.authorId]);

  const onDeleteClick = () => {
    handleDeleteComment(commentObj);
  };

  return (
    <div className="ml-20">
      <div className="flex flex-row">
        {/* User Avatar */}
        <div className="mr-2 ml-4 mt-1">
          <Link to="">
            <img
              className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 rounded-md"
              alt="img"
              src={authorAvatar ? authorAvatar : defaultAvatar}
            />
          </Link>
        </div>
        {/* User Avatar */}
        <div className="">
          <div className="comment-content">
            {/* UserName */}
            <Link to="#" className="font-semibold text-md">
              {commentAuthor.firstName + " " + commentAuthor.lastName}
            </Link>
            {/* UserName */}
            {/* Posted Date */}
            <div className="text-sm italic">Commented: {currentDate}</div>
            {/* Posted Date */}

            {/* Comment's Content */}
            <p className="max-w-5xl my-2">{commentObj.content}</p>
            {/* Comment's Content */}
          </div>
          {/* Bottom */}
          <div className="flex flex-row cursor-pointer">
            {/* Delete icon */}
            <div
              className="py-1 mr-1 transform hover:text-red-500 hover:scale-110"
              onClick={(e) => onDeleteClick(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            </div>
            {/* Edit icon */}
            <div className="py-1 mr-1 transform hover:text-yellow-500 hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>

            {/* Reply icon */}
            <div className="py-1 transform hover:text-blue-500 hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsFeature;
