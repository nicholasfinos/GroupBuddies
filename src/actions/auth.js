// register/login/logout actions
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  // import AuthService to make asynchronous HTTP requests with trigger one or more dispatch in the result
  import AuthService from "../services/auth-service";
  
  // calls the AuthService.login(username, password)
  export const signup = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        // dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
        dispatch({
          type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });
        // dispatch REGISTER_FAIL and SET_MESSAGE if failed
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  // calls the AuthService.login(username, password)
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        // dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
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
          type: LOGIN_FAIL,
        });
        // dispatch LOGIN_FAIL and SET_MESSAGE if failed
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };