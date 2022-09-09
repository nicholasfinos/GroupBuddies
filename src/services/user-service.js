import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getStaffBoard = () => {
  return axios.get(API_URL + "staff", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "manager", { headers: authHeader() });
};

const getOwnerBoard = () => {
  return axios.get(API_URL + "owner", { headers: authHeader() });
};

const updateStudent = async (data) => {
  return await axios.patch("http://localhost:8080/api/student/", data);
};

const getUser = (username) => {
  return axios.get("http://localhost:8080/api/user/" + username);
};

// eslint-disable-next-line
export default {
  getPublicContent,
  getUserBoard,
  getStaffBoard,
  getManagerBoard,
  getOwnerBoard,
  updateStudent,
  getUser
};