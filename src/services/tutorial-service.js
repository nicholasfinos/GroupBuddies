import axios from "axios";
import http from "../http-common";

class TutorialDataService {
  // getTutorial = () => {
  //   return axios.get("http://localhost:8080/api/viewTutorial/:id")
  // }

  getTutorial(id) {
    return http.get(`/tutorial/getTutorial/${id}`)
  }

  // getGroups = () => {
  //   return axios.get("http://localhost:4000/groups/");
  // };

  // getStudents = () => {
  //   return axios.get("http://localhost:4000/studentList/");
  // }
}

export default new TutorialDataService();