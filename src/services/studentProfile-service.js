import http from "../http-common";

class StudentProfileDataServcie {
    getStudent(data) {
        return http.get(`/studentProfile/getStduent`, data);
    }

    getProfile(id) {
        return http.get(`/studentProfile/getProfile/${id}`);
    }
}

export default new StudentProfileDataServcie();