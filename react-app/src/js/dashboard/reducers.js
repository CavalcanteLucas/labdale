import {
  // TODOLIST
  GET_TODO_LISTS_REQUEST,
  GET_TODO_LISTS_SUCCESS,
  GET_TODO_LISTS_FAILURE,
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAILURE,
  CREATE_TODO_LIST_REQUEST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE,
  CLEAR_CREATE_TODO_LIST_ERRORS,
  EDIT_TODO_LIST_REQUEST,
  EDIT_TODO_LIST_SUCCESS,
  EDIT_TODO_LIST_FAILURE,
  CLEAR_EDIT_TODO_LIST_ERRORS,
  DELETE_TODO_LIST_REQUEST,
  DELETE_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_FAILURE,
  CLEAR_SUCCESS_MESSAGE,
  // TODO
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  CLEAR_CREATE_TODO_SUCCESS_MESSAGE,
  CLEAR_CREATE_TODO_ERRORS
} from "./actions";
import { LOGOUT_SUCCESS } from "../auth/actions";

const initialState = {
  // TODOLIST
  todoLists: null,
  getTodoListsIsLoading: false,
  createTodoListIsLoading: false,
  createTodoListErrors: null,
  todoListDetail: null,
  getTodoListIsLoading: false,
  editTodoListIsLoading: false,
  editTodoListErrors: null,
  deleteTodoListIsLoading: false,
  deleteTodoListSuccessMessage: null,
  deleteTodoListErrors: null,
  successMessage: null,
  failureMessage: null,
  // TODO
  todos: null,
  getTodosIsLoading: false,
  createTodoIsLoading: false,
  createTodoErrors: null
};

export function todoReducers(state = initialState, action) {
  switch (action.type) {
    //
    // TODOLIST
    //
    // GET_TODO_LISTS
    case GET_TODO_LISTS_REQUEST:
      return {
        ...state,
        getTodoListsIsLoading: true,
        failureMessage: initialState.failureMessage,
        todoLists: initialState.todoLists
      };
    case GET_TODO_LISTS_SUCCESS:
      return {
        ...state,
        getTodoListsIsLoading: initialState.getTodoListsIsLoading,
        todoLists: action.response.data
      };
    case GET_TODO_LISTS_FAILURE:
      return {
        ...state,
        getTodoListsIsLoading: initialState.getTodoListsIsLoading,
        failureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve your To-Do lists from the database!"
      };

    // GET_TODO_LIST
    case GET_TODO_LIST_REQUEST:
      return {
        ...state,
        getTodoListIsLoading: true,
        failureMessage: initialState.failureMessage,
        todoListDetail: initialState.todoListDetail
      };
    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        getTodoListIsLoading: initialState.getTodoListIsLoading,
        todoListDetail: action.response.data
      };
    case GET_TODO_LIST_FAILURE:
      return {
        ...state,
        getTodoListIsLoading: initialState.getTodoListIsLoading,
        failureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve the selected To-Do List from the database!"
      };

    // CREATE_TODO_LIST
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        createTodoListIsLoading: true,
        successMessage: initialState.successMessage,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [action.response.data, ...state.todoLists],
        todoListDetail: action.response.data,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        successMessage: "Todo List created successfully."
      };
    case CREATE_TODO_LIST_FAILURE:
      return {
        ...state,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListErrors: action.response.data || [["Server Error"]]
      };

    // EDIT_TODO_LIST
    case EDIT_TODO_LIST_REQUEST:
      return {
        ...state,
        editTodoListIsLoading: true,
        successMessage: initialState.successMessage,
        editTodoListErrors: initialState.editTodoListErrors
      };
    case EDIT_TODO_LIST_SUCCESS:
      const todoListDetail = action.response.data;
      const todoListsAfterEdit = state.todoLists.map(item => {
        if (item.id !== todoListDetail.id) return item;
        return todoListDetail;
      });
      return {
        ...state,
        todoListDetail,
        todoLists: todoListsAfterEdit,
        editTodoListIsLoading: initialState.editTodoListIsLoading,
        successMessage: "Todo List changed successfully."
      };
    case EDIT_TODO_LIST_FAILURE:
      return {
        ...state,
        editTodoListIsLoading: initialState.editTodoListIsLoading,
        editTodoListErrors: action.response.data
      };

    // DELETE_TODO_LIST:
    case DELETE_TODO_LIST_REQUEST:
      return {
        ...state,
        deleteTodoListIsLoading: true,
        deleteTodoListSuccessMessage: initialState.deleteTodoListSuccessMessage,
        deleteTodoListErrors: initialState.deleteTodoListErrors
      };
    case DELETE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoListDetail: initialState.todoListDetail,
        deleteTodoListIsLoading: initialState.deleteTodoListIsLoading,
        successMessage: "Todo List deleted successfully."
      };
    case DELETE_TODO_LIST_FAILURE:
      return {
        ...state,
        deleteTodoListIsLoading: initialState.deleteTodoListIsLoading,
        failureMessage: "Opsy.. Something went wrong. Try again!"
      };

    // CLEAR ERRORS/SUCCESS MESSAGES
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };

    case CLEAR_CREATE_TODO_LIST_ERRORS:
      return {
        ...state,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CLEAR_EDIT_TODO_LIST_ERRORS:
      return {
        ...state,
        editTodoListErrors: initialState.editTodoListErrors
      };

    //
    // TODO
    //
    // GET_TODOS
    case GET_TODOS_REQUEST:
      return {
        ...state,
        getTodosIsLoading: true,
        failureMessage: initialState.failureMessage,
        todos: initialState.todoLists
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        getTodosIsLoading: initialState.getTodosIsLoading,
        todos: action.response.data
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        getTodosIsLoading: initialState.getTodosIsLoading,
        failureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve your To-Dos from the database!"
      };
    // CREATE_TODO
    case CREATE_TODO_REQUEST:
      return {
        ...state,
        createTodoIsLoading: true,
        successMessage: initialState.successMessage,
        createTodoErrors: initialState.createTodoErrors
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [state.todos, action.response.data],
        todoDetail: action.response.data,
        createTodoIsLoading: initialState.createTodoIsLoading,
        successMessage: "Todo created successfully."
      };
    case CREATE_TODO_FAILURE:
      return {
        ...state,
        createTodoIsLoading: initialState.createTodoIsLoading,
        createTodoErrors: action.response.data || [["Server Error"]]
      };
    // CLEAR ERRORS/SUCCESS MESSAGES
    case CLEAR_CREATE_TODO_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    case CLEAR_CREATE_TODO_ERRORS:
      return {
        ...state,
        createTodoErrors: initialState.createTodoErrors
      };

    // LOGOUT
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
