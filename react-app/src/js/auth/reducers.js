import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  CLEAR_LOGIN_SUCCESS_MESSAGE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTER_SUCCESS_MESSAGE,
  CLEAR_REGISTER_FAILURE_MESSAGE,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILURE,
  CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE,
  CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE,
  CLEAR_PASSWORD_RESET_FAILURE_MESSAGE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  loginIsLoading: false,
  loginSuccessMessage: null,
  loginErrors: null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  passwordResetConfirmIsLoading: false,
  passwordResetConfirmSuccessMessage: null,
  passwordResetConfirmErrors: null,
  passwordResetIsLoading: false,
  passwordResetSuccessMessage: null,
  passwordResetErrors: null,
  registerIsLoading: false,
  registerSuccessMessage: null,
  registerErrors: null,
  userInfo: null,
  userInfoIsLoading: false,
  userInfoErrors: null
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loginIsLoading: true,
        loginSuccessMessage: initialState.loginSuccessMessage,
        loginErrors: initialState.loginErrors
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.response.data.key);
      return {
        ...state,
        token: action.response.data.key,
        loginIsLoading: initialState.loginIsLoading,
        loginSuccessMessage: "Logged in successfully.",
        isAuthenticated: true
      };
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      initialState.token = null;
      initialState.isAuthenticated = false;
      return initialState;
    case CLEAR_LOGIN_SUCCESS_MESSAGE:
      return {
        ...state,
        loginSuccessMessage: initialState.loginSuccessMessage
      };
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        passwordResetConfirmIsLoading: true,
        passwordResetConfirmSuccessMessage:
          initialState.passwordResetConfirmSuccessMessage,
        passwordResetConfirmErrors: initialState.passwordResetConfirmErrors
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        passwordResetConfirmIsLoading:
          initialState.passwordResetConfirmIsLoading,
        passwordResetConfirmSuccessMessage:
          "Your password has been successfully changed. Use your new credentials to login."
      };
    case PASSWORD_RESET_CONFIRM_FAILURE:
      return {
        ...state,
        passwordResetConfirmIsLoading:
          initialState.passwordResetConfirmIsLoading,
        passwordResetConfirmErrors: action.response.data
      };
    case CLEAR_PASSWORD_RESET_CONFIRM_SUCCESS_MESSAGE:
      return {
        ...state,
        passwordResetConfirmSuccessMessage:
          initialState.passwordResetConfirmSuccessMessage
      };
    case CLEAR_PASSWORD_RESET_CONFIRM_FAILURE_MESSAGE:
      return {
        ...state,
        passwordResetConfirmErrors: initialState.passwordResetConfirmErrors
      };
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        passwordResetIsLoading: true,
        passwordResetSuccessMessage: initialState.passwordResetSuccessMessage,
        passwordResetErrors: initialState.passwordResetErrors
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetIsLoading: initialState.passwordResetIsLoading,
        passwordResetSuccessMessage:
          "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        passwordResetIsLoading: initialState.passwordResetIsLoading,
        passwordResetErrors: action.response.data
      };
    case CLEAR_PASSWORD_RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        passwordResetSuccessMessage: initialState.passwordResetSuccessMessage
      };
    case CLEAR_PASSWORD_RESET_FAILURE_MESSAGE:
      return {
        ...state,
        passwordResetErrors: initialState.passwordResetErrors
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registerIsLoading: true,
        registerSuccessMessage: initialState.registerSuccessMessage,
        registerErrors: initialState.registerErrors
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerIsLoading: initialState.registerIsLoading,
        registerSuccessMessage: "User successfully created!"
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerIsLoading: initialState.registerIsLoading,
        registerErrors: action.response.data
      };
    case CLEAR_REGISTER_SUCCESS_MESSAGE:
      return {
        ...state,
        registerSuccessMessage: initialState.registerSuccessMessage
      };
    case CLEAR_REGISTER_FAILURE_MESSAGE:
      return {
        ...state,
        registerErrors: initialState.registerErrors
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        userInfoIsLoading: true,
        userInfoErrors: initialState.userInfoErrors
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfoIsLoading: initialState.userInfoIsLoading,
        userInfo: action.response.data
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        userInfoIsLoading: initialState.userInfoIsLoading,
        userInfoErrors: action.response.data
      };
    default:
      return state;
  }
}
