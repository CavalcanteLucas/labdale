import { fetchFromApi } from "react-redux-api-tools";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

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
    apiCallFunction: () => fetchFromApi("api/todos/", requestData)
  };
};
