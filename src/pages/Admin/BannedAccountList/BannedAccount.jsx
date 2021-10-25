import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import adminApi from '../../../services/adminApi';
import BannedAccountList from './components/BannedAccountList';

function BannedAccount() {
  const [bannedAccountsList, setBannedAccountsList] = useState([]);
  const currentUser = useSelector((state) => state.admin.current);

  //Call api to get banned user
  useEffect(() => {
    (async () => {
      try {
        const response = adminApi.getListBannedAccount();
        response.then((res) => setBannedAccountsList(res.data));
        console.log("data bannedAccount ne(BannedAccount.jsx): ", bannedAccountsList);
      } catch (error) {
        console.log("Failed to load banned account list");
      }
    })();
  }, []);


  return (
    <div>
      {currentUser.role === "ADMIN" ?
        <BannedAccountList listBannedAccounts={bannedAccountsList} />
        :
        <p className="text-center text-2xl my-10">
        You need permission to acces this page (ONLY FOR ADMIN !)
        </p>
      }
    </div>
  );
}

export default BannedAccount;