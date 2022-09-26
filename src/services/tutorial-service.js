import axios from "axios";
import http from "../http-common";

class TutorialDataService {
  // getTutorial = () => {
  //   return axios.get("http://localhost:8080/api/viewTutorial/:id")
  // }

  getTutorial(id) {
    return http.get(`/tutorial/getTutorial/${id}`)
  }
}

export default new TutorialDataService();