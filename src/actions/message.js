import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";
// set/clear message actions
// Redux action creator is for actions related to messages (notifications) from APIs
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});