import React from 'react';
import {
  Box, Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, Grid, makeStyles, TextField,
  Typography
} from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const CommentsModal = ({open, handleClose, content, onConfirm}) => {
  const classes = useStyles();

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
                Tipo de Nomenclador
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={12} item>
                <TextField
                    required
                    id="id"
                    label="ID"
                    variant="outlined"
                    disabled
                    value={content && content.id}
                />
              </Grid>
              <Grid xs={12} md={12} item>
                <TextField
                    id="description"
                    label="Descripción completa"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained"  color="primary" onClick={() => onConfirm()}>
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}

export default CommentsModal;