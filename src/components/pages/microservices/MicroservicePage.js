import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import styles from "./styles";
import {
  AppBar, Badge,
  CssBaseline,
  Divider,
  Drawer, FormControl,
  IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText,
  makeStyles, Menu, MenuItem, Select,
  Toolbar,
  Typography, useTheme
} from "@material-ui/core";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@material-ui/icons/Notifications";
import {AccountCircle} from "@material-ui/icons";
import {Link, Outlet} from "react-router-dom";
import ContextMenuOptions from "./ContextMenuOptions.json";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles(styles);

const MicroservicePage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
      <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Cerrar sesion</MenuItem>
      </Menu>
  );

  const menu = () => {
    return <List>
      {ContextMenuOptions.map((option, index) => (
          <ListItem button key={option.id} component={Link} to={`/${option.path}`}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={option.label} />
          </ListItem>
      ))}
    </List>
  }

  return (
      <React.Fragment>
          <div className={classes.root}>
          <CssBaseline />
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
          >
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, { [classes.hide]: open })}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
          >
            <div className={classes.drawerHeader}>
              <div className={classes.grow} />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            {menu()}
          </Drawer>
          <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
          >
            <div className={classes.drawerHeader} />
            <Outlet />
          </main>
        </div>
        {renderMenu}
      </React.Fragment>
  );
}

export default MicroservicePage;