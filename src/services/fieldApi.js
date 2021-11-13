import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const fieldApi = {
  getAllFields() {
    const url = "api/fields";
    return axiosClient.get(url);
  },

  getTopFieldToSuggest() {
    const url = "api/fields/top";
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/api/blogs/${id}`;
    const promise = axiosClient.get(url);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  },
  add(data) {
    const url = "/api/blogs";
    return axiosClient.post(url, data);
  },

  post(data) {
    const url = "api/blogs";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getBlogsByFieldId(fieldId) {
    const url = `api/fields/${fieldId}/blogs?limit=3&page=1`;
    return axiosClient.get(url);
  },

  getLecturersOfField(fieldId) {
    const url = `api/fields/${fieldId}/lecturers`;
    return axiosClient.get(url, {
      herders: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default fieldApi;
