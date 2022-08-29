import http from "../http-common";

class TutorDataService {
    view() {
        return http.get(`/tutor/view`);
    }

    getTutor(_id) {
        return http.get(`/tutor/find/${_id}`);
    }
}

export default new TutorDataService();