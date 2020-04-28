import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_SUCCESS_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  successMessage: null,
  errors: null
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: initialState.successMessage,
        errors: initialState.errors
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.response.data.key);
      return {
        ...state,
        isLoading: initialState.isLoading,
        successMessage: "Logged in successfully."
      };
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: initialState.isLoading,
        errors: action.response.data
      };
    case CLEAR_LOGIN_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    default:
      return state;
  }
}
