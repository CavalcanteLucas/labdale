import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTER_SUCCESS_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  errors: null,
  successMessage: null
};

export default function todoAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
        successMessage: initialState.successMessage
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.response.data.token);
      return {
        ...state,
        isLoading: false,
        successMessage: "User successfully created!"
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      // error mapping here
      return {
        ...state,
        token: null,
        isLoading: false,
        errors: action.response.data
      };
    case CLEAR_REGISTER_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    default:
      return state;
  }
}
