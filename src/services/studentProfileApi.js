import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
const studentProfileApi = {

  getMajorList() {
    const url = 'api/majors';
    return axiosClient.get(url, {
      headers:{
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getStudentById (id) {
    const url = `api/students/${id}`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }, 
    });
  },

  getStudentMajorByMajorId(majorId) {
    const url = `api/majors/${majorId}`;
    return axiosClient.get(url, {
      headers:{
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  updateStudentProfile(id, data){
    const url = `api/students/${id}`;
    return axiosClient.put(url, data, {
      headers : {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
  }
};

export default studentProfileApi;
