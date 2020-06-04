import { fetchFromApi } from "react-redux-api-tools";

export const GET_TODO_LISTS_REQUEST = "GET_TODO_LISTS_REQUEST";
export const GET_TODO_LISTS_SUCCESS = "GET_TODO_LISTS_SUCCESS";
export const GET_TODO_LISTS_FAILURE = "GET_TODO_LISTS_FAILURE";
export const GET_TODO_LIST_REQUEST = "GET_TODO_LIST_REQUEST";
export const GET_TODO_LIST_SUCCESS = "GET_TODO_LIST_SUCCESS";
export const GET_TODO_LIST_FAILURE = "GET_TODO_LIST_FAILURE";
export const CREATE_TODO_LIST_REQUEST = "CREATE_TODO_LIST_REQUEST";
export const CREATE_TODO_LIST_SUCCESS = "CREATE_TODO_LIST_SUCCESS";
export const CREATE_TODO_LIST_FAILURE = "CREATE_TODO_LIST_FAILURE";
export const CLEAR_CREATE_TODO_LIST_ERRORS = "CLEAR_CREATE_TODO_LIST_ERRORS";
export const CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE =
  "CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE";

export const getTodoLists = () => {
  const requestData = {
    headers: {
      authorization: `Token ${localStorage.token}`
    }
  };
  return {
    types: {
      request: GET_TODO_LISTS_REQUEST,
      success: GET_TODO_LISTS_SUCCESS,
      failure: GET_TODO_LISTS_FAILURE
    },
    apiCallFunction: () => fetchFromApi("api/todo-list/", requestData)
  };
};

export const getTodoList = todoListId => {
  const requestData = {
    headers: {
      authorization: `Token ${localStorage.token}`
    }
  };
  return {
    types: {
      request: GET_TODO_LIST_REQUEST,
      success: GET_TODO_LIST_SUCCESS,
      failure: GET_TODO_LIST_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi(`api/todo-list/${todoListId}/`, requestData)
  };
};

export const createTodoList = todoListTitle => {
  const requestData = {
    method: "POST",
    headers: {
      authorization: `Token ${localStorage.token}`
    },
    body: JSON.stringify({
      title: todoListTitle
    })
  };
  return {
    types: {
      request: CREATE_TODO_LIST_REQUEST,
      success: CREATE_TODO_LIST_SUCCESS,
      failure: CREATE_TODO_LIST_FAILURE
    },
    apiCallFunction: () => fetchFromApi("api/todo-list/", requestData)
  };
};

export const clearCreateTodoListErrors = () => ({
  type: CLEAR_CREATE_TODO_LIST_ERRORS
});

export const clearCreateTodoListSuccessMessage = () => ({
  type: CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE
});
