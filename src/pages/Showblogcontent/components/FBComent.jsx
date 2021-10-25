//React library
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
//Firebase things
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../services/fireBase";
import CommentsFeature from "./Comments";
import moment from "moment";

FBComent.propTypes = {
  blogId: PropTypes.string.isRequired,
};

FBComent.defaultProps = {
  blogId: "",
};

function FBComent({ blogId }) {
  //Generate Field
  const curUser = useSelector((state) => state.user.current);
  const isLoggedin = !!curUser.id;
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const totalComments = comments.length;

  //Save comment to firestore
  const handleSubmitComment = async (e) => {
    //Get current date to post
    let currentDate = moment().valueOf();
    e.preventDefault();
    setContent(""); // set empty content when user submit
    const payload = {
      blogId,
      authorId: curUser.id,
      content,
      postedDateTime: currentDate,
      statusId: "status01",
      replyTo: null,
    };
    await addDoc(collection(db, "comments"), payload);
  };

  //Delete Comment
  const handleDeleteComment = async (e, commentObj) => {
    console.log("Comment obj ne: ", e);
  };

  //Get comment from firestore by BlogId
  useEffect(() => {
    const q = query(collection(db, "comments"), where("blogId", "==", blogId));
    onSnapshot(q, (querySnapshot) => {
      const commentsFilter = [];
      querySnapshot.forEach((doc) => {
        commentsFilter.push(doc.data());
      });
      setComments(commentsFilter);
    });
  }, [blogId]);

  return (
    <div>
      <h2 className="text-center text-lg mb-3">{totalComments} Comments</h2>

      {/* Print all comments */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="mb-4">
            <CommentsFeature
              commentObj={comment}
              handleDeleteComment={handleDeleteComment}
            />
          </li>
        ))}
      </ul>
      {/* Print all comments */}

      {isLoggedin ? (
        <div className="w-11/12 flex mx-auto my-4">
          <div className="w-full mt-16 p-5 border-2 border-gray-600 rounded-lg">
            <p className="uppercase text-lg font-semibold">Leave a Comment</p>
            {/* Comment Form */}
            <form onSubmit={(e) => handleSubmitComment(e)}>
              <div className="w-full border-2 rounded-sm">
                <p>
                  <textarea
                    className="w-full px-2 py-2"
                    id="comment"
                    name="comment"
                    placeholder="Enter your comment here..."
                    rows="3"
                    required="required"
                    value={content}
                    onInput={(e) => setContent(e?.target.value)}
                  />
                </p>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="mt-3 mr-1 bg-white text-black border border-gray-300 border-opacity-50 rounded-md shadow-lg cursor-pointer hover:opacity-60 
                transition ease-in-out duration-200 transform hover:-translate-y-0.5 hover:scale-105 px-4 py-1 font-semibold"
                >
                  Comment{" "}
                </button>
              </div>
            </form>
            {/* Comment Form */}
          </div>
          {/* <!-- Comment Reply /- --> */}{" "}
        </div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="font-bold text-2xl">Loggin to post comment!</div>
        </div>
      )}
      {/* <!-- Comment Reply --> */}
    </div>
  );
}

export default FBComent;
