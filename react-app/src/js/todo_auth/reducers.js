import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  errors: null,
  response: false
};

export default function todoAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
        response: false
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.response.data.token);
      return {
        ...state,
        isLoading: false,
        response: action.response.ok
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: false,
        response: action.response.ok,
        errors: action.response.data
      };
    default:
      return state;
  }
}
