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

  getBlogBySearchValue(params) {
    const { currentPage, limitBlog, searchValue } = params;
    const url = `api/blogs?limit=${limitBlog}&page=${currentPage}&title=${searchValue}`;
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/api/blogs/${id}`;
    return axiosClient.get(url);
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
    return axiosClient.get(url);
  },

  getCommentOfBlogById(id) {
    const url = `api/blogs/${id}/comments`;
    // const url = `comment-${id}`;
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response) => response.data);
    return dataAfterPromise;
  },

  getCategoriesToSuggest() {
    const url = "api/categories";
    return axiosClient.get(url);
  },

  getBlogsByFieldId(fieldId) {
    const url = `api/fields/${fieldId}/blogs?limit=3&page=1`;
    return axiosClient.get(url);
  },

  undoDeleteBlog(blogId) {
    const url = `api/blogs/${blogId}/undo_delete`;
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
  },
};

export default blogApi;
