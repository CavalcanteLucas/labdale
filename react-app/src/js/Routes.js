import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";

const WelcomePage = React.lazy(() => import("./welcome"));
const RegisterForm = React.lazy(() => import("./register-form"));

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="body-main" style={{ height: "100vh" }}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route exact path="/register" component={RegisterForm} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    );
  }
}
