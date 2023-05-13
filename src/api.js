import axiosInstance from "axios";

const axios = axiosInstance.create({
  withCredentials: true,
  baseURL: "http://localhost:3030/api/v1",
});

export default axios;
