import axios from "axios";

const getPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/view/" + username);
};

const createPeerRequests = (username, data) => {
    return axios.post("http://localhost:8080/api/request/create/" + username, data);
};

const getSubjects = (username) => {
    return axios.get("http://localhost:8080/api/request/create/" + username)
}

const getPeerRequest = (username, requestId) => {
    return axios.get("http://localhost:8080/api/request/edit/" + username + "/" + requestId)
}

const updatePeerRequest = (username, requestId, data) => {
    return axios.put("http://localhost:8080/api/request/edit/" + username + "/" + requestId, data)
}

// eslint-disable-next-line
export default {
    getPeerRequests,
    createPeerRequests,
    getPeerRequest,
    getSubjects,
    updatePeerRequest,
};