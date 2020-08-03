import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";

import {
  selectors as authSelectors,
  actions as authActions
} from "../../services/auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function AppLayout({ children, title }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userProfile = useSelector(authSelectors.getUserProfile);

  function logout() {
    dispatch(authActions.logout());
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title || "ignilife"}
          </Typography>
          <Typography>{userProfile.email}</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

export default AppLayout;
