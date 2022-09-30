import http from "../http-common";

class SubjectDataService {
    view(username) {
        return http.get(`/subject/view/${username}`);
    }

    viewAllSubjects(username) {
        return http.get(`/subject/viewAll/${username}`);
    }

    create(data, username) {
        return http.post(`/subject/create/${username}`, data);
    }

    findSubjectByName(subjectName) {
        return http.get(`/subject/findOne/${subjectName}`)
    }

    findTutorial(subjectName) {
        return http.get(`/subject/findTutorial/${subjectName}`)
    }


    // findSubjectByUserName(subjectName) {
    //     return http.get(`/subject/${subjectName}`)
    // }


    findSubjectById(username, subjectId) {
        return http.get(`/subject/${username}/${subjectId}`)
    }

    findTutorialByTutor(_id) {
        return http.get(`/subject/findTutorialByTutor/${_id}`)
    }

    // getPeerUsername(username) {
    //     return http.get(`/request/create/${username}`)
    // }

    getPeers(username, subjectName) {
        return http.get(`/request/create/${username}`, subjectName)
    }
    
    updateSubject(data) {
        return http.put(`/subject/updateSubject/`, data)
    }
}

export default new SubjectDataService();