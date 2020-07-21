import {
  SET_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE_TEMP,
  CLEAR_SUCCESS_MESSAGE
} from "./actions";
import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS
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
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        messageList: [
          ...state.messageList,
          "Your password has been successfully changed. Use your new credentials to login."
        ]
      };
    case CLEAR_SUCCESS_MESSAGE_TEMP:
      const newMessageList = [...state.messageList];
      newMessageList.splice(action.extraData.index, 1);
      return {
        ...state,
        messageList: newMessageList
      };

    default:
      return state;
  }
}
