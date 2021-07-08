//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './NavDrawer.css';
import LogOutButton from '../LogOutButton/LogOutButton';

// ⬇ Dependent functionality:
import React, { useState } from 'react'
import { SwipeableDrawer, Button, List, ListItem, ListItemText, Divider, IconButton, Box } from '@material-ui/core';

import { useStyles, theme, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import WorkIcon from '@material-ui/icons/Work';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//#endregion ⬆⬆ Document setup above. 


export default function NavDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log('In toggleDrawer');
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="NavDrawer-wrapper">

      <IconButton
        onClick={() => setOpen(true)}
      >
        <MenuIcon
          className={classes.navBarIcon}
        />
      </IconButton>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => { }}
      >
        <div className={'NavDrawer-menu'}>
          <Box>
            <img src="./images/PMUBlackIcon.svg" height="75"></img>
            <br /> Pack Me Up!
          </Box>

          <Divider />

          <List>
            <ListItem button onClick={() => {}}>
              <HomeOutlinedIcon /> &nbsp;
              <ListItemText primary={"Dashboard"} />
            </ListItem>

            <ListItem button onClick={() => {}}>
              <AddCircleOutlineOutlinedIcon /> &nbsp;
              <ListItemText primary={"Create Kits"} />
            </ListItem>

            <ListItem button onClick={() => {}}>
              <AddBoxOutlinedIcon /> &nbsp;
              <ListItemText primary={"Create Events"} />
            </ListItem>

            <ListItem button onClick={() => {}}>
              <WorkOutlineOutlinedIcon /> &nbsp;
              <ListItemText primary={"Start Packing!"} />
            </ListItem>

            <Divider />

            <ListItem button onClick={() => {}}>
              <InfoOutlinedIcon /> &nbsp;
              <ListItemText primary={"App Info"} />
            </ListItem>

            <ListItem button onClick={() => {}}>
              <HelpOutlineIcon /> &nbsp;
              <ListItemText primary={"About Us"} />
            </ListItem>

            <Divider />

            <ListItem button onClick={() => {}}>
              <PersonOutlineOutlinedIcon /> &nbsp;
              <ListItemText primary={"Profile"} />
            </ListItem>

            <ListItem button onClick={() => {}}>
              <ExitToAppIcon /> &nbsp;
              <ListItemText primary={"Log Out"} />
            </ListItem>

          </List>
        </div>
      </SwipeableDrawer>


    </div>
  )
}
