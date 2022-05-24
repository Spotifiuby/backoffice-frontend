import React, {useEffect, useState} from "react";
import {
  Avatar, Backdrop, Button, CircularProgress, Collapse,
  CssBaseline, Grid,
  makeStyles, Paper, TextField,
  Typography
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import styles from "./styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {authenticationService} from "../../../services/AuthenticationService";
import {useNavigate} from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles(styles);

const LoginPage = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const [showLoading, setShowLoading] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      setShowLoading(true);
      return;
    }
    if (user) {
      user.getIdToken().then(accessToken => {
        authenticationService.loginFirebase({email: user.email, token: accessToken})
        .then(() => {
          const { from } = window.location.state || { from: { pathname: "/" } };
          history(from);
        });
      })
    }
  }, [user, loading])

  useEffect(() => {
    if (!authenticationService.currentUserValue) {
      setShowLoading(false);
    } else {
      authenticationService.isValidSession()
      .then(response => {
        if (response.ok) {
          const { from } = window.location.state || { from: { pathname: "/" } };
          history(from);
        }
      }).catch(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          authenticationService.logout();
        } else {
          console.log(err);
        }
        setShowLoading(false);
      });
    }
  }, [history])

  const handleSignIn = () => {
    setShowLoading(true);
    if (!loginData.email || !loginData.password) {
      setErrors({
        user: !loginData.email,
        password: !loginData.password,
      });
      setShowLoading(false);
    } else {
      logInWithEmailAndPassword(loginData.email, loginData.password)
      .catch(error => {

          console.log(error);
          if (error.status === 406) {
            setShowError(true);
          }
          setShowLoading(false);
      });
    }
  };

  const onChangeUser = (e) => {
    errors.user && setErrors({ ...errors , user:false} );
    setLoginData({...loginData, email:e.target.value});
  }

  const onChangePass = (e) => {
    errors.password && setErrors({ ...errors , password:false} );
    setLoginData({...loginData, password:e.target.value});
  }

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root} >
        <CssBaseline />
        <Grid item xs={false} sm={6} md={6} className={classes.image} />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography variant="h1" style={{fontWeight: 'bold'}}>
              SPOTIFIUBY
            </Typography>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Collapse in={showError} className={classes.showError}>
              <Alert variant="outlined" severity="error">
                Usuario o contraseña incorrectos
              </Alert>
            </Collapse>
            <div className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user"
                label="Cuenta de mail"
                name="user"
                error={ errors.user }
                onChange={onChangeUser}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Clave de acceso"
                type="password"
                id="password"
                error={ errors.password }
                onChange={onChangePass}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignIn}
              >
                Ingresar
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={showLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}

export default LoginPage;