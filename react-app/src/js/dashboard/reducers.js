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
  // TODO
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  CLEAR_CREATE_TODO_ERRORS,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
  CLEAR_EDIT_TODO_ERRORS
} from "./actions";
import { LOGOUT_SUCCESS } from "../auth/actions";

const initialState = {
  // TODOLIST
  todoLists: null,
  getTodoListsIsLoading: false,
  createTodoListIsLoading: false,
  createTodoListErrors: null,
  createTodoListIsSuccessfull: null,
  todoListDetail: null,
  getTodoListIsLoading: false,
  editTodoListIsLoading: false,
  editTodoListErrors: null,
  editTodoListIsSuccessfull: null,
  deleteTodoListIsLoading: false,
  deleteTodoListErrors: null,
  deleteTodoListIsSuccessfull: null,
  // TODO
  todos: [],
  getTodosIsLoading: false,
  createTodoIsLoading: false,
  createTodoErrors: null,
  createTodoIsSuccessfull: null
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
        getTodoListsIsLoading: initialState.getTodoListsIsLoading
      };

    // GET_TODO_LIST
    case GET_TODO_LIST_REQUEST:
      return {
        ...state,
        getTodoListIsLoading: true,
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
        getTodoListIsLoading: initialState.getTodoListIsLoading
      };

    // CREATE_TODO_LIST
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        createTodoListIsLoading: true,
        createTodoListErrors: initialState.createTodoListErrors,
        createTodoListIsSuccessfull: initialState.createTodoListIsSuccessfull
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [action.response.data, ...state.todoLists],
        todoListDetail: action.response.data,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListIsSuccessfull: action.response.ok
      };
    case CREATE_TODO_LIST_FAILURE:
      return {
        ...state,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListErrors: action.response.data || [["Server Error"]],
        createTodoListIsSuccessfull: action.response.ok
      };
    case CLEAR_CREATE_TODO_LIST_ERRORS:
      return {
        ...state,
        createTodoListErrors: initialState.createTodoListErrors
      };

    // EDIT_TODO_LIST
    case EDIT_TODO_LIST_REQUEST:
      return {
        ...state,
        editTodoListIsLoading: true,
        editTodoListErrors: initialState.editTodoListErrors,
        editTodoListIsSuccessfull: initialState.editTodoListIsSuccessfull
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
        editTodoListIsSuccessfull: action.response.ok
      };
    case EDIT_TODO_LIST_FAILURE:
      return {
        ...state,
        editTodoListIsLoading: initialState.editTodoListIsLoading,
        editTodoListErrors: action.response.data,
        editTodoListIsSuccessfull: action.response.ok
      };
    case CLEAR_EDIT_TODO_LIST_ERRORS:
      return {
        ...state,
        editTodoListErrors: initialState.editTodoListErrors
      };

    // DELETE_TODO_LIST:
    case DELETE_TODO_LIST_REQUEST:
      return {
        ...state,
        deleteTodoListIsLoading: true,
        deleteTodoListErrors: initialState.deleteTodoListErrors,
        deleteTodoListIsSuccessfull: initialState.deleteTodoListIsSuccessfull
      };
    case DELETE_TODO_LIST_SUCCESS:
      const todoListsAfterDelete = [...state.todoLists];
      todoListsAfterDelete.splice(action.extraData.todoListId, 1);
      return {
        ...state,
        todoLists: todoListsAfterDelete,
        todoListDetail: initialState.todoListDetail,
        deleteTodoListIsLoading: initialState.deleteTodoListIsLoading,
        deleteTodoListIsSuccessfull: action.response.ok
      };
    case DELETE_TODO_LIST_FAILURE:
      return {
        ...state,
        deleteTodoListIsLoading: action.response.ok
      };

    //
    // TODO
    //
    // GET_TODOS
    case GET_TODOS_REQUEST:
      return {
        ...state,
        getTodosIsLoading: true,
        todos: initialState.todos
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
        getTodosIsLoading: initialState.getTodosIsLoading
      };
    // CREATE_TODO
    case CREATE_TODO_REQUEST:
      return {
        ...state,
        createTodoIsLoading: true,
        createTodoErrors: initialState.createTodoErrors,
        createTodoIsSuccessfull: initialState.createTodoIsSuccessfull
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.response.data],
        todoDetail: action.response.data,
        createTodoIsLoading: initialState.createTodoIsLoading,
        createTodoIsSuccessfull: action.response.ok
      };
    case CREATE_TODO_FAILURE:
      return {
        ...state,
        createTodoIsLoading: initialState.createTodoIsLoading,
        createTodoErrors: action.response.data || [["Server Error"]],
        createTodoIsSuccessfull: action.response.ok
      };
    case CLEAR_CREATE_TODO_ERRORS:
      return {
        ...state,
        createTodoErrors: initialState.createTodoErrors
      };

    // EDIT_TODO_LIST
    case EDIT_TODO_REQUEST:
      return {
        ...state,
        editTodoIsLoading: true,
        editTodoErrors: initialState.editTodoErrors,
        editTodoIsSuccessfull: initialState.editTodoIsSuccessfull
      };
    case EDIT_TODO_SUCCESS:
      const todoDetail = action.response.data;
      const todosAfterEdit = state.todos.map(item => {
        if (item.id !== todoDetail.id) return item;
        return todoDetail;
      });
      return {
        ...state,
        todoDetail,
        todos: todosAfterEdit,
        editTodoIsLoading: initialState.editTodoIsLoading,
        editTodoIsSuccessfull: action.response.ok
      };
    case EDIT_TODO_FAILURE:
      return {
        ...state,
        editTodoIsLoading: initialState.editTodoIsLoading,
        editTodoErrors: action.response.data,
        editTodoIsSuccessfull: action.response.ok
      };
    case CLEAR_EDIT_TODO_ERRORS:
      return {
        ...state,
        editTodoErrors: initialState.editTodoErrors
      };

    // LOGOUT
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
