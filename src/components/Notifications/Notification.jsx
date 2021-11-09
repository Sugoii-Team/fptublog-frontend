import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../services/fireBase";
import NotificationItem from "./NotificationItem";

function Notification(props) {
  const currentUser = useSelector((state) => state.user.current);
  const isLoggedin = !!currentUser.id;
  const [notiList, setNotiList] = useState([]);

  //Get noti from firestore by current user id
  useEffect(() => {
    if (isLoggedin) {
      const q = query(
        collection(db, "notifications"),
        where("forUserId", "==", currentUser.id)
      );
      onSnapshot(q, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push(doc.data());
        });
        setNotiList(notifications);
      });
    }
  }, [isLoggedin, currentUser]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inline-block text-left z-40">
        <div
          className="origin-top-right -right-5 absolute w-96 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="p-2 max-h-96 overflow-auto" role="none">
            {/* Show noti */}
            {notiList.map((noti) => (
              <NotificationItem key={noti.id} notiObj={noti} />
            ))}
            {/* If there are no notification then show message for user */}
            {notiList.length <= 0 ? (
              <div className="text-center uppercase font-semibold text-sm">
                You have no notifications
              </div>
            ) : null}
          </div>
          <div className="flex justify-center cursor-pointer uppercase text-sm hover:text-blue-500">
            View Detail
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Notification;
