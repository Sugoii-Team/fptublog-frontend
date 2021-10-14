import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../../services/blogApi";

function CommentsFeature(props) {
  const { commentObj } = props;
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

  return (
    <div className="ml-20">
      <div className="flex flex-row">
        {/* User Avatar */}
        <div className="mr-2 ml-4 mt-1">
          <Link to="">
            <img
              className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 border border-black"
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
          <div>
            <Link
              rel="nofollow"
              className="text-sm font-semibold uppercase ml-1"
              to="#"
              title="Reply"
            >
              Reply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsFeature;
