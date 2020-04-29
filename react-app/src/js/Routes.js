import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";

const WelcomePage = React.lazy(() => import("./welcome"));
const RegisterForm = React.lazy(() => import("./register-form"));
const PasswordResetForm = React.lazy(() => import("./password-reset-form"));
const PasswordResetConfirmForm = React.lazy(() =>
  import("./password-reset-confirm-form")
);
const PasswordResetConfirmEmailSent = React.lazy(() =>
  import("./password-reset-confirm-email-sent")
);
const Dashboard = React.lazy(() => import("./dashboard"));

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/password_reset" component={PasswordResetForm} />
            <Route
              exact
              path="/password_reset/confirm"
              component={PasswordResetConfirmEmailSent}
            />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              component={PasswordResetConfirmForm}
            />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}
