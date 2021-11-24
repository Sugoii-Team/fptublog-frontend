import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://5aa5-2402-800-6314-f05d-1df1-f513-4880-e1c.ngrok.io/fptu-blog",
  baseURL: "https://34.124.170.202/fptu-blog",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
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
      const { config, status, data } = error.response;
      if (
        config.url === "api/auth/login" &&
        (status === 406 || status === 404)
      ) {
        throw new Error(data);
      } else if (config.url.includes("api/auth/login") && status === 401) {
        //Catch banned error and get data
        throw new Error(error + " " + error.response.data.id);
      }

      if (config.url.includes("api/awards/students") && status === 417) {
        /* const errorList = data.data || [];
        const firstError = errorList.length > 0 ? errorList[0] : {};
        const messageList = firstError.messages || [];
        const firstMessage = messageList.length > 0 ? messageList[0] : {};
        throw new Error(firstMessage.message); */
        throw new Error(data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
