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
import {useNavigate} from "react-router-dom";
import {Utils} from "../../../../../utils/Utils";

const useStyles = makeStyles(styles);

const UsersFiltersModal = ({open, handleClose, content}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (content && content.length !== 0) {
      setState(content);
    }
  }, [content]);

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleOnConfirm = () => {
    console.log(state);
    if (state && state.length !== 0) {
      const query = Utils.usersFilters.reduce((prev, current) => {
        if (state[current]) {
          return `${prev}${(prev.length > 1 && '&') || ''}${current}=${state[current]}`;
        } else {
          return prev;
        }
      }, "?");
      console.log(query);
      navigate(`/users${query}`);
      window.location.reload();
    }
  };

  return (
      <React.Fragment>
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title" disableTypography={true}>
            <Typography variant="h4" component="div">
              <Box textAlign="left" m={1} mb={3} fontWeight="fontWeightBold">
                Filtrar Usuarios
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} item>
                <TextField
                    required
                    id="firstName"
                    label="Nombre"
                    variant="outlined"
                    value={state.firstName}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="lastName"
                    label="Apellido"
                    variant="outlined"
                    value={state.lastName}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={12} item>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={state.email}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={12} item>
                <FormControl className={classes.formControl} fullWidth variant="outlined">
                  <InputLabel id="userType">Tipo</InputLabel>
                  <Select
                      labelId="userType"
                      id="userType"
                      name="userType"
                      value={state.userType || ""}
                      onChange={handleSelectChange}
                  >
                    <MenuItem value="">Todos</MenuItem>
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
              Buscar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}

export default UsersFiltersModal;
