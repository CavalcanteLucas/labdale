import { fetchFromApi } from "react-redux-api-tools";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_SUCCESS_MESSAGE = "CLEAR_REGISTER_SUCCESS_MESSAGE";

export const register = (username, password) => {
  const requestData = {
    method: "POST",
    body: JSON.stringify({ username, password })
  };

  return {
    types: {
      request: REGISTER_REQUEST,
      success: REGISTER_SUCCESS,
      failure: REGISTER_FAILURE
    },
    apiCallFunction: () => fetchFromApi("/api/todo-auth/register/", requestData)
  };
};

export const clearRegisterSuccessMessage = () => ({
  type: CLEAR_REGISTER_SUCCESS_MESSAGE
});
