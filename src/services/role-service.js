import axios from "axios";

const getRoleId = (name) => {
  return axios.get("http://localhost:8080/api/role/" + name);
};

// eslint-disable-next-line
export default {
    getRoleId
};