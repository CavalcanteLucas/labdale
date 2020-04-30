import { combineReducers } from "redux";

import registerReducers from "./register-form/reducers";
import passwordResetReducers from "./password-reset-form/reducers";
import passwordResetConfirmReducers from "./password-reset-confirm-form/reducers";
import successMessageReducers from "./welcome/reducers";
import loginReducers from "./login-form/reducers";
import { todoReducers, userInfoReducers } from "./dashboard/reducers";

export default combineReducers({
  register: registerReducers,
  passwordReset: passwordResetReducers,
  passwordResetConfirm: passwordResetConfirmReducers,
  successMessage: successMessageReducers,
  login: loginReducers,
  todo: todoReducers,
  userInfo: userInfoReducers
});
