import axios from "axios";
import config from "../config.json";
axios.defaults.baseURL = config.apiUrl;
axios.interceptors.response.use(null, (err) => {
  if (err.code === "ERR_NETWORK") {
    alert("network error");
  } else if (err.response?.status >= 403) {
    alert("an unexpected error");
  }
  return Promise.reject(err);
});

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setCommonHeader,
};
export default httpService;
