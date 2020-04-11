import { combineReducers } from "redux";

import todoAuthReducers from "./todo_auth/reducers";

export default combineReducers({
  todoAuth: todoAuthReducers
});
