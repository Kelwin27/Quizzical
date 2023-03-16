import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const $axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { 'Content-Type': 'application/json' }
  // withCredentials: true,
});



