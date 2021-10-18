import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const adminApi = {
  login(data) {
    const url = "api/admin/login";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },

  getAllAccounts() {
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = "api/admin/accounts";
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  removeAccountsById(id) {
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/accounts/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    });
  },

  updateUserRole(id,params){
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/accounts/${id}`;
    return axiosClient.put(url,params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
    // const dataPromise = promise.then((response)=>response.status);
    // console.log("datapromise ne:",dataPromise);
    // return dataPromise;
  },

  banUser(id, obj){
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/accounts/${id}`;
    return axiosClient.put(url, obj,{
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
  },

  getListBannedAccount(){
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = "";
    return promise = axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
    
  },

  deleteBlog(id){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = "";
    return promise = axiosClient.put(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
  }
};

export default adminApi;
