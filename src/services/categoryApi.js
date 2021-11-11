import StorageKey from "../constant/storage-keys";
import axiosClient from "./axiosClient";
const accessToken = "Bearer " + localStorage.getItem(StorageKey.TOKEN);

const categoryApi = {
  getCategories(params) {
    const url = "api/categories";
    return axiosClient.get(url, {
      params,
    });
  },
  getCategoryById(id) {
    const url = `api/categories/${id}`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  getCategoryByFieldId(fieldId) {
    const url = `api/fields/${fieldId}/categories`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/categories";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
