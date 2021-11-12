import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
        (loading && bannedAccountsList.length > 0) ? (
          <BannedAccountList listBannedAccounts={bannedAccountsList} />
        ) : (
          bannedAccountsList.length === 0 ?
            <p className="text-center text-2xl my-10">
             Banned Account list is empty (No one is banned!)
            </p>
            :
            <UserListSkeletons />
        )
      ) : (
        <p className="text-center text-2xl my-10">
          You need permission to acces this page (ONLY FOR ADMIN !)
        </p>
      )}
    </div>
  );
}

export default BannedAccount;
