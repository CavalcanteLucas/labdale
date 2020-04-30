import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from "./actions";

const initialState = {
  isLoading: false,
  errors: null,
  todos: null,
  userinfo: null
};

export function todoReducers(state = initialState, action) {
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

export function userInfoReducers(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: initialState.errors
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: initialState.isLoading,
        userInfo: action.response.data
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: initialState.isLoading,
        userInfo: initialState.userInfo
      };
    default:
      return state;
  }
}
