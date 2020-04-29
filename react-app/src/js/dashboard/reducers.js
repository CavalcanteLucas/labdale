import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE
} from "./actions";

const initialState = {
  isLoading: false,
  errors: null,
  todos: null
};

export default function todoReducers(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
        todos: initialState.todos,
        errors: initialState.errors
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: initialState.isLoading,
        todos: action.response.data
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        isLoading: initialState.isLoading
      };
    default:
      return state;
  }
}
