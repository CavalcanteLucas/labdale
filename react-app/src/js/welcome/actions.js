export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
export const CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE";

export const CLEAR_SUCCESS_MESSAGE_TEMP = "CLEAR_SUCCESS_MESSAGE_TEMP";

export const setSuccessMessage = successMessage => ({
  type: SET_SUCCESS_MESSAGE,
  successMessage
});

export const clearSuccessMessage = () => ({
  type: CLEAR_SUCCESS_MESSAGE
});

export const clearSuccessMessage_temp = index => ({
  type: CLEAR_SUCCESS_MESSAGE_TEMP,
  index
});
