import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputDialog from "../../../../components/Dialog/InputDialog";
import StorageKey from "../../../../constant/storage-keys";
import { db } from "../../../../services/fireBase";
import userApi from "../../../../services/userApi";

CommentsItems.propTypes = {};

function CommentsItems({ commentObj, currentUser }) {
  const [commentAuthor, setCommentAuthor] = useState({});
  const [replyComments, setReplyComments] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultAvatar = "http://placehold.it/70x70";
  const authorAvatar = commentAuthor.avatarUrl;

  //Get Profile of comment's author
  useEffect(() => {
    (async () => {
      try {
        const userResponse = await userApi.viewProfile(commentObj.authorId);
        if (userResponse.status === 200) {
          setCommentAuthor(userResponse.data);
        }
      } catch (error) {
        console.log("Failed to get Account Inf: ", error);
      }
    })();
  }, [commentObj.authorId]);

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

  //Delete Comment
  const handleDeleteComment = async (reasonMessage) => {
    if (commentObj) {
      let check = window.confirm(
        "Are you sure wanted to delete comment? This action will also cause to reply of this comment!"
      );
      if (check) {
        setIsDisable(true);
        await deleteDoc(doc(db, "comments", commentObj.id));
        //Also delete every reply comments
        if (replyComments.length > 0) {
          replyComments.forEach(async (comment) => {
            await deleteDoc(doc(db, "comments", comment.id));
          });
        }
        setIsDisable(false);

        let currentDate = moment().valueOf();
        //Create notification when reply comments
        const newNotiDocRef = doc(collection(db, "notifications")); // Create new doc to generate id
        const notiPayload = {
          id: newNotiDocRef.id, // Give field id by doc's id
          forUserId: commentObj.authorId, //for first comment author
          fromUserId: StorageKey.ADMIN, //this is from admin
          message: reasonMessage,
          referenceId: commentObj.blogId, // Get blog Id to show which blog got comment deleted
          status: StorageKey.unviewStatus,
          date: currentDate,
          type: StorageKey.deleteComment, // Get constrain value from storage key
        };
        await setDoc(newNotiDocRef, notiPayload); // Update doc with some field
      }
    }
  };

  //Parse timestamp to date
  const dateOfComments = moment(commentObj.postedDateTime)
    .startOf("minutes")
    .fromNow();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap border rounded-md shadow-md">
        <div className="flex flex-row">
          <div>
            <img
              src={authorAvatar ? authorAvatar : defaultAvatar}
              alt="commentauthorImg"
              className="min-w-minWForCommentAvatar min-h-minHForCommentAvatar max-w-maxWForCommentAvatar max-h-maxHForCommentAvatar my-auto ml-auto mr-3 rounded-full"
            />
          </div>
          <div>
            <Link
              to={`/profile?${commentObj.authorId}`}
              className="text-sm text-gray-900 font-semibold hover:text-gray-300 transition ease-in-out duration-100 "
            >
              {commentAuthor.firstName + " " + commentAuthor.lastName}
            </Link>
            <div className="text-sm text-gray-900">
              {commentAuthor.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 border rounded-md shadow-md">
        <p className="text-sm max-w-md">{commentObj?.content}</p>
      </td>
      <td className="px-6 py-4 border rounded-md shadow-md">
        <p className="text-sm max-w-md">{dateOfComments}</p>
      </td>
      <td className="py-3 px-6 text-center border rounded-md shadow-md">
        <div className="flex item-center justify-center cursor-pointer">
          {/* Delete Icon */}
          <button
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
            disabled={isDisable}
            onClick={() => setIsDeleting(true)}
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
      {isDeleting ? (
        <InputDialog
          isCancel={() => setIsDeleting(false)}
          onSubmitReason={handleDeleteComment}
        />
      ) : null}
    </tr>
  );
}

export default CommentsItems;
