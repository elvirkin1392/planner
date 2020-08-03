import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { selectors } from "services/auth";

import Sidebar from "components/Sidebar";
import SignInPage from "./SignInPage";
import DashboardPage from "./DashboardPage";
import SchedulePage from  './SchedulePage'

function LoginRouting() {
  return (
    <Switch>
      <Route path="/">
        <SignInPage />
      </Route>
    </Switch>
  );
}

function AppRouting() {
  return (
    <Switch>
      <Sidebar>
        <Route exact path="/">
          <DashboardPage />
        </Route>
        <Route exact path="/schedule">
          <SchedulePage />
        </Route>
      </Sidebar>
    </Switch>
  );
}

function Routing() {
  const isAuthenticated = useSelector(selectors.isAuthenticated);

  return <Router>{isAuthenticated ? <AppRouting /> : <LoginRouting />}</Router>;
}

export default Routing;
