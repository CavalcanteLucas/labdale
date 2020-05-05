import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Header from "./Header";

const WelcomePage = React.lazy(() => import("./welcome"));
const RegisterForm = React.lazy(() => import("./auth/components/RegisterForm"));
const PasswordResetForm = React.lazy(() =>
  import("./auth/components/PasswordResetForm")
);
const PasswordResetConfirmForm = React.lazy(() =>
  import("./auth/components/PasswordResetConfirmForm")
);
const PasswordResetConfirmEmailSent = React.lazy(() =>
  import("./auth/components/PasswordResetConfirmEmailSent")
);
const Dashboard = React.lazy(() => import("./dashboard"));

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PublicRoute exact path="/" component={WelcomePage} />
            <PublicRoute exact path="/register" component={RegisterForm} />
            <PublicRoute
              exact
              path="/password_reset"
              component={PasswordResetForm}
            />
            <PublicRoute
              exact
              path="/password_reset/confirm"
              component={PasswordResetConfirmEmailSent}
            />
            <PublicRoute
              exact
              path="/password/reset/confirm/:uid/:token"
              component={PasswordResetConfirmForm}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}
