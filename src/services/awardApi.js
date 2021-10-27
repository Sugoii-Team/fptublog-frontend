import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";
const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const awardApi = {
  getAllAward() {
    const url = `api/awards`;
    return axiosClient.get(url);
  },

  giveAwardToStudent(studentId, awardIdObj) {
    const url = `api/awards/students/${studentId}`;
    return axiosClient.post(url, awardIdObj, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getAwardOfStudent(studentId) {
    const url = `api/awards/students/${studentId}`;
    return axiosClient.get(url);
  },
};

export default awardApi;
