import axios from "axios";

const API = axios.create({ baseURL: "https://gdsc-job-app.herokuapp.com/api" });

// Add a request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  console.error("Error : " + error);
  return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, (error) => {
  console.error("Error : " + error);
  return Promise.reject(error);
});

// Statrt the jobs api
export const getAllJobs = (page) => API.get(`/jobs?page=${page}`);

// End the jobs api