import {
  GET_TODO_LISTS_REQUEST,
  GET_TODO_LISTS_SUCCESS,
  GET_TODO_LISTS_FAILURE,
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAILURE,
  CREATE_TODO_LIST_REQUEST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE,
  EDIT_TODO_LIST_TITLE_REQUEST,
  EDIT_TODO_LIST_TITLE_SUCCESS,
  EDIT_TODO_LIST_TITLE_FAILURE,
  CLEAR_CREATE_TODO_LIST_ERRORS,
  CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE,
  CLEAR_EDIT_TODO_LIST_TITLE_ERRORS,
  CLEAR_EDIT_TODO_LIST_TITLE_SUCCESS_MESSAGE,
  DELETE_TODO_LIST_REQUEST,
  DELETE_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_FAILURE,
  CLEAR_DELETE_TODO_LIST_SUCCESS_MESSAGE
} from "./actions";
import { LOGOUT_SUCCESS } from "../auth/actions";

const initialState = {
  todoLists: null,
  getTodoListsIsLoading: false,
  getTodoListsFailureMessage: null,
  createTodoListIsLoading: false,
  createTodoListSuccessMessage: null,
  createTodoListErrors: null,
  todoListDetail: null,
  getTodoListIsLoading: false,
  getTodoListFailureMessage: null,
  editTodoListTitleIsLoading: false,
  editTodoListTitleSuccessMessage: null,
  editTodoListTitleErrors: null,
  deleteTodoListIsLoading: false,
  deleteTodoListSuccessMessage: null,
  deleteTodoListErrors: null
};

export function todoReducers(state = initialState, action) {
  switch (action.type) {
    // GET_TODO_LISTS
    case GET_TODO_LISTS_REQUEST:
      return {
        ...state,
        getTodoListsIsLoading: true,
        getTodoListsFailureMessage: initialState.getTodoListsFailureMessage,
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
        getTodoListsFailureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve your To-Do lists from the database!"
      };

    // GET_TODO_LIST
    case GET_TODO_LIST_REQUEST:
      return {
        ...state,
        getTodoListIsLoading: true,
        getTodoListFailureMessage: initialState.getTodoListFailureMessage,
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
        getTodoListFailureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve the selected To-Do List from the database!"
      };

    // CREATE_TODO_LIST
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        createTodoListIsLoading: true,
        createTodoListSuccessMessage: initialState.createTodoListSuccessMessage,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [action.response.data, ...state.todoLists],
        todoListDetail: action.response.data,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListSuccessMessage: "Todo List created successfully."
      };
    case CREATE_TODO_LIST_FAILURE:
      return {
        ...state,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListErrors: action.response.data || [["Server Error"]]
      };

    // EDIT_TODO_LIST_TITLE
    case EDIT_TODO_LIST_TITLE_REQUEST:
      return {
        ...state,
        editTodoListTitleIsLoading: true,
        editTodoListTitleSuccessMessage:
          initialState.editTodoListTitleSuccessMessage,
        editTodoListTitleErrors: initialState.editTodoListTitleErrors
      };
    case EDIT_TODO_LIST_TITLE_SUCCESS:
      const todoListDetail = action.response.data;
      const todoListsAfterEdit = state.todoLists.map(item => {
        if (item.id !== todoListDetail.id) return item;
        return todoListDetail;
      });
      return {
        ...state,
        todoListDetail,
        todoLists: todoListsAfterEdit,
        editTodoListTitleIsLoading: initialState.editTodoListTitleIsLoading,
        editTodoListTitleSuccessMessage:
          "Todo List's title changed successfully."
      };
    case EDIT_TODO_LIST_TITLE_FAILURE:
      return {
        ...state,
        editTodoListTitleIsLoading: initialState.editTodoListTitleIsLoading,
        editTodoListTitleErrors: action.response.data
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
      const todoListsAfterDelete = state.todoLists.filter(
        value => value.id !== action.extraData.todoListId
      );
      return {
        ...state,
        todoLists: todoListsAfterDelete,
        todoListDetail: initialState.todoListDetail,
        deleteTodoListIsLoading: initialState.deleteTodoListIsLoading,
        deleteTodoListSuccessMessage: "Todo List deleted successfully."
      };
    case DELETE_TODO_LIST_FAILURE:
      return {
        ...state,
        deleteTodoListIsLoading: initialState.deleteTodoListIsLoading,
        deleteTodoListFailureMessage: "Opsy.. Something went wrong. Try again!"
      };

    // CLEAR ERRORS/SUCCESS MESSAGES
    case CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE:
      return {
        ...state,
        createTodoListSuccessMessage: initialState.createTodoListSuccessMessage
      };
    case CLEAR_CREATE_TODO_LIST_ERRORS:
      return {
        ...state,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CLEAR_EDIT_TODO_LIST_TITLE_SUCCESS_MESSAGE:
      return {
        ...state,
        editTodoListTitleSuccessMessage:
          initialState.editTodoListTitleSuccessMessage
      };
    case CLEAR_EDIT_TODO_LIST_TITLE_ERRORS:
      return {
        ...state,
        editTodoListTitleErrors: initialState.editTodoListTitleErrors
      };
    case CLEAR_DELETE_TODO_LIST_SUCCESS_MESSAGE:
      return {
        ...state,
        deleteTodoListSuccessMessage: initialState.deleteTodoListSuccessMessage
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
