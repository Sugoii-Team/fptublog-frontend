import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
const userApi = {
  register(data) {
    const url = "api/auth/registration";
    const promise = axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    var dataPromise = promise.then((respone) => respone);
    return dataPromise;
  },

  login(data) {
    const url = "api/auth/login";
    const promise = axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    var dataPromise = promise.then((respone) => respone);
    return dataPromise;
  },

  viewProfile(params, token) {
    const url = "api/test";
    const headers = { Authorization: token };
    return axiosClient.get(url, {
      params,
      headers,
    });
  },

  getOwnBlog(userId) {
    const url = `api/blogs/authors/${userId}?limit=10&page=1`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default userApi;
