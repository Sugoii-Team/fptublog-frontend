import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://9863-2402-800-6315-91d5-f45b-50f5-2e57-70e7.ngrok.io/fptu-blog",
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
    return Promise.reject(error);
  }
);

export default axiosClient;
