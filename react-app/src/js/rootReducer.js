import { combineReducers } from "redux";

import authReducers from "./auth/reducers";
import messagerReducers from "./welcome/reducers";
import { todoReducers } from "./dashboard/reducers";

export default combineReducers({
  messager: messagerReducers,
  auth: authReducers,
  todo: todoReducers
});
