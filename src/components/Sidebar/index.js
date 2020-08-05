import React, { useState } from 'react';
import clsx from 'clsx';
import { Drawer, IconButton, Divider, Box } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { useStyles } from 'components/Sidebar/styles';
import Links, { pages, settings } from 'components/Sidebar/links';

export default function Sidebar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const drawerClass = open ? classes.drawerOpen : classes.drawerClose;

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, drawerClass)}
      classes={{ paper: drawerClass }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <Box className={classes.listContainer}>
        <Links list={pages} />
      </Box>
      <Box className={classes.settingsContainer}>
        <Links list={settings} />
      </Box>
    </Drawer>
  );
}
