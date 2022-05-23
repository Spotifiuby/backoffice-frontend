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
import {songsService} from "../../../../../services/SongsService";

const useStyles = makeStyles(styles);

const SongModal = ({open, handleClose, content}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [initialState, setInitialState] = React.useState({});
  const [fieldModified, setFieldModified] = React.useState({});

  React.useEffect(() => {
    if (content && content.id) {
      songsService.getSong(content.id, song => {
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

  const handleInputMultiValue = (event) => {
    setState({ ...state, [event.target.id]: event.target.value && event.target.value.split(",") });
    setFieldModified({ ...fieldModified, [event.target.id]: true });
  };

  const handleOnConfirm = () => {
    if (state && state.length !== 0) {
      songsService.updateSong(content.id, state, () => window.location.reload());
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
                Editar cancion
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
              <Grid xs={6} md={6} item>
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
                    id="artists"
                    label="Artistas"
                    variant="outlined"
                    value={fieldModified.artists ? (state.artists && state.artists.join(",")) : (initialState.artists && initialState.artists.join(","))}
                    onChange={handleInputMultiValue}
                    fullWidth
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                    id="genre"
                    label="Genero"
                    variant="outlined"
                    value={fieldModified.genre ? state.genre : initialState.genre}
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

export default SongModal;
