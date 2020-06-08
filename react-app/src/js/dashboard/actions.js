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
export const EDIT_TODO_LIST_TITLE_REQUEST = "EDIT_TODO_LIST_TITLE_REQUEST";
export const EDIT_TODO_LIST_TITLE_SUCCESS = "EDIT_TODO_LIST_TITLE_SUCCESS";
export const EDIT_TODO_LIST_TITLE_FAILURE = "EDIT_TODO_LIST_TITLE_FAILURE";
export const CLEAR_CREATE_TODO_LIST_ERRORS = "CLEAR_CREATE_TODO_LIST_ERRORS";
export const CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE =
  "CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE";
export const CLEAR_EDIT_TODO_LIST_TITLE_SUCCESS_MESSAGE =
  "CLEAR_EDIT_TODO_LIST_TITLE_SUCCESS_MESSAGE";
export const CLEAR_EDIT_TODO_LIST_TITLE_ERRORS =
  "CLEAR_EDIT_TODO_LIST_TITLE_ERRORS";

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

export const editTodoListTitle = (todoListId, newTitle) => {
  const requestData = {
    method: "PUT",
    headers: {
      authorization: `Token ${localStorage.token}`
    },
    body: JSON.stringify({
      title: newTitle
    })
  };
  return {
    types: {
      request: EDIT_TODO_LIST_TITLE_REQUEST,
      success: EDIT_TODO_LIST_TITLE_SUCCESS,
      failure: EDIT_TODO_LIST_TITLE_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi(`api/todo-list/${todoListId}/`, requestData)
  };
};

export const clearCreateTodoListErrors = () => ({
  type: CLEAR_CREATE_TODO_LIST_ERRORS
});

export const clearCreateTodoListSuccessMessage = () => ({
  type: CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE
});

export const clearEditTodoListTitleSuccessMessage = () => ({
  type: CLEAR_EDIT_TODO_LIST_TITLE_SUCCESS_MESSAGE
});

export const clearEditTodoListTitleErrors = () => ({
  type: CLEAR_EDIT_TODO_LIST_TITLE_ERRORS
});
