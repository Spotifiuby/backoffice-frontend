import React from 'react';
import {
  Box,
  Button, Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, MenuItem,
  Grid,
  makeStyles, TextField,
  Typography, FormControl, InputLabel
} from "@material-ui/core";
import styles from "./styles";
import {usersService} from "../../../../../services/UsersService";
import {signupWithEmailAndPassword} from "../../../../../firebase";

const useStyles = makeStyles(styles);

const UserModal = ({open, handleClose, content}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [initialState, setInitialState] = React.useState({});
  const [fieldModified, setFieldModified] = React.useState({});

  React.useEffect(() => {
    if (content && content.id !== undefined) {
      usersService.getUserByMail(content.email, user => {
        let initContent = {
          ...user
        }
        setInitialState(initContent);
        setOpenModal(open);
      })
    } else {
      setState({});
      setInitialState({});
      setOpenModal(open);
    }
  }, [content]);

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
    setFieldModified({ ...fieldModified, [event.target.id]: true });
  };

  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    setFieldModified({ ...fieldModified, [event.target.name]: true });
  };

  const handleOnConfirm = () => {
    if (content && content.length !== 0) {
      usersService.updateUser(content.email, state, () => handleClose());
    } else {
      signupWithEmailAndPassword(state).then(() => handleClose());
    }
  };

  return (
      <React.Fragment>
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={openModal}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title" disableTypography={true}>
            <Typography variant="h4" component="div">
              <Box textAlign="left" m={1} mb={3} fontWeight="fontWeightBold">
                {content && content.email ? 'Editar' : 'Crear'} Usuario
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} item>
                <TextField
                    required
                    id="first_name"
                    label="Nombre"
                    variant="outlined"
                    value={fieldModified.first_name ? state.first_name : initialState.first_name}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="last_name"
                    label="Apellido"
                    variant="outlined"
                    value={fieldModified.last_name ? state.last_name : initialState.last_name}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={12} item>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={fieldModified.email ? state.email : initialState.email}
                    onChange={handleInputChange}
                    disabled={content && content.email !== undefined}
                    fullWidth
                />
              </Grid>
              {(!content || content.length === 0) &&
              <Grid xs={12} md={12} item>
                <TextField
                    id="password"
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    value={state.password}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>}
              <Grid xs={12} md={12} item>
                <FormControl className={classes.formControl} fullWidth variant="outlined">
                  <InputLabel id="user_type">Tipo</InputLabel>
                  <Select
                      labelId="user-type"
                      id="user_type"
                      name="user_type"
                      value={state.user_type || initialState.user_type || "listener"}
                      onChange={handleSelectChange}
                  >
                    <MenuItem value="listener">Espectador</MenuItem>
                    <MenuItem value="uploader">Artista</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained"  color="primary" onClick={handleOnConfirm}>
              {!content ? "Crear" : "Guardar"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}

export default UserModal;
