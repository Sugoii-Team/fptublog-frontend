import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnnouncementDialog from "../../../components/AnouncementStatusDialog/AnnouncementDialog";
import PageAlert from "../../../components/PageAlert/PageAlert";
import adminApi from "../../../services/adminApi";
import UserListSkeletons from "../Skeletons/UserListSkeletons";
import DashboardDetail from "./components/DashboardDetail";

DashboardPage.propTypes = {};

function DashboardPage() {
  const [user, setUser] = useState([]);

  //set reload page for useEffect filter
  const [reload, setReload] = useState();

  //status of the response for handle announcement dialog
  const [status, setStatus] = useState(false);

  //response object for getting status and message from response (successful or failed)
  const [responseObject, setResponseObject] = useState({});

  const currentUser = useSelector((state) => state.admin.current);
  // console.log(currentUser);

  const [loading, setLoading] = useState(false);

  const handleUpdateUserRole = async (data) => {
    const updateUserRole = await adminApi.updateUserRole(data.id, data);
    console.log("UpdateUserRole ne: ", updateUserRole);
    if (updateUserRole.status === 200) {
      setStatus(true);
      setResponseObject(updateUserRole);
    }
    setReload({});
  };

  const handleRemoveClick = async (id) => {
    const deleteUser = await adminApi.removeAccountsById(id);
    console.log(deleteUser);
    if (deleteUser.status === 200) {
      setStatus(true);
      setResponseObject(deleteUser);
    }
    setReload({});
  };

  const handleBanAccountClick = async (id) => {
    const obj = { id: id };

    const banUser = await adminApi.banUser(id, obj);
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
        if (currentUser.role === "ADMIN") {
          if (user.some) {
            setUser([]);
          }
          const accountsData = await adminApi.getAllAccounts();
          const allUser = accountsData.data;
          setUser(allUser);
          setLoading(true);
        }
      } catch (error) {
        console.log("Failed to fetch all user accounts: ", error);
      }
    })();
  }, [reload, currentUser, user.some]);

  return (
    <div>
      {currentUser.role === "ADMIN" ? (
        loading ? (
          <DashboardDetail
            userList={user}
            dataOfUserToUpdate={handleUpdateUserRole}
            onRemoveClick={handleRemoveClick}
            onBanClick={handleBanAccountClick}
          />
        ) : (
          <UserListSkeletons />
        )
      ) : (
        <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
        />
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

export default DashboardPage;
