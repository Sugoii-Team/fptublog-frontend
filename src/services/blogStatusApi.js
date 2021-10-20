import axiosClient from "./axiosClient";

const BlogStatusApi = {
  getStatus(params) {
    const url = `api/blogs/status`;
    const promise = axiosClient.get(url, {
      params,
    });
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  },
  getStatusById(statusId) {
    const url = `api/blogs/status/${statusId}`;
    return axiosClient.get(url);
  },
};

export default BlogStatusApi;
