import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};
