import http from "../http-common";

class StudentProfileDataServcie {
    getStudent(data) {
        return http.get(`/studentProfile/getStduent`, data);
    }
}

export default new StudentProfileDataServcie();