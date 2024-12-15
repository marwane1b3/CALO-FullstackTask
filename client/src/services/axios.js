import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/v1",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const endpoints = {
  getJobs: "/jobs",
  getJobById: (id) => `/jobs/${id}`,
  deleteJobById: (id) => `/jobs/${id}`,
  searchJobs: (query) => `/jobs/find/search?q=${encodeURIComponent(query)}`,
};
