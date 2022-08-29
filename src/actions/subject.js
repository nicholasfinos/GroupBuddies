import {
    SUBJECT_SUCCESS,
    SUBJECT_FAIL,
    SET_MESSAGE
} from "./types";
import AuthService from "../services/auth-service";

export const CreateNewSubject = (username, subjectName, tutorialNumber, groupAssessment, semester, subjectTopic) => (dispatch) => {
    return AuthService.CreateNewSubject(username, subjectName, tutorialNumber, groupAssessment, semester, subjectTopic).then(
        (response) => {
            dispatch({
                type: SUBJECT_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SUBJECT_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};