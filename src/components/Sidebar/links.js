import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TuneIcon from '@material-ui/icons/Tune';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, } from '@material-ui/core';

import routeTemplates from 'pages/routeTemplates';

export const useStyles = makeStyles((theme) => ({
  icon: {},
  selectedItem: {
    icon: {
      color: 'blue',
    },
  },
}));

export const pages = [
  { text: 'Dashboard', icon: <HomeOutlinedIcon />, link: routeTemplates.dashboard, },
  { text: 'Schedule', icon: <DateRangeIcon />, link: routeTemplates.schedule },
  { text: 'Patients', icon: <PeopleOutlineIcon />, link: routeTemplates.patients, },
  { text: 'Chat', icon: <ChatOutlinedIcon />, link: routeTemplates.chat },
  { text: 'Alerts', icon: <ErrorOutlineIcon />, link: routeTemplates.alert },
];

export const settings = [
  { text: 'Plans', icon: <FavoriteBorderIcon />, link: routeTemplates.plans },
  { text: 'Settings', icon: <TuneIcon />, link: routeTemplates.settings },
];

export default function Links({ list }) {
  const classes = useStyles();
  return (
    <List>
      {list.map(({ text, icon, link }, index) => (
        <NavLink
          key={text}
          exact
          to={link}
          activeClassName={classes.selectedItem}
        >
          <ListItem button>
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
}
