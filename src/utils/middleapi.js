import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
// Create a custom axios instance with interceptors
const middleapi = axios.create({
  baseURL: API_URL, // base URL for your API
});

middleapi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"; // Redirect to login on 401 error
    }
    return Promise.reject(error); // Propagate the error if it's not 401
  }
);

export default middleapi;
