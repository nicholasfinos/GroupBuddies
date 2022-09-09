import axios from "axios";

class TutorialDataService {
  getTutorial = () => {
    return axios.get("http://localhost:8080/api/viewTutorial/:id")
  }

  getGroups = () => {
    return axios.get("http://localhost:4000/groups/");
  };

  getStudents = () => {
    return axios.get("http://localhost:4000/studentList/");
  }
}

export default new TutorialDataService();