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
  add(data) {
    const url = "api/blogs";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `api/blogs/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `api/blogs/${id}`;
    return axiosClient.delete(url);
  },
};

export default blogApi;
