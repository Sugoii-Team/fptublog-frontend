import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params) {
    const url = "api/blogs";
    const promise = axiosClient.get(url, {
      params,
    });

    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  },

  get(id) {
    const url = `api/blogs/${id}`;
    return axiosClient.get(url);
  },

  post(data) {
    const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);
    const url = "api/blogs";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
  update(data) {
    const url = `api/blogs/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `api/blogs/${id}`;
    return axiosClient.delete(url);
  },

  getAuthorById(id) {
    const url = `/api/accounts/${id}`;
    return axiosClient.get(url);
  },
};

export default blogApi;
