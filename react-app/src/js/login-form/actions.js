import { fetchFromApi } from "react-redux-api-tools";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_LOGIN_SUCCESS_MESSAGE = "CLEAR_LOGIN_SUCCESS_MESSAGE";

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

export const clearLoginSuccessMessage = () => ({
  type: CLEAR_LOGIN_SUCCESS_MESSAGE
});
