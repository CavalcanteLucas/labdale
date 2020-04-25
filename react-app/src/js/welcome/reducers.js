import { CLEAR_SUCCESS_MESSAGE, SET_SUCCESS_MESSAGE } from "./actions";

const initialState = {
  successMessage: null
};

export default function successMessageReducers(state = initialState, action) {
  // console.log(action)
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
    default:
      return state;
  }
}
