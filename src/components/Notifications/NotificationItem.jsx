import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorageKey from "../../constant/storage-keys";
import userApi from "../../services/userApi";

function NotificationItem({ notiObj }) {
  const [notiSender, setNotiSender] = useState({});
  var typeMessage = "";
  var url = "";

  //Change message type and reference base on type of notification
  switch (notiObj?.type) {
    case StorageKey.rejectblog: {
      typeMessage = "rejected your blog";
      url = `blogdetail?${notiObj?.referenceId}`;
      break;
    }
    default: {
    }
  }

  //Get noti sender infomation
  useEffect(() => {
    (async () => {
      const authorResponse = await userApi.viewProfile(notiObj.fromUserId);
      if (authorResponse.status === 200) {
        setNotiSender(authorResponse.data);
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
        <span className="ml-2 text-red-500">{typeMessage}</span>
      </div>
      <div className="italic max-h-9 overflow-hidden">{notiObj?.message}</div>
      <div className="text-xs font-semibold">
        {moment(notiObj?.date).startOf("minutes").fromNow()}
      </div>
    </Link>
  );
}

export default NotificationItem;
