import React, { useEffect, useState } from "react";
import adminApi from "../../../services/adminApi";
import BannedAccountList from "./components/BannedAccountList";

function BannedAccount(props) {
  const [bannedAccountsList, setBannedAccountsList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = adminApi.getListBannedAccount();
        response.then((res) => setBannedAccountsList(res.data));
        console.log(
          "data bannedAccount ne(BannedAccount.jsx): ",
          bannedAccountsList
        );
      } catch (error) {
        console.log("Failed to load banned account list");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BannedAccountList listBannedAccounts={bannedAccountsList} />
    </div>
  );
}

export default BannedAccount;
