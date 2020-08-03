import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TuneIcon from '@material-ui/icons/Tune';
import {
  AppBar,
  Drawer,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  List,
  Toolbar,
  Typography,
  IconButton,
  ListItem,
  Divider,
  useTheme,
  makeStyles,
  Button,
  Box,
} from '@material-ui/core';
import {
  actions as authActions,
  selectors as authSelectors,
} from 'services/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
  title: {
    flexGrow: 1,
  },
  listContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {},
  selectedItem: {
    icon: {
      color: 'blue'
    }
  },
  settingsContainer: {
    display: 'flex',
    height: 'auto',
    justifyContent: 'center',
    flexDirection: 'column',
  }
}));

export default function Sidebar(props) {
  const { children, title } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector(authSelectors.getUserProfile);

  function logout() {
    dispatch(authActions.logout());
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sections = [
    { text: 'Dashboard', icon: <HomeOutlinedIcon />, link: '/' },
    { text: 'Schedule', icon: <DateRangeIcon />, link: '/schedule' },
    { text: 'Patients', icon: <PeopleOutlineIcon />, link: '/patients' },
    { text: 'Chat', icon: <ChatOutlinedIcon />, link: '/chat' },
    { text: 'Alerts', icon: <ErrorOutlineIcon />, link: '/alert' },
  ];
  const settings = [
    { text: 'Plans', icon: <FavoriteBorderIcon />, link: '/plans' },
    { text: 'Settings', icon: <TuneIcon />, link: '/settings' },
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {title || 'Ignilife'}
          </Typography>
          <Typography>{userProfile.email}</Typography>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Box className={classes.listContainer}>
          <List>
            {sections.map(({ text, icon, link }, index) => (
              <NavLink key={text} exact to={link} activeClassName={classes.selectedItem}>
                <ListItem button>
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
        <Box className={classes.settingsContainer}>
          <List>
            {settings.map(({ text, icon, link }, index) => (
              <NavLink key={text} exact to={link} activeClassName={classes.selectedItem}>
                <ListItem button>
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
