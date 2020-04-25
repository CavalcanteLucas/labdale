import { fetchFromApi } from "react-redux-api-tools";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILURE = "PASSWORD_RESET_FAILURE";
export const CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE =
  "CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE";
export const CLEAR_PASSWORD_RESET_FAILURE_MESSAGE =
  "CLEAR_PASSWORD_RESET_FAILURE_MESSAGE";

export const passwordReset = email => {
  const requestData = {
    method: "POST",
    body: JSON.stringify({ email })
  };
  return {
    types: {
      request: PASSWORD_RESET_REQUEST,
      success: PASSWORD_RESET_SUCCESS,
      failure: PASSWORD_RESET_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi("/api/rest-auth/password/reset/", requestData)
  };
};

export const clearPasswordResetSuccessMessage = () => ({
  type: CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE
});

export const clearPasswordResetFailureMessage = () => ({
  type: CLEAR_PASSWORD_RESET_FAILURE_MESSAGE
});
