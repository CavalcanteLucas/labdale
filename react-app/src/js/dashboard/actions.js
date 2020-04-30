import { fetchFromApi } from "react-redux-api-tools";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const getTodos = () => {
  const requestData = {
    headers: {
      authorization: `Token ${localStorage.token}`
    }
  };
  return {
    types: {
      request: GET_TODOS_REQUEST,
      success: GET_TODOS_SUCCESS,
      failure: GET_TODOS_FAILURE
    },
    apiCallFunction: () => fetchFromApi("api/todo-list/todos/", requestData)
  };
};

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
    apiCallFunction: () => fetchFromApi("api/rest-auth/user/", requestData)
  };
};
