import {
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILURE,
  CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE,
  CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  successMessage: null,
  errors: null
};

export default function passwordResetConfirmReducers(
  state = initialState,
  action
) {
  switch (action.type) {
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: initialState.successMessage,
        errors: initialState.errors
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      localStorage.setItem("token", action.response.data.token);
      return {
        ...state,
        isLoading: initialState.isLoading,
        successMessage:
          "Your password has been successfully changed. Use your new credentials to login."
      };
    case PASSWORD_RESET_CONFIRM_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: initialState.isLoading,
        errors: action.response.data
      };
    case CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    case CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE:
      return {
        ...state,
        errors: initialState.errors
      };
    default:
      return state;
  }
}
