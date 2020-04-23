import { combineReducers } from "redux";

import registerhReducers from "./register-form/reducers";
import passwordResetReducers from "./password-reset-form/reducers";

export default combineReducers({
  register: registerhReducers,
  passwordReset: passwordResetReducers
});
