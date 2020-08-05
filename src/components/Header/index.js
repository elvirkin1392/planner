import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  AppBar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import {
  actions as authActions,
  selectors as authSelectors,
} from 'services/auth';
import { useStyles } from './styles';

function Header(props) {
  const { onDrawerOpen, isDrawerOpen } = props; //TODO: remove if sidebar is static
  const logo = null; //TODO: use logo
  const classes = useStyles();

  const userProfile = useSelector(authSelectors.getUserProfile);
  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.logout());
  }
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={onDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: isDrawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          {logo || 'Ignilife'}
        </Typography>
        <Typography>{userProfile.email}</Typography>
        <Button color='inherit' onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
