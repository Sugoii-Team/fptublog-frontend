import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "api/auth/registration";
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = "api/auth/login";
    const promise = axiosClient.post(url, data);
    var dataPromise = promise.then((respone) => respone);
    return dataPromise;
  },

  viewProfile(params, token) {
    const url = "api/test";
    const headers = { Authorization: token };
    return axiosClient.get(url, {
      params,
      headers,
    });
  },
};

export default userApi;
