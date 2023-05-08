import axios from "axios";
const BASE_URL = "https://hungry-cyan-turtleneck.cyclic.app/";
// const BASE_URL = "http://localhost:8800/";

export const HttpClient = axios.create({
  timeout: 325000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: BASE_URL,
});
