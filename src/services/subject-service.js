// import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api/subject";

// class SubjectDataService {
//     create(data, username) {
//         return http.post("/subject/create/" + username, data);
//     }
// }

// export default new SubjectDataService();

const viewSubject = () => {
    return axios.get(API_URL);
};

// const create = (data, username) => {
//     return axios.post(API_URL + "/subject/create/" + username, data);
// }

const create = (data, username) => {
    return axios.post(API_URL + "/create/" + username, data);
};

// eslint-disable-next-line
export default {
    create,
    viewSubject
};