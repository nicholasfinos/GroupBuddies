import http from "../http-common";
// // import axios from "axios";

// const API_URL = "http://localhost:8080/api/subject";

// // const viewSubject = () => {
// //     return axios.get(API_URL);
// // };

// // const create = (username, subjectName, tutorialNumbers, groupAssessment, semester, subjectTopics) => {
// //     return axios.post("http://localhost:8080/api/subject/create/" + username, {subjectName, tutorialNumbers, groupAssessment, semester, subjectTopics})
// //     .then((response) => {
// //         console.log(response);
// //       }, (error) => {
// //         console.log(error);
// //       });
// // };

// // const create = (username, data) => {
// //     return axios.post("http://localhost:8080/api/subject/create/" + username, {data})
// //     .then((response) => {
// //         console.log(response);
// //     }, (error) => {
// //         console.log(error);
// //     });
// // };

// // eslint-disable-next-line
// export default {
//     create,
//     viewSubject
// };

class SubjectDataService {

    create(data, username) {
        return http.post(`/subject/create/${username}`, data);
    }
}

export default new SubjectDataService();