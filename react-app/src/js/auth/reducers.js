import {
  // REGISTER
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTER_ERRORS,
  // LOGIN
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_ERRORS,
  // LOGOUT
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  // PASSWORD_RESET
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  CLEAR_PASSWORD_RESET_ERRORS,
  // PASSWORD_RESET_CONFIRM
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILURE,
  CLEAR_PASSWORD_RESET_CONFIRM_ERRORS,
  // GET_USER_INFO
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  // REGISTER
  registerIsLoading: false,
  registerErrors: null,
  registerIsSuccessfull: null,
  // LOGIN
  loginIsLoading: false,
  loginErrors: null,
  // LOGOUT
  logoutIsLoading: false,
  // PASSWORD_RESET
  passwordResetIsLoading: false,
  passwordResetErrors: null,
  passwordResetIsSuccessfull: null,
  // PASSWORD_RESET_CONFIRM
  passwordResetConfirmIsLoading: false,
  passwordResetConfirmErrors: null,
  passwordResetConfirmIsSuccessFull: null,
  // USER_INFO
  getUserInfo: null,
  getUserInfoIsLoading: false,
  getUserInfoErrors: null
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    // REGISTER
    case REGISTER_REQUEST:
      return {
        ...state,
        registerIsLoading: true,
        registerErrors: initialState.registerErrors,
        registerIsSuccessfull: initialState.registerIsSuccessfull
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerIsLoading: initialState.registerIsLoading,
        registerIsSuccessfull: action.response.ok
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerIsLoading: initialState.registerIsLoading,
        registerErrors: action.response.data,
        registerIsSuccessfull: action.response.ok
      };

    case CLEAR_REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: initialState.registerErrors
      };

    // LOGIN
    case LOGIN_REQUEST:
      return {
        ...state,
        loginIsLoading: true,
        loginErrors: initialState.loginErrors
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.response.data.key);
      return {
        ...state,
        token: action.response.data.key,
        loginIsLoading: initialState.loginIsLoading,
        isAuthenticated: action.response.ok
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginIsLoading: initialState.loginIsLoading,
        loginErrors: action.response.data
      };
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: initialState.loginErrors
      };

    // LOGOUT
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutIsLoading: true
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      initialState.token = null;
      initialState.isAuthenticated = false;
      return initialState;

    // PASSWORD_RESET
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        passwordResetIsLoading: true,
        passwordResetErrors: initialState.passwordResetErrors,
        passwordResetIsSuccessfull: initialState.passwordResetIsSuccessfull
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetIsLoading: initialState.passwordResetIsLoading,
        passwordResetIsSuccessfull: action.response.ok
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        passwordResetIsLoading: initialState.passwordResetIsLoading,
        passwordResetErrors: action.response.data,
        passwordResetIsSuccessfull: action.response.ok
      };
    case CLEAR_PASSWORD_RESET_ERRORS:
      return {
        ...state,
        passwordResetErrors: initialState.passwordResetErrors
      };

    // PASSWORD_RESET_CONFIRM
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        passwordResetConfirmIsLoading: true,
        passwordResetConfirmErrors: initialState.passwordResetConfirmErrors,
        passwordResetConfirmIsSuccessFull:
          initialState.passwordResetConfirmIsSuccessFull
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        passwordResetConfirmIsLoading:
          initialState.passwordResetConfirmIsLoading,
        passwordResetConfirmIsSuccessfull: action.response.ok
      };
    case PASSWORD_RESET_CONFIRM_FAILURE:
      return {
        ...state,
        passwordResetConfirmIsLoading:
          initialState.passwordResetConfirmIsLoading,
        passwordResetConfirmErrors: action.response.data,
        passwordResetConfirmIsSuccessfull: action.response.ok
      };
    case CLEAR_PASSWORD_RESET_CONFIRM_ERRORS:
      return {
        ...state,
        passwordResetConfirmErrors: initialState.passwordResetConfirmErrors
      };

    // GET_USER_INFO
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        getUserInfoIsLoading: true,
        getUserInfoErrors: initialState.getUserInfoErrors
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getUserInfoIsLoading: initialState.getUserInfoIsLoading,
        userInfo: action.response.data
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        getUserInfoIsLoading: initialState.getUserInfoIsLoading,
        getUserInfoErrors: action.response.data
      };
    default:
      return state;
  }
}
