import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "./history";

const WelcomePage = React.lazy(() => import("./welcome"));
const RegisterForm = React.lazy(() => import("./todo_auth/RegisterForm"));

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route
              exact
              path="/register"
              component={RegisterForm}
              history={history}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}
