import { CLEAR_SUCCESS_MESSAGE } from "./actions";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  PASSWORD_RESET_CONFIRM_SUCCESS
} from "../auth/actions";
import {
  CREATE_TODO_LIST_SUCCESS,
  EDIT_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_SUCCESS,
  CREATE_TODO_SUCCESS,
  EDIT_TODO_SUCCESS
} from "../dashboard/actions";

const initialState = {
  messageList: []
};

export default function messagerReducers(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SUCCESS_MESSAGE:
      const newMessageList = [...state.messageList];
      newMessageList.splice(action.extraData.index, 1);
      return {
        ...state,
        messageList: newMessageList
      };

    case LOGIN_SUCCESS:
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

    case DELETE_TODO_LIST_SUCCESS:
      return {
        messageList: [...state.messageList, "Todo List removed successfully."]
      };

    case CREATE_TODO_SUCCESS:
      return {
        messageList: [...state.messageList, "Todo created successfully."]
      };

    case EDIT_TODO_SUCCESS:
      return {
        messageList: [...state.messageList, "Todo changed successfully."]
      };

    default:
      return state;
  }
}
