import { fetchFromApi } from "react-redux-api-tools";

export const PASSWORD_RESET_CONFIRM_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_CONFIRM_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_CONFIRM_FAILURE = "PASSWORD_RESET_FAILURE";
export const CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE =
  "CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE";

export const passwordResetConfirm = (uid, token, password1, password2) => {
  const requestData = {
    method: "POST",
    body: JSON.stringify({
      uid,
      token,
      new_password1: password1,
      new_password2: password2
    })
  };
  return {
    types: {
      request: PASSWORD_RESET_CONFIRM_REQUEST,
      success: PASSWORD_RESET_CONFIRM_SUCCESS,
      failure: PASSWORD_RESET_CONFIRM_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi("/api/rest-auth/password/reset/confirm/", requestData)
  };
};

export const clearPasswordResetConfirmSuccessMessage = () => ({
  type: CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE
});
