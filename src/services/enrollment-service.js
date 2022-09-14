import http from "../http-common";

class EnrollmentDataService {
    create(username, data) {
        return http.post(`/enrollment/create/${username}`, data);
    }

    getAllSubjects(username) {
        return http.get(`/enrollment/create/${username}`);
    }

    getTutorialEnrollments(){
        return http.get(`http://localhost:8080/api/enrollment/tutorialEnrollments`);
    }

    // getAll(username){
    //     return http.get(`/enrollment/view/${username}`);
    // }

    viewEnrollmentByUsername(username){
        return http.get(`/enrollment/view/${username}`);
    }
}

export default new EnrollmentDataService();