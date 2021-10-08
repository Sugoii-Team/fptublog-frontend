import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const lecturerApi = {
  getReviewingBlog(lectureId, params) {
    const url = `api/blogs/lecturers/${lectureId}`;
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      params,
    });
  },
};

export default lecturerApi;
