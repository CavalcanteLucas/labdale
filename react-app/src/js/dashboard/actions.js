import moment from "moment";
import { fetchFromApi } from "react-redux-api-tools";

// ----
// DISPATCHES
// ----

// TODOLIST
//
// LIST
export const GET_TODO_LISTS_REQUEST = "GET_TODO_LISTS_REQUEST";
export const GET_TODO_LISTS_SUCCESS = "GET_TODO_LISTS_SUCCESS";
export const GET_TODO_LISTS_FAILURE = "GET_TODO_LISTS_FAILURE";
// CREATE
export const CREATE_TODO_LIST_REQUEST = "CREATE_TODO_LIST_REQUEST";
export const CREATE_TODO_LIST_SUCCESS = "CREATE_TODO_LIST_SUCCESS";
export const CREATE_TODO_LIST_FAILURE = "CREATE_TODO_LIST_FAILURE";
export const CLEAR_CREATE_TODO_LIST_ERRORS = "CLEAR_CREATE_TODO_LIST_ERRORS";
// RETRIEVE
export const GET_TODO_LIST_REQUEST = "GET_TODO_LIST_REQUEST";
export const GET_TODO_LIST_SUCCESS = "GET_TODO_LIST_SUCCESS";
export const GET_TODO_LIST_FAILURE = "GET_TODO_LIST_FAILURE";
// UPDATE
export const EDIT_TODO_LIST_REQUEST = "EDIT_TODO_LIST_REQUEST";
export const EDIT_TODO_LIST_SUCCESS = "EDIT_TODO_LIST_SUCCESS";
export const EDIT_TODO_LIST_FAILURE = "EDIT_TODO_LIST_FAILURE";
export const CLEAR_EDIT_TODO_LIST_ERRORS = "CLEAR_EDIT_TODO_LIST_ERRORS";
// DESTROY
export const DELETE_TODO_LIST_REQUEST = "DELETE_TODO_LIST_REQUEST";
export const DELETE_TODO_LIST_SUCCESS = "DELETE_TODO_LIST_SUCCESS";
export const DELETE_TODO_LIST_FAILURE = "DELETE_TODO_LIST_FAILURE";

// TODO
//
// LIST
export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";
// CREATE
export const CREATE_TODO_REQUEST = "CREATE_TODO_REQUEST";
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS";
export const CREATE_TODO_FAILURE = "CREATE_TODO_FAILURE";
export const CLEAR_CREATE_TODO_ERRORS = "CLEAR_CREATE_TODO_ERRORS";

// ----
// ACTIONS
// ----

// TODOLIST
//
// LIST
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
    apiCallFunction: () => fetchFromApi("/api/todo-lists/", requestData)
  };
};

// CREATE
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
    apiCallFunction: () => fetchFromApi("/api/todo-lists/", requestData)
  };
};

export const clearCreateTodoListErrors = () => ({
  type: CLEAR_CREATE_TODO_LIST_ERRORS
});

// RETRIEVE
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
      fetchFromApi(`/api/todo-lists/${todoListId}/`, requestData)
  };
};

// UDPDATE
export const editTodoList = (todoListId, newTitle) => {
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
      request: EDIT_TODO_LIST_REQUEST,
      success: EDIT_TODO_LIST_SUCCESS,
      failure: EDIT_TODO_LIST_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi(`/api/todo-lists/${todoListId}/`, requestData)
  };
};

export const clearEditTodoListErrors = () => ({
  type: CLEAR_EDIT_TODO_LIST_ERRORS
});

// DESTROY
export const deleteTodoList = todoListId => {
  const requestData = {
    method: "DELETE",
    headers: {
      authorization: `Token ${localStorage.token}`
    }
  };
  return {
    types: {
      request: DELETE_TODO_LIST_REQUEST,
      success: DELETE_TODO_LIST_SUCCESS,
      failure: DELETE_TODO_LIST_FAILURE
    },
    extraData: {
      todoListId
    },
    apiCallFunction: () =>
      fetchFromApi(`/api/todo-lists/${todoListId}/`, requestData)
  };
};

// TODO
//
// LIST
export const getTodos = todoListId => {
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
    apiCallFunction: () =>
      fetchFromApi(`/api/todo-lists/${todoListId}/todos/`, requestData)
  };
};

// CREATE
export const createTodo = (todoListId, todoTitle, todoDeadline) => {
  const requestData = {
    method: "POST",
    headers: {
      authorization: `Token ${localStorage.token}`
    },
    body: JSON.stringify({
      title: todoTitle,
      deadline: moment(todoDeadline).format()
    })
  };
  return {
    types: {
      request: CREATE_TODO_REQUEST,
      success: CREATE_TODO_SUCCESS,
      failure: CREATE_TODO_FAILURE
    },
    apiCallFunction: () =>
      fetchFromApi(`/api/todo-lists/${todoListId}/todos/`, requestData)
  };
};

export const clearCreateTodoErrors = () => ({
  type: CLEAR_CREATE_TODO_ERRORS
});
