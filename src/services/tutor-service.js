import http from "../http-common";
import axios from "axios";
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
        return http.get(`/tutor/getUnListedStudent/${_id}`);
    }

    getlistGroups(_id) {
        return http.get(`/tutor/getlistGroups/${_id}`);
    }

    addGroup(data) {
        return http.post(`/tutor/addGroup`, data)
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

    // getCurrentTutorial
    getGroups = () => {
        return axios.get("http://localhost:4000/groups/");
    };

    getStudents = () => {
        return axios.get("http://localhost:4000/studentList/");
    }

}

export default new TutorDataService();