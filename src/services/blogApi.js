import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";

const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const blogApi = {
  getAll(params) {
    const { currentPage, limitBlog } = params;
    const url = `api/blogs?limit=${limitBlog}&page=${currentPage}`;
    return axiosClient.get(url);
  },

  getTopRatedBlog(params) {
    const url = "api/blogs/top_rate?limit=5&page=1";
    return axiosClient.get(url, {
      params,
    });
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

  updateBlog(blogId, data) {
    const url = `api/blogs/${blogId}`;
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

  removeBlog(studentId, blogId) {
    const url = `api/blogs/${blogId}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getAuthorById(id) {
    const url = `/api/accounts/${id}`;
    return axiosClient.get(url);
  },

  getTagOfBlogById(id) {
    const url = `api/tags/blogs/${id}`;
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
    return dataAfterPromise;
  },
};

export default blogApi;
