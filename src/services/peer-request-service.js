import axios from "axios";

const getPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/view/" + username);
};

const createPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/create/" + username);
};

// eslint-disable-next-line
export default {
    getPeerRequests,
    createPeerRequests,
};