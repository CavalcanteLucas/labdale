import {
  CLEAR_SUCCESS_MESSAGE,
  SET_SUCCESS_MESSAGE,
  CLEAR_REGISTER_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE_TEMP
} from "./actions";
import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_REQUEST
} from "../auth/actions";

const initialState = {
  successMessage: null,
  registerSuccessMessage: null,
  messageList: []
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
        ...state
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        messageList: [...state.messageList, "User successfully created!"]
      };
    case CLEAR_REGISTER_SUCCESS_MESSAGE:
      return {
        ...state,
        registerSuccessMessage: initialState.registerSuccessMessage
      };

    case CLEAR_SUCCESS_MESSAGE_TEMP:
      const newMessageList = [...state.messageList];
      newMessageList.splice(state.index, 1);
      return {
        ...state,
        messageList: newMessageList
      };

    default:
      return state;
  }
}
