import React, { useEffect, useState } from 'react';
import adminApi from '../../../services/adminApi';
import BannedAccountList from './components/BannedAccountList';

function BannedAccount(props) {
 const [bannedAccountsList, setBannedAccountsList] = useState([]);
 useEffect(() => { 
   (async () => {
     try {
       const response = adminApi.getListBannedAccount();
       const listOfBanAccount = response.data;
       console.log("data bannedAccount ne(BannedAccount.jsx): ", listOfBanAccount);
       setBannedAccountsList(listOfBanAccount);
     } catch (error) {
       console.log("Failed to load banned account list");
     }
   })();
  }, []);


  return (
    <div>
      <BannedAccountList listBannedAccounts= {bannedAccountsList}/>
    </div>
  );
}

export default BannedAccount;