import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params) {
    const url = "/api/blogs";
    // const url = "/blogs";
    const promise = axiosClient.get(url, {
      params,
    });
    const dataPromise = promise.then((response)=>response.data);
    console.log("test ne", typeof dataPromise);
    return dataPromise; 
  },
  get(id) {
    const url = `/api/blogs/${id}`;
    // const url = `blog${id}`;
    const promise = axiosClient.get(url);
    const dataPromise = promise.then((response)=> response.data);
    console.log("Data sau khi  promise:", dataPromise); 
    return dataPromise;
  },
  add(data) {
    const url = "/api/blogs";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/blogs/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/api/blogs/${id}`;
    return axiosClient.delete(url);
  },


  getAuthorById(id){
    const url = `/api/accounts/${id}`;
    // const url = `author-${id}`;
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response)=> response.data);
    console.log("Data sau khi promise cua author:", dataAfterPromise); 
    return dataAfterPromise;
  },

  getTagOfBlogById(id){
    const url = `api/blogs/${id}/tags`;
    // const url = `tag-${id}`
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response)=> response.data);
    console.log("Data sau khi promise cua tag:", dataAfterPromise); 
    return dataAfterPromise;
  },

  getCommentOfBlogById(id){
    const url = `api/blogs/${id}/comments`
    // const url = `comment-${id}`;
    const promise = axiosClient.get(url);
    const dataAfterPromise = promise.then((response)=> response.data);
    console.log("Data sau khi promise cua comment: ", typeof dataAfterPromise);
    return dataAfterPromise;
  }
};

export default blogApi;
