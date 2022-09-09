import axios from "axios";

const getPeerRequests = (username) => {
    return axios.get("http://localhost:8080/api/request/view/" + username);
};

const createPeerRequests = (username, data) => {
    return axios.post("http://localhost:8080/api/request/create/" + username, data);
};

// const getPeers = (username, subjectName) => {
//     return axios.get("http://localhost:8080/api/request/create/" + username, subjectName)
// }

const getSubjects = (username) => {
    return axios.get("http://localhost:8080/api/request/create/" + username)
}

// const getPeerUsername = (username, peerId) => {
//     return axios.get("http://localhost:8080/api/request/create/" + username, peerId)
// }

// eslint-disable-next-line
export default {
    getPeerRequests,
    createPeerRequests,
    // getPeers,
    getSubjects,
    // getPeerUsername,
};