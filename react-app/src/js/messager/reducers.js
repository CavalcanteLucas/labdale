import { SET_SUCCESS_MESSAGE, CLEAR_SUCCESS_MESSAGE } from "./actions";
import {
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  PASSWORD_RESET_CONFIRM_SUCCESS
} from "../auth/actions";
import {
  CREATE_TODO_LIST_SUCCESS,
  EDIT_TODO_LIST_SUCCESS
} from "../dashboard/actions";

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
      const newMessageList = [...state.messageList];
      newMessageList.splice(action.extraData.index, 1);
      return {
        ...state,
        messageList: newMessageList
      };
    case LOGOUT_SUCCESS:
      return initialState;

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

    case CREATE_TODO_LIST_SUCCESS:
      return {
        messageList: [...state.messageList, "Todo List created successfully."]
      };

    case EDIT_TODO_LIST_SUCCESS:
      return {
        messageList: [...state.messageList, "Todo List changed successfully."]
      };

    default:
      return state;
  }
}
