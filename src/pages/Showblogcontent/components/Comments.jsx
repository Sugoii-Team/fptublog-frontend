import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

//Components and Library
import moment from "moment";
import blogApi from "../../../services/blogApi";
import ReplyComments from "./ReplyComments";

//Firebase
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../../services/fireBase";

CommentsFeature.propTypes = {
  handleDeleteComment: PropTypes.func,
  handleUpdateComment: PropTypes.func,
  handleReplySubmit: PropTypes.func,
};

CommentsFeature.defaultProps = {};

function CommentsFeature(props) {
  const currentUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!currentUser.id;
  const {
    commentObj,
    handleDeleteComment,
    handleUpdateComment,
    handleReplySubmit,
  } = props;
  const [commentAuthor, setCommentAuthor] = useState({});
  const [replyComments, setReplyComments] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [onReplying, setOnReplying] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [onEditing, setOnEditing] = useState(false);
  const [onReplyOfReply, setOnReplyOfReply] = useState(false);
  const [replyOfReplyAuthorId, setReplyOfReplyAuthorId] = useState("");
  const [replyOfReplyAuthorObj, setReplyOfReplyAuthorObj] = useState({});

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
        if (replyOfReplyAuthorId) {
          const replyAuthorData = await blogApi.getAuthorById(
            replyOfReplyAuthorId
          );
          setReplyOfReplyAuthorObj(replyAuthorData.data);
        }
      } catch (error) {
        console.log("Failed to get comment's author:", error);
      }
    })();
  }, [commentObj.authorId, replyOfReplyAuthorId]);

  /* If click update then show content */
  useEffect(() => {
    setEditContent(commentObj.content);
  }, [onEditing, commentObj.content]);

  /* Give replying to name inside box of reply form */
  useEffect(() => {
    if (onReplyOfReply) {
      setReplyContent(
        `@${
          replyOfReplyAuthorObj.firstName + " " + replyOfReplyAuthorObj.lastName
        } `
      );
    } else {
      setReplyContent(
        `@${commentAuthor.firstName + " " + commentAuthor.lastName} `
      );
    }
  }, [onReplying, commentAuthor, onReplyOfReply, replyOfReplyAuthorObj]);

  //Get every reply comments
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("replyTo", "==", commentObj.id)
    );
    onSnapshot(q, (querySnapshot) => {
      const commentsFilter = [];
      querySnapshot.forEach((doc) => {
        commentsFilter.push(doc.data());
      });
      setReplyComments(commentsFilter);
    });
  }, [commentObj.id, commentObj.replyTo]);

  //Handle delete button event
  const onDeleteClick = () => {
    handleDeleteComment(commentObj, replyComments);
  };

  //Handle update button event
  const onUpdateClick = () => {
    handleUpdateComment({ id: commentObj.id, content: editContent });
    setOnEditing(!onEditing);
  };

  //Handle when user submit reply
  const onReplySubmitClick = (e) => {
    e.preventDefault(); // prevent page reloading
    //Check is user fill anything yet
    let isInputAnything;
    if (onReplyOfReply) {
      //If this reply is for replied user then cut off replier name
      isInputAnything = replyContent.replace(
        `@${
          replyOfReplyAuthorObj.firstName + " " + replyOfReplyAuthorObj.lastName
        } `,
        ""
      );
    } else {
      //Else check for main comment user reply
      isInputAnything = replyContent.replace(
        `@${commentAuthor.firstName + " " + commentAuthor.lastName} `,
        ""
      );
    }
    if (isInputAnything.length < 1) {
      alert("Please fill something!");
    } else {
      handleReplySubmit({ content: replyContent, replyTo: commentObj.id });
      setOnReplying(!onReplying);
      setOnReplyOfReply(false); // Set this to prevent misunderstand in logic
    }
  };

  //Handle update author name when User deeper reply
  const replyOfReplyComment = (replyToAuthorId) => {
    setReplyOfReplyAuthorId(replyToAuthorId); //Set id to get below comment author inf
    setOnReplyOfReply(!onReplyOfReply);
    setOnReplying(!onReplying);
  };

  return (
    <div className="ml-20">
      <div className="flex flex-row">
        {/* Comment author's Avatar */}
        <div className="mr-2 ml-4 mt-1">
          <Link to="">
            <img
              className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 rounded-md"
              alt="img"
              src={authorAvatar ? authorAvatar : defaultAvatar}
            />
          </Link>
        </div>
        {/* Comments data section */}
        <div className="w-full">
          <div className="comment-content">
            {/* Comment's author name */}
            <Link to="#" className="font-semibold text-md">
              {commentAuthor.firstName + " " + commentAuthor.lastName}
            </Link>
            {/* Posted Date */}
            <div className="text-sm italic">Commented: {currentDate}</div>

            {/* Comment's Content and editing*/}
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

            {/* Comment's Content and editing*/}
          </div>
          {/* Bottom */}
          {isLoggedIn ? (
            <div className="flex flex-row cursor-pointer">
              {/* Delete icon */}
              {currentUser.id === commentObj.authorId ? (
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
                onClick={() => setOnReplying(!onReplying)}
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
      {/* Show reply comments */}
      {replyComments?.map((comment) => (
        <div key={comment.id}>
          <ReplyComments
            commentObj={comment}
            replyOfReplyComment={replyOfReplyComment}
          />
        </div>
      ))}
      {/* Show Reply form */}
      {onReplying ? (
        <div className="w-11/12 flex ml-20">
          <div className="w-full p-2 border-2 border-gray-600 rounded-lg">
            <p className="uppercase text-base font-semibold">Reply</p>
            {/* Comment Form */}
            <form onSubmit={(e) => onReplySubmitClick(e)}>
              <div className="w-full ">
                <p>
                  <textarea
                    className="w-full px-2 py-2 border-2 rounded-sm"
                    id="comment"
                    name="comment"
                    placeholder="Enter your reply here..."
                    rows="2"
                    required="required"
                    value={replyContent}
                    autoFocus={onReplying}
                    onInput={(e) => setReplyContent(e?.target.value)}
                  />
                </p>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="mr-1 bg-white text-black border border-gray-300 border-opacity-50 rounded-md shadow-lg cursor-pointer hover:opacity-60 
                transition ease-in-out duration-200 transform hover:-translate-y-0.5 hover:scale-105 px-2 py-1 font-semibold"
                >
                  Reply{" "}
                </button>
              </div>
            </form>
            {/* Comment Form */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CommentsFeature;
