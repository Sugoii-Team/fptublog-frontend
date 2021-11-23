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
  },

  updateLecturerField(id, data) {
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/lecturers/${id}/fields`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  deleteCategoryByCategoryId(categoryId){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/categories/${categoryId}`;
    return axiosClient.delete(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  deleteFieldByFieldId(fieldId){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/fields/${fieldId}`;
    return axiosClient.delete(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  createCategory(data){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/categories`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  createField(data){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    const url = `api/admin/fields`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  adminPostBlog(data){
    const accessToken = "Bearer "+localStorage.getItem(StorageKey.TOKEN);
    console.log("token: ", accessToken);
    const url = 'api/admin/blogs';
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default adminApi;
