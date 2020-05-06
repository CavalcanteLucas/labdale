import { fetchFromApi } from "react-redux-api-tools";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_SUCCESS_MESSAGE = "CLEAR_REGISTER_SUCCESS_MESSAGE";
export const CLEAR_REGISTER_FAILURE_MESSAGE = "CLEAR_REGISTER_FAILURE_MESSAGE";

export const register = (username, email, password1, password2) => {
  const requestData = {
    method: "POST",
    body: JSON.stringify({ username, email, password1, password2 })
  };
  return {
    types: {
      request: REGISTER_REQUEST,
      success: REGISTER_SUCCESS,
      failure: REGISTER_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi("/api/rest-auth/registration/", requestData)
  };
};

export const clearRegisterSuccessMessage = () => ({
  type: CLEAR_REGISTER_SUCCESS_MESSAGE
});

export const clearRegisterFailureMessage = () => ({
  type: CLEAR_REGISTER_FAILURE_MESSAGE
});
