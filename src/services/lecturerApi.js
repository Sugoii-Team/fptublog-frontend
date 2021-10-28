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


  banStudent(lectureId, studentId) {
    const url = `api/lecturers/${lectureId}/banningstudent/${studentId}`;
    return axiosClient.put(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getLecturerById (id) {
    const url = `api/lecturers/${id}`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }, 
    });
  },

  getFieldOfLecturer (id) {
    const url = `api/lecturers/${id}/fields`;
    return axiosClient.get(url, {
      herders: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getListOfField (){
    const url = 'api/fields';
    return axiosClient.get(url, {
      herders: {
        "Content-Type": "application/json",
        Authorization: accessToken,
    }
  });
  },

  updateLecturerProfile(id, data){
    const url = `api/accounts/${id}`;
    return axiosClient.put(url, data, {
      headers : {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
  },

  updateLecturerField (id,data){
    const url = `api/lecturers/${id}/fields`;
    return axiosClient.put(url, data, {
      headers : {
        "Content-Type": "application/json",
        Authorization: accessToken,
      }
    })
  },
};

export default lecturerApi;
