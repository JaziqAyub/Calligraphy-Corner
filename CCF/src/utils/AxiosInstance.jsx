import axios from "axios";
const baseURL = "http://localhost:4011";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, //withcookies
});

export default api;
