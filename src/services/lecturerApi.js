import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const lecturerApi = {
  getReviewingBlog(lectureId, params) {
    const url = `api/lecturers/${lectureId}/reviewingBlogs`;
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      params,
    });
  },

  approveBlog(blogId, data, lectureId) {
    const url = `api/lecturers/${lectureId}/reviewingBlogs/${blogId}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default lecturerApi;
