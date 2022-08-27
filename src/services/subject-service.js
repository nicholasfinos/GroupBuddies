import http from "../http-common";

class SubjectDataService {
    view(username) {
        return http.get(`/subject/view/${username}`);
    }

    create(data, username) {
        return http.post(`/subject/create/${username}`, data);
    }

    findOne(subjectName) {
        return http.get(`/subject/findOne/${subjectName}`)
    }
}

export default new SubjectDataService();