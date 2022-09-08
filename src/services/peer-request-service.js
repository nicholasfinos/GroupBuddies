import axios from "axios";

const getPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/view/" + username);
};

const createPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/create/" + username);
};

const getPeers = (username, subjectName) => {
    return axios.get("http://localhost:8080/api/request/create/" + username, subjectName)
}

// eslint-disable-next-line
export default {
    getPeerRequests,
    createPeerRequests,
    getPeers,
};