import {
  GET_TODO_LISTS_REQUEST,
  GET_TODO_LISTS_SUCCESS,
  GET_TODO_LISTS_FAILURE,
  CREATE_TODO_LIST_REQUEST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE
} from "./actions";

const initialState = {
  isLoading: false,
  errors: null,
  todos: null
};

export function todoReducers(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case GET_TODO_LISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        todos: initialState.todos,
        errors: initialState.errors
      };
    case GET_TODO_LISTS_SUCCESS:
      return {
        ...state,
        isLoading: initialState.isLoading,
        todos: action.response.data
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todos: [action.response.data, ...state.todos],
        isLoading: initialState.isLoading
      };
    case CREATE_TODO_LIST_FAILURE:
    case GET_TODO_LISTS_FAILURE:
      return {
        ...state,
        isLoading: initialState.isLoading,
        errors: action.response.data
      };
    default:
      return state;
  }
}
