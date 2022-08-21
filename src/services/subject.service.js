import http from "../http-common";

class SubjectDataService {
    create(data, username) {
        return http.post("/subject/create/" + username, data);
    }
}

export default new SubjectDataService();