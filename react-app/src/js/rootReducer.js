import { combineReducers } from "redux";

import todoAuthReducers from "./register-form/reducers";

export default combineReducers({
  todoAuth: todoAuthReducers
});
