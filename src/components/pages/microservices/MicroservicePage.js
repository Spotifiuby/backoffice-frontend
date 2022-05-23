import React from "react";
import styles from "./styles";
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton, List, ListItem, ListItemIcon, ListItemText,
  makeStyles, Menu, MenuItem,
  Toolbar, Typography,
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {Link, Outlet} from "react-router-dom";
import ContextMenuOptions from "./ContextMenuOptions.json";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {authenticationService} from "../../../services/AuthenticationService";

const useStyles = makeStyles(styles);

const MicroservicePage = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

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
        <MenuItem onClick={() => authenticationService.logout()}>Cerrar sesion</MenuItem>
      </Menu>
  );

  const menu = () => {
      const icons = [<PeopleIcon/>, <LibraryMusicIcon/>, <AssessmentIcon/>,]
      return <List>
          {ContextMenuOptions.map((option, index) => (
              <ListItem button key={option.id} component={Link} to={`/${option.path}`}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={option.label}/>
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
              className={classes.appBar}
          >
            <Toolbar>
              <div className={classes.grow} />
              <Typography style={{marginLeft: '12vh'}} variant="h6" component="div" align="center" noWrap>
                <img alt="complex" src='logo.png' className={classes.spotifiubyLogo}/>
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Typography className={classes.title} variant="h6" component="div" align="center" noWrap>
                  Hola {authenticationService.currentUserValue.first_name} !
                </Typography>
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
              variant="permanent"
              anchor="left"
              classes={{
                paper: classes.drawerPaper,
              }}
          >
            <Toolbar />
            {menu()}
          </Drawer>
          <main
              className={classes.content}
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