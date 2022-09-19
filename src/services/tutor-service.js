import http from "../http-common";
import axios from "axios";
import StudentProfileDataServcie from "../services/studentProfile-service";

class TutorDataService {
    view() {
        return http.get(`/tutor/view`);
    }

    getTutorials(_id) {
        return http.get(`/tutor/findTutorials/${_id}`);
    }

    getTutorial(_id) {
        return http.get(`/tutor/findTutorial/${_id}`);
    }

    getTutor(_id) {
        return http.get(`/tutor/find/${_id}`);
    }

    getUnListedStudent(_id) {
        http.get(`/tutor/getUnListedStudent/${_id}`)
        .then((data)=>{
            let list = [];
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                StudentProfileDataServcie.getProfile(data[i])
                    .then(y => {
                    console.log(y);
                    list.push(y);
                    })
                    .catch(e => {
                    console.log(e);
                    });
            }

            return list;
        }).catch(error => {
            console.error(error);
        });
    }

    getlistGroups(_id) {
        return http.get(`/tutor/getlistGroups/${_id}`);
    }

    getGroup(_id) {
        return http.get(`/tutor/getGroup/${_id}`);
    }

    addGroup(data) {
        return http.put(`/tutor/addGroup`, data)
    }

    autoSort(id, data) {
        return http.post(`/tutor/autoSort/${id}`, data)
    }

    removeGroup(data) {
        return http.post(`/tutor/removeGroup`, data)
    }

    addStudentGroup(data) {
        return http.post(`/tutor/addStudentGroup`, data)
    }

    removeStudentGroup(data) {
        return http.post(`/tutor/removeStudentGroup`, data)
    }

}

export default new TutorDataService();