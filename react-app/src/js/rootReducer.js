import { combineReducers } from "redux";

import authReducers from "./auth/reducers";
import welcomeReducers from "./welcome/reducers";
import { todoReducers } from "./dashboard/reducers";

export default combineReducers({
  welcome: welcomeReducers,
  auth: authReducers,
  todo: todoReducers
});
