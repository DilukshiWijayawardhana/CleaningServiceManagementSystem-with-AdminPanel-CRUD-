import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// export const register = async (data) => {
//   return axios.post(`${API_URL}/register`, data);
// };

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  // Make sure your backend returns token for admin registration
  if (data.role === "ADMIN" && response.data.token) {
    return response;
  }
  return response;
};
