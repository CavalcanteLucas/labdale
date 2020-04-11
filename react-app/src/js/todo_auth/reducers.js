import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./actions";

const initialState = {
  isLoading: false,
  isRegistered: false,
  token: localStorage.getItem("token"),
  errors: null
};

export default function todoAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        isLoading: false,
        errors: null
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: false,
        errors: action.errors
      };
    default:
      return state;
  }
}
