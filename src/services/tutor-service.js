import http from "../http-common";
import axios from "axios";
class TutorDataService {
    view() {
        return http.get(`/tutor/view`);
    }

    getTutor(_id) {
        return http.get(`/tutor/find/${_id}`);
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