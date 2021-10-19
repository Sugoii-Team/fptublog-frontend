import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";
const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const ratingApi = {
  getBlogRating(blogId) {
    const url = `api/blogs/${blogId}/rates`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getUserRating(blogId) {
    const url = `api/blogs/${blogId}/votes`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  sendRating(blogId, data) {
    const url = `api/blogs/${blogId}/votes`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default ratingApi;
