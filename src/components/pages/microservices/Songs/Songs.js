import React from 'react';
import {
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import CustomTable from "../../../Table/Table";
import {songsService} from "../../../../services/SongsService";

const useStyles = makeStyles(styles);

function createData(id, name, artists, genre, status, dateCreated, actions) {
  return {
    id,
    name,
    artists,
    genre,
    status,
    dateCreated,
    actions,
  };
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 20, maxWidth: 200, sorting: true },
  { id: 'name', label: 'Titulo', minWidth: 100, maxWidth: 200, sorting: true },
  { id: 'artists', label: 'Artistas', minWidth: 170, maxWidth: 300, sorting: true },
  { id: 'genre', label: 'Genero', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'status', label: 'Estado', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'dateCreated', label: 'Fecha Creacion', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'actions', label: '', type: 'menu', minWidth: 5, maxWidth: 5 },
];

const Songs = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = (changed = false) => {
    setOpenModal(false);
    /*if (changed) {
      window.location.reload();
    }*/
  };

  function buildActions(result) {
    return [
      {
        name: 'Editar',
        //'action': () => handleOpen({id: result.id}, 'edit')
      },
      {
        name: 'Suspender'
      }
    ]
  }

  React.useEffect(() => {
    songsService.getSongs(songs => {
      let resultRows = songs.map(song => createData(song.id, song.name, song.artists, song.genre, song.status, song.date_created, buildActions(song)))
      setRows(resultRows);
    })
  }, []);

  return (
      <React.Fragment>
        <Grid container className={classes.tableHeader}>
          <Grid item sm={12} md={6}>
            <Typography variant="h5" component="h5">
              Usuarios
            </Typography>
          </Grid>
        </Grid>
        <CustomTable rows={rows} columns={columns} />
      </React.Fragment>
  );
}

export default Songs;