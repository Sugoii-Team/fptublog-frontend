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

  viewProfile(userId) {
    const url = `api/accounts/${userId}`;
    return axiosClient.get(url);
  },

  getPopularBlogOfUser(authorId, currentPage, limitBlog) {
    const url = `api/blogs/authors/${authorId}/approved?limit=${limitBlog}&page=${currentPage}&sort_by=avg_rate&order_by=desc`;
    return axiosClient.get(url);
  },

  getOwnBlog(userId) {
    const url = `api/blogs/authors/${userId}?limit=50&page=1`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getMajorList() {
    const url = "api/majors";
    return axiosClient.get(url);
  },

  getStudentById(id) {
    const url = `api/students/${id}`;
    return axiosClient.get(url);
  },

  getStudentMajorByMajorId(majorId) {
    const url = `api/majors/${majorId}`;
    return axiosClient.get(url);
  },

  updateStudentProfile(id, data) {
    const url = `api/students/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  updateAccountProfile(accountId, data) {
    const url = `api/accounts/${accountId}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getBanMessage(userId) {
    const url = `api/accounts/${userId}/banned_info`;
    return axiosClient.get(url);
  },
};

export default userApi;
