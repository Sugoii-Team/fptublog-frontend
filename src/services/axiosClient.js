import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://a541-42-119-159-27.ngrok.io/fptu-blog",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
  },
});

//Interceptor - Copy tren github cua axios
//Sau khi copy nen doi ten axios -> axiosClient

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //De lay data thi thay doi respone chi nhan data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Error Response: ", error.response);
    if (error.response !== undefined) {
      const { config, status, data } = error?.response;
      if (config?.url === "api/auth/login" && status === 406) {
        throw new Error(data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
