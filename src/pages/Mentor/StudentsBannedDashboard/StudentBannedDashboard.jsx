import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnnouncementDialog from "../../../components/AnouncementStatusDialog/AnnouncementDialog";
import lecturerApi from "../../../services/lecturerApi";
import UserListSkeletons from "../Skeletons/UserListSkeletons";
import StudentBannedDashboardDetail from "./StudentBannedDashboardDetail";

StudentBannedDashboard.propTypes = {};

function StudentBannedDashboard() {
  const [user, setUser] = useState([]);

  //set reload page for useEffect filter
  const [reload, setReload] = useState();

  //status of the response for handle announcement dialog
  const [status, setStatus] = useState(false);

  //response object for getting status and message from response (successful or failed)
  const [responseObject, setResponseObject] = useState({});

  const currentUser = useSelector((state) => state.user.current);
  // console.log(currentUser);

  const [loading, setLoading] = useState(false);

  const userProfileId = currentUser.id;
  const handleUnbanAccountClick = async (studentId) => {
    const banUser = await lecturerApi.unbanStudentByStudentId(
      userProfileId,
      studentId,
      {}
    );
    console.log(banUser);
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
        if (user.some) {
          setUser([]);
        }
        const accountsData = await lecturerApi.getBannedStudentList();
        const allUser = accountsData.data;
        setUser(allUser);
        // console.log("all user nè :", allUser);
        setLoading(true);
      } catch (error) {
        console.log("Failed to fetch all user accounts: ", error);
      }
    })();
  }, [reload, currentUser, user.some]);

  return (
    <div>
      {currentUser.role === "LECTURER" ? (
        loading ? (
          <StudentBannedDashboardDetail
            userList={user}
            onUnbanClick={handleUnbanAccountClick}
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

export default StudentBannedDashboard;
