import {
  GET_TODO_LISTS_REQUEST,
  GET_TODO_LISTS_SUCCESS,
  GET_TODO_LISTS_FAILURE,
  CREATE_TODO_LIST_REQUEST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE,
  CLEAR_CREATE_TODO_LIST_FAILURE_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  todos: null,
  createTodoListErrors: null,
  getTodoListsErrors: null
};

export function todoReducers(state = initialState, action) {
  switch (action.type) {
    // CREATE_TODO_LIST
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.createTodoListErrors
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todos: [action.response.data, ...state.todos],
        isLoading: initialState.isLoading
      };
    case CREATE_TODO_LIST_FAILURE:
      return {
        ...state,
        isLoading: initialState.isLoading,
        createTodoListErrors: action.response.data
      };

   // GET_TODO_LISTS
    case GET_TODO_LISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        todos: initialState.todos,
        errors: initialState.getTodoListErrors
      };
    case GET_TODO_LISTS_SUCCESS:
      return {
        ...state,
        isLoading: initialState.isLoading,
        todos: action.response.data
      };
    case GET_TODO_LISTS_FAILURE:
      return {
        ...state,
        isLoading: initialState.isLoading,
        getTodoListsErrors: action.response.data
      };

    // CLEAR_FAILURE_MESSAGE
    case CLEAR_CREATE_TODO_LIST_FAILURE_MESSAGE:
      return {
        ...state,
        createTodoListErrors: initialState.createTodoListErrors
      };
    default:
      return state;
  }
}
