import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE,
  CLEAR_PASSWORD_RESET_FAILURE_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  successMessage: null,
  errors: null
};

export default function passwordResetReducers(state = initialState, action) {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: initialState.successMessage,
        errors: initialState.errors
      };
    case PASSWORD_RESET_SUCCESS:
      localStorage.setItem("token", action.response.data.key);
      return {
        ...state,
        isLoading: initialState.isLoading,
        successMessage:
          "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
      };
    case PASSWORD_RESET_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: initialState.isLoading,
        errors: action.response.data
      };
    case CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    case CLEAR_PASSWORD_RESET_FAILURE_MESSAGE:
      return {
        ...state,
        errors: initialState.errors
      };
    default:
      return state;
  }
}
