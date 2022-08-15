import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// POST {username, email, password}
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// POST {username, password} & save JWT to Local Storage
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// remove JWT from Local Storage
const logout = () => {
  localStorage.removeItem("user");
};
// eslint-disable-next-line
export default {
  register,
  login,
  logout,
};