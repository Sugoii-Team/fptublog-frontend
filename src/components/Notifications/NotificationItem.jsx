import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorageKey from "../../constant/storage-keys";
import userApi from "../../services/userApi";

function NotificationItem({ notiObj }) {
  const [notiSender, setNotiSender] = useState({});
  var typeMessage = "";
  var url = "";
  var stateColor = "red";

  //Change message type and reference base on type of notification
  switch (notiObj?.type) {
    case StorageKey.rejectblog: {
      typeMessage = "Rejected your blog";
      url = `blogdetail?${notiObj?.referenceId}`; //Noti on Blog so assign blog Id to ref
      stateColor = "red";
      break;
    }
    case StorageKey.replyComment: {
      typeMessage = "Reply your comment";
      url = `blogdetail?${notiObj?.referenceId}`; //Noti on Blog so assign blog Id to ref
      stateColor = "blue";
      break;
    }
    case StorageKey.commentBlog: {
      typeMessage = "Comments on your posted blog";
      url = `blogdetail?${notiObj?.referenceId}`; //Noti on Blog so assign blog Id to ref
      stateColor = "blue";
      break;
    }
    case StorageKey.deleteComment: {
      typeMessage = "Deleted your comment";
      url = `blogdetail?${notiObj?.referenceId}`; //Noti on Blog so assign blog Id to ref
      stateColor = "red";
      break;
    }
    default: {
    }
  }

  //Get noti sender infomation
  useEffect(() => {
    (async () => {
      if (notiObj.fromUserId === StorageKey.ADMIN) {
        setNotiSender({ firstName: "Admin", lastName: "" });
      } else {
        const authorResponse = await userApi.viewProfile(notiObj.fromUserId);
        if (authorResponse.status === 200) {
          setNotiSender(authorResponse.data);
        }
      }
    })();
  }, [notiObj.fromUserId]);

  return (
    <Link
      to={url}
      className="text-gray-700 block text-sm hover:bg-gray-100 p-2 border rounded-md shadow-md mb-2 max-h-28 overflow-hidden cursor-pointer"
    >
      <div className="max-h-10 overflow-hidden">
        <span className="font-bold">
          {notiSender.firstName + " " + notiSender.lastName}
        </span>
        <span className={`ml-1 text-${stateColor}-500`}>{typeMessage}</span>
      </div>
      <div className="italic max-h-9 overflow-hidden">{notiObj?.message}</div>
      <div className=" mt-1 text-xs font-semibold">
        {moment(notiObj?.date).startOf("minutes").fromNow()}
      </div>
    </Link>
  );
}

export default NotificationItem;
