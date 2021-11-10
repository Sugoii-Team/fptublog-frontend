//React library
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
//Firebase things
import {
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../services/fireBase";
import CommentsFeature from "./Comments";
import moment from "moment";
import StorageKey from "../../../constant/storage-keys";

FBComent.propTypes = {
  blogId: PropTypes.string.isRequired,
};

FBComent.defaultProps = {
  blogId: "",
};

function FBComent({ blogId, authorId }) {
  //Generate Field
  const curUser = useSelector((state) => state.user.current);
  const isLoggedin = !!curUser.id;
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  //const totalComments = comments.length; //fix later

  //Save comment to firestore
  const handleSubmitComment = async (e) => {
    //Get current date to post
    let currentDate = moment().valueOf();
    e.preventDefault();
    setContent(""); // set empty content when user submit
    const newDocRef = doc(collection(db, "comments")); // Create new doc to generate id
    const payload = {
      id: newDocRef.id, // Give field id by doc's id
      blogId,
      authorId: curUser.id,
      content,
      postedDateTime: currentDate,
      statusId: null,
      replyTo: null, //New comment no need to reply
    };
    await setDoc(newDocRef, payload); // Update doc with some field

    //Create notification when submit comments
    if (curUser.id !== authorId) {
      // If commenter id is different from blog poster then send noti
      const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
      const notiPayload = {
        id: newNotiDocRef.id, // Give field id by doc's id
        forUserId: authorId, //for blog poster
        fromUserId: curUser.id,
        message: content,
        referenceId: blogId, // Get blog Id to show which blog got comment
        status: StorageKey.unviewStatus,
        date: currentDate,
        type: StorageKey.commentBlog, // Get constrain value from storage key
      };
      await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
    }
  };

  //Get comment from firestore by BlogId and no reply
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("blogId", "==", blogId),
      where("replyTo", "==", null)
    );
    onSnapshot(q, (querySnapshot) => {
      const commentsFilter = [];
      querySnapshot.forEach((doc) => {
        commentsFilter.push(doc.data());
      });
      setComments(commentsFilter);
    });
  }, [blogId]);

  //Save reply comment
  const handleSubmitReply = async (value) => {
    //Get current date to post
    if (value) {
      let currentDate = moment().valueOf();
      const newDocRef = doc(collection(db, "comments")); // Create new doc to generate id
      const payload = {
        id: newDocRef.id, // Give field id by doc's id
        blogId,
        authorId: curUser.id,
        content: value.content, // Value from below components
        postedDateTime: currentDate,
        statusId: null,
        replyTo: value.replyTo, // Value from below components
      };
      await setDoc(newDocRef, payload); // Update doc with some field

      //Create notification when reply comments
      const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
      const notiPayload = {
        id: newNotiDocRef.id, // Give field id by doc's id
        forUserId: value.commentAuthor, //for first comment author
        fromUserId: curUser.id,
        message: value.content,
        referenceId: blogId, // Get blog Id to show which blog got reply
        status: StorageKey.unviewStatus,
        date: currentDate,
        type: StorageKey.replyComment, // Get constrain value from storage key
      };
      await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
    }
  };

  //Delete Comment
  const handleDeleteComment = async (commentObj, replyList) => {
    if (commentObj) {
      let check = window.confirm("Are you sure wanted to delete comment?");
      if (check) {
        await deleteDoc(doc(db, "comments", commentObj.id));
        //Also delete every reply comments
        if (replyList.length > 0) {
          replyList.forEach(async (comment) => {
            await deleteDoc(doc(db, "comments", comment.id));
          });
        }
      }
    }
  };

  //Update comments
  const handleUpdateComment = async (value) => {
    const washingtonRef = doc(db, "comments", value.id);
    await updateDoc(washingtonRef, {
      content: value.content,
    });
  };

  return (
    <div>
      <h2 className="text-center text-lg mb-3">Comments</h2>

      {/* Print all comments */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="mb-4">
            <CommentsFeature
              commentObj={comment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
              handleReplySubmit={handleSubmitReply}
            />
          </li>
        ))}
      </ul>
      {/* Print all comments */}

      {/* Comments form */}
      {isLoggedin ? (
        <div className="w-11/12 flex mx-auto my-4">
          <div className="w-full mt-16 p-5 border-2 border-gray-600 rounded-lg">
            <p className="uppercase text-lg font-semibold">Leave a Comment</p>
            {/* Comment Form */}
            <form onSubmit={(e) => handleSubmitComment(e)}>
              <div className="w-full ">
                <p>
                  <textarea
                    className="w-full px-2 py-2 border-2 rounded-sm"
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
        </div>
      ) : (
        <div className="flex justify-center my-9">
          <div className="font-bold text-2xl uppercase">
            Loggin to post comment!
          </div>
        </div>
      )}
    </div>
  );
}

export default FBComent;
