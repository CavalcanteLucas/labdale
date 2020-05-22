import { fetchFromApi } from "react-redux-api-tools";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const CLEAR_LOGIN_ERRORS = "CLEAR_LOGIN_ERRORS";

export const PASSWORD_RESET_CONFIRM_REQUEST = "PASSWORD_RESET_CONFIRM_REQUEST";
export const PASSWORD_RESET_CONFIRM_SUCCESS = "PASSWORD_RESET_CONFIRM_SUCCESS";
export const PASSWORD_RESET_CONFIRM_FAILURE = "PASSWORD_RESET_CONFIRM_FAILURE";
export const CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE =
  "CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE";
export const CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE =
  "CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILURE = "PASSWORD_RESET_FAILURE";
export const CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE =
  "CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE";
export const CLEAR_PASSWORD_RESET_FAILURE_MESSAGE =
  "CLEAR_PASSWORD_RESET_FAILURE_MESSAGE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_SUCCESS_MESSAGE = "CLEAR_REGISTER_SUCCESS_MESSAGE";
export const CLEAR_REGISTER_FAILURE_MESSAGE = "CLEAR_REGISTER_FAILURE_MESSAGE";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const login = (username, password) => {
  const requestData = {
    method: "POST",
    body: JSON.stringify({ username, password })
  };
  return {
    types: {
      request: LOGIN_REQUEST,
      success: LOGIN_SUCCESS,
      failure: LOGIN_FAILURE
    },
    apiCallFunction: () => fetchFromApi("/api/rest-auth/login/", requestData)
  };
};

export const logout = () => {
  const requestData = {
    method: "POST"
  };
  return {
    types: {
      request: LOGOUT_REQUEST,
      success: LOGOUT_SUCCESS,
      failure: LOGOUT_FAILURE
    },
    apiCallFunction: () => fetchFromApi("/api/rest-auth/logout/", requestData)
  };
};

export const clearLoginErrors = () => ({
  type: CLEAR_LOGIN_ERRORS
});

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

export const clearPasswordResetConfirmFailureMessage = () => ({
  type: CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE
});

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

export const getUserInfo = () => {
  const requestData = {
    headers: {
      authorization: `Token ${localStorage.token}`
    }
  };
  return {
    types: {
      request: GET_USER_INFO_REQUEST,
      success: GET_USER_INFO_SUCCESS,
      failure: GET_USER_INFO_FAILURE
    },
    shouldDispatch: state => !state.userInfo,
    apiCallFunction: () => fetchFromApi("api/rest-auth/user/", requestData)
  };
};
