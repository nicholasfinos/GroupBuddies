import http from "../http-common";

class SubjectDataService {
    view(username) {
        return http.get(`/subject/view/${username}`);
    }

    create(data, username) {
        return http.post(`/subject/create/${username}`, data);
    }

    findSubjectByName(subjectName) {
        return http.get(`/subject/findOne/${subjectName}`)
    }

    // findSubjectByUserName(subjectName) {
    //     return http.get(`/subject/${subjectName}`)
    // }


    findSubjectById(username, subjectId) {
        return http.get(`/subject/${username}/${subjectId}`)
    }

    findTutorial(subjectName) {
        return http.get(`/subject/findTutorial/${subjectName}`)
    }

    findTutorialByTutor(_id) {
        return http.get(`/subject/findTutorialByTutor/${_id}`)
    }

    updateSubject(username, subjectId) {
        return http.put(`/subject/${username}/${subjectId}`)
    }
}

export default new SubjectDataService();