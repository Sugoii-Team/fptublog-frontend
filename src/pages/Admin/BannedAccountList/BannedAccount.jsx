import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageAlert from "../../../components/PageAlert/PageAlert";
import adminApi from "../../../services/adminApi";
import UserListSkeletons from "../Skeletons/UserListSkeletons";
import BannedAccountList from "./components/BannedAccountList";

function BannedAccount() {
  const [bannedAccountsList, setBannedAccountsList] = useState([]);
  const currentUser = useSelector((state) => state.admin.current);
  const [loading, setLoading] = useState(false);

  //Call api to get banned user
  useEffect(() => {
    (async () => {
      try {
        const response = adminApi.getListBannedAccount();
        response.then((res) => setBannedAccountsList(res.data));
        setLoading(true);
      } catch (error) {
        console.log("Failed to load banned account list");
      }
    })();
  }, [bannedAccountsList]);

  return (
    <div>
      {currentUser.role === "ADMIN" ? (
        loading ? (
          <BannedAccountList listBannedAccounts={bannedAccountsList} />
        ) : (
          <UserListSkeletons />
        )
      ) : (
        <PageAlert
          title="Access Denied"
          description="You don't have permission to view this page!"
        />
      )}
    </div>
  );
}

export default BannedAccount;
