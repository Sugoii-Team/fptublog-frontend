import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import blogApi from "../../../services/blogApi";
import moment from "moment";
import { useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../../../services/fireBase";

ReplyComments.propTypes = {
  replyOfReplyComment: PropTypes.func,
};

ReplyComments.defaultProps = {};

function ReplyComments(props) {
  const currentUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!currentUser.id;
  const { commentObj, replyOfReplyComment } = props;
  const [commentAuthor, setCommentAuthor] = useState({});
  const [editContent, setEditContent] = useState("");
  const [onEditing, setOnEditing] = useState(false);
  const currentDate = moment(commentObj.postedDateTime)
    .startOf("minutes")
    .fromNow();
  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = commentAuthor.avatarUrl;
  //Get comment's author
  useEffect(() => {
    (async () => {
      if (commentObj) {
        try {
          const authorData = await blogApi.getAuthorById(commentObj.authorId);
          setCommentAuthor(authorData.data);
        } catch (error) {
          console.log("Failed to get comment's author:", error);
        }
      }
    })();
  }, [commentObj]);

  /* If click update then show content */
  useEffect(() => {
    setEditContent(commentObj.content);
  }, [onEditing, commentObj.content]);

  //Delete Reply comments
  const onDeleteClick = async () => {
    if (commentObj) {
      let check = window.confirm("Are you sure wanted to delete comment?");
      if (check) {
        await deleteDoc(doc(db, "comments", commentObj.id));
      }
    }
  };

  //Update reply comments
  const onUpdateClick = async () => {
    const washingtonRef = doc(db, "comments", commentObj.id);
    await updateDoc(washingtonRef, {
      content: editContent,
    });
    setOnEditing(!onEditing);
  };

  const onReplyClick = () => {
    replyOfReplyComment(commentObj.authorId);
  };

  return (
    <div className="ml-20 mt-3">
      <div className="flex flex-row">
        {/* User Avatar */}
        <div className="mr-2 ml-4 mt-1">
          <Link to={`/profile?${commentAuthor.id}`}>
            <img
              className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 rounded-md"
              alt="img"
              src={authorAvatar ? authorAvatar : defaultAvatar}
            />
          </Link>
        </div>
        {/* User Avatar */}
        <div className="w-full">
          <div className="comment-content">
            {/* UserName */}
            <Link
              to={`/profile?${commentAuthor.id}`}
              className="font-semibold text-md"
            >
              {commentAuthor.firstName + " " + commentAuthor.lastName}
            </Link>
            {/* UserName */}
            {/* Posted Date */}
            <div className="text-sm italic">Commented: {currentDate}</div>
            {/* Posted Date */}

            {/* Comment's Content */}
            {onEditing ? (
              <p className="flex flex-col">
                <textarea
                  className="w-10/12 px-2 py-2 border-2"
                  id="comment"
                  name="comment"
                  placeholder="Enter your comment here..."
                  rows="5"
                  required="required"
                  value={editContent}
                  onInput={(e) => setEditContent(e?.target.value)}
                ></textarea>
                <button
                  className="w-24 mt-1 mb-2 mr-1 bg-white text-black border border-gray-300 border-opacity-50 rounded-md cursor-pointer hover:opacity-60 
                  transition ease-in-out duration-200 transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 font-semibold text-sm"
                  onClick={onUpdateClick}
                >
                  Update
                </button>
              </p>
            ) : (
              <p className="max-w-5xl my-2">{commentObj.content}</p>
            )}

            {/* Comment's Content */}
          </div>
          {/* Bottom */}
          {isLoggedIn || currentUser.role === "ADMIN" ? (
            <div className="flex flex-row cursor-pointer">
              {/* Delete icon */}
              {currentUser.id === commentObj.authorId ||
              currentUser.role === "ADMIN" ? (
                <>
                  <div
                    className="py-1 mr-1 transform hover:text-red-500 hover:scale-110"
                    onClick={() => onDeleteClick()}
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
                  <div
                    className="py-1 mr-1 transform hover:text-yellow-500 hover:scale-110"
                    onClick={() => setOnEditing(!onEditing)}
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                </>
              ) : null}

              {/* Reply icon */}
              <div
                className="py-1 transform hover:text-blue-500 hover:scale-110"
                onClick={() => onReplyClick()}
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ReplyComments;
