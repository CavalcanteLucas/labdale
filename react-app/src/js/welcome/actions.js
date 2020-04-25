export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
export const CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE";

export const setSuccessMessage = successMessage => ({
  type: SET_SUCCESS_MESSAGE,
  successMessage
});

export const clearSuccessMessage = () => ({
  type: CLEAR_SUCCESS_MESSAGE
});
