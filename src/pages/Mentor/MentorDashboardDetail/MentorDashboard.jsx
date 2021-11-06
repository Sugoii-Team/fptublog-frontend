import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnnouncementDialog from "../../../components/AnouncementStatusDialog/AnnouncementDialog";
import lecturerApi from "../../../services/lecturerApi";
import MentorDashboardDetail from "./MentorDashboardDetail";
import UserListSkeletons from "../Skeletons/UserListSkeletons";

MentorDashboard.propTypes = {};

function MentorDashboard() {
  const [user, setUser] = useState([]);

  //set reload page for useEffect filter
  const [reload, setReload] = useState();

  //status of the response for handle announcement dialog
  const [status, setStatus] = useState(false);

  //response object for getting status and message from response (successful or failed)
  const [responseObject, setResponseObject] = useState({});

  const currentUser = useSelector((state) => state.user.current);

  const [loading, setLoading] = useState(false);

  // const handleRemoveClick = async (id) => {
  //   const deleteUser = await lecturerApi.removeAccountsById(id);
  //   console.log(deleteUser);
  //   if (deleteUser.status === 200) {
  //     setStatus(true);
  //     setResponseObject(deleteUser);
  //   }
  //   setReload({});
  // };

  const currentUserId = currentUser.id;

  const handleBanAccountClick = async (id, message) => {
    // console.log("curent user, id:",currentUser.id, id, message);
    const banUser = await lecturerApi.banStudentByStudentId(currentUserId, id, message);
    if (banUser.status === 200) {
      setStatus(true);
      setResponseObject(banUser);
    }
    setReload({});
  };

  //handle close and open announcement (successful or failed) dialog
  const handleAnnouncementDialogOKClick = (values) => {
    setStatus(values);
  };

  useEffect(() => {
    (async () => {
      try {
        // if (currentUser.role === "LECTURER") {
        //   if (user.some) {
        //     setUser([]);
        //   } 
            const accountsData = await lecturerApi.getStudentList();
            const allUser = accountsData.data;
            console.log("all user ne: ", accountsData);
            setUser(allUser);
            setLoading(true);
        // }
      } catch (error) {
        console.log("Failed to fetch all user accounts: ", error);
      }
    })();
  }, [reload, currentUser, user.some]);

  return (
    <div>
      {currentUser.role === "LECTURER" ? (
        loading ? (
          <MentorDashboardDetail
            userList={user}
            onBanClick={handleBanAccountClick}
          />
        ) : (
          <UserListSkeletons />
        )
      ) : (
        <p className="text-center text-2xl my-10">
          You need permission to acces this page (ONLY FOR LECTURER !)
        </p>
      )}
      {/* Show annountment dialog */}
      {status ? (
        <AnnouncementDialog
          responseStatus={handleAnnouncementDialogOKClick}
          responseObject={responseObject}
        />
      ) : null}
    </div>
  );
}

export default MentorDashboard;
