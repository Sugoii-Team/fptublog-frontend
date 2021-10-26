import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";
const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const tagsApi = {
  addTagsToBlog(blogId, tags) {
    const url = `api/tags/blogs/${blogId}`;
    return axiosClient.post(url, tags, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },
};

export default tagsApi;
