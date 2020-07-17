import {
  CLEAR_SUCCESS_MESSAGE,
  SET_SUCCESS_MESSAGE,
  CLEAR_REGISTER_SUCCESS_MESSAGE
} from "./actions";
import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_REQUEST
} from "../auth/actions";

const initialState = {
  successMessage: null,
  registerSuccessMessage: null
};

export default function messagerReducers(state = initialState, action) {
  switch (action.type) {
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.successMessage
      };
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    case LOGOUT_SUCCESS:
      return initialState;

    case REGISTER_REQUEST:
      return {
        ...state,
        registerSuccessMessage: initialState.registerSuccessMessage
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccessMessage: "User successfully created!"
      };
    case CLEAR_REGISTER_SUCCESS_MESSAGE:
      return {
        ...state,
        registerSuccessMessage: initialState.registerSuccessMessage
      };

    default:
      return state;
  }
}
