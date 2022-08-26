import http from "../http-common";

class TutorDataService {
    view() {
        return http.get(`/tutor/view`);
    }

    getTutors(username) {
        return http.get(`/tutor/create/${username}`);
    }
}

export default new TutorDataService();