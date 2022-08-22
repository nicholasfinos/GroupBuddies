// import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api/subject";

const viewSubject = () => {
    return axios.get(API_URL);
};

const create = (data, username) => {
    return axios.post(API_URL + "/create/" + username, data);
};

// eslint-disable-next-line
export default {
    create,
    viewSubject
};