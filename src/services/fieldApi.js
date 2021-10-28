//import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";
//const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const fieldApi = {
  getAllField(blogId) {
    const url = `api/fields`;
    return axiosClient.get(url);
  },
};

export default fieldApi;
