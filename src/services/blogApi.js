import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params) {
    const url = "/blogs";
    return axiosClient.get(url, {
      params,
    });
  },
  get(id) {
    const url = `/blogs/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/blogs";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/blogs/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/blogs/${id}`;
    return axiosClient.delete(url);
  },
};

export default blogApi;
