import { combineReducers } from "redux";

import registerReducers from "./register-form/reducers";
import passwordResetReducers from "./password-reset-form/reducers";
import passwordResetConfirmReducers from "./password-reset-confirm-form/reducers";

export default combineReducers({
  register: registerReducers,
  passwordReset: passwordResetReducers,
  passwordResetConfirm: passwordResetConfirmReducers
});
