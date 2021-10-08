import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

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
    const url = `/api/blogs/${id}`;
    // const url = `blog${id}`;
    const promise = axiosClient.get(url);
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  },
  add(data) {
    const url = "/api/blogs";
    return axiosClient.post(url, data);
  },
  updateBlog(blogId, data) {
    const url = `api/blogs/${blogId}/review`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
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

  removeBlog(id) {
    const url = `/api/blogs/${id}`;
    return axiosClient.delete(url);
  },

  getAuthorById(id) {
    const url = `/api/accounts/${id}`;
    return axiosClient.get(url);
  },

  getTagOfBlogById(id) {
    const url = `api/blogs/${id}/tags`;
    // const url = `tag-${id}`
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response) => response.data);
    return dataAfterPromise;
  },

  getCommentOfBlogById(id) {
    const url = `api/blogs/${id}/comments`;
    // const url = `comment-${id}`;
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response) => response.data);
    console.log("Data sau khi promise cua comment: ", typeof dataAfterPromise);
    return dataAfterPromise;
  },
};

export default blogApi;
