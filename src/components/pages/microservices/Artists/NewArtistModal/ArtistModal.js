import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles, TextField,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import {artistsService} from "../../../../../services/ArtistsService";

const useStyles = makeStyles(styles);

const ArtistModal = ({open, handleClose, content}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [initialState, setInitialState] = React.useState({});
  const [fieldModified, setFieldModified] = React.useState({});

  React.useEffect(() => {
    if (content && content.id) {
      artistsService.getArtist(content.id, song => {
        let initContent = {
          ...song
        }
        setInitialState(initContent);
        setOpenModal(open);
      })
    } else {
      setState({});
      setInitialState({});
      setOpenModal(false);
    }
  }, [content]);

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
    setFieldModified({ ...fieldModified, [event.target.id]: true });
  };

  // const handleInputMultiValue = (event) => {
  //   setState({ ...state, [event.target.id]: event.target.value && event.target.value.split(",") });
  //   setFieldModified({ ...fieldModified, [event.target.id]: true });
  // };

  const handleOnConfirm = () => {
    if (state && state.length !== 0) {
      artistsService.updateArtist(content.id, state, () => window.location.reload());
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
                Editar Artista
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={6} md={6} item>
                <TextField
                    required
                    id="id"
                    label="ID"
                    variant="outlined"
                    value={fieldModified.id ? state.id : initialState.id}
                    onChange={handleInputChange}
                    fullWidth
                    disabled
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="user_id"
                    label="Usuario"
                    variant="outlined"
                    value={fieldModified.user_id ? state.user_id : initialState.user_id}
                    onChange={handleInputChange}
                    fullWidth
                    disabled
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="name"
                    label="Titulo"
                    variant="outlined"
                    value={fieldModified.name ? state.name : initialState.name}
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="subscription_level"
                    label="Subscripcion"
                    variant="outlined"
                    value={fieldModified.subscription_level ? state.subscription_level : initialState.subscription_level}
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained"  color="primary" onClick={handleOnConfirm}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}

export default ArtistModal;
