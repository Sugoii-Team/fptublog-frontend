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

  
  getListBannedAccount(){
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = "api/admin/accounts/bannedaccounts";
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    });
  },
  
  banUser(id, obj){
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/accounts/${id}`;
    return axiosClient.put(url, obj,{
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
    });
  },

  //only admin can delete a blog by id
  deleteBlogById(id){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/blogs/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    });
  }
};

export default adminApi;
