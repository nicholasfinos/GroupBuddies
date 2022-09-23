import http from "../http-common";

class EnrollmentDataService {
    create(username, data) {
        return http.post(`/enrollment/create/${username}`, data);
    }

    getAllSubjects(username) {
        return http.get(`/enrollment/create/${username}`);
    }

    // getAll(username){
    //     return http.get(`/enrollment/view/${username}`);
    // }

    viewEnrollmentByUsername(username){
        return http.get(`/enrollment/view/${username}`);
    }

    findTutorial(subjectName) {
        return http.get(`/enrollment/findTutorial/${subjectName}`)
    }

    view(username) {
        return http.get(`/enrollment/request/${username}`);
    }
    
    viewEnrollmentBySubjectName(subjectName){
        return http.get(`/enrollment/viewEnrollment/${subjectName}`);
    }

    updateEnrollment(data){
        return http.put("/enrollment/updateEnrollment/", data);
    }
}

export default new EnrollmentDataService();