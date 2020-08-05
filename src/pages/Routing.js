import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';
import loadable from '@loadable/component';
import { selectors } from 'services/auth';

import routeTemplates from './routeTemplates';
import Sidebar from 'components/Sidebar';
import SignInPage from './SignInPage';
import DashboardPage from './DashboardPage';
import Header from 'components/Header';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function LoginRouting() {
  return (
    <Switch>
      <Route path='/'>
        <SignInPage />
      </Route>
    </Switch>
  );
}

const SchedulePage = loadable(() => import('./SchedulePage'));

function AppRouting() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact
            path={routeTemplates.dashboard}
            component={DashboardPage}
          />
          <Route
            exact
            path={routeTemplates.schedule}
            component={SchedulePage}
          />
        </Switch>
      </main>
    </div>
  );
}

function Routing() {
  const isAuthenticated = useSelector(selectors.isAuthenticated);

  return (
    <Router>
      <CssBaseline />
      {isAuthenticated ? <AppRouting /> : <LoginRouting />}
    </Router>
  );
}

export default Routing;
