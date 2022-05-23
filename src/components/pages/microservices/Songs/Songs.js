import React, {useCallback} from 'react';
import {
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import CustomTable from "../../../Table/Table";
import {songsService} from "../../../../services/SongsService";
import SongModal from "./NewSongModal/SongModal";

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
  { id: 'actions', label: '', type: 'menu', minWidth: 50, maxWidth: 50 },
];

const Songs = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});

  const handleClose = useCallback(() => {
    setOpenModal(false);
    setModalContent({});
  }, [openModal, modalContent]);

  function buildActions(result) {
    return [
      {
        name: 'Editar',
        'action': () => handleOpen(result)
      },
      {
        name: result.status && result.status !== 'inactive' ? 'Suspender' : 'Habilitar',
        'action': () => handleSetInactive(result, result.status && result.status !== 'inactive' ? 'inactive' : 'active')
      }
    ]
  }

  React.useEffect(() => {
    songsService.getSongs(songs => {
      let resultRows = songs.map(song => createData(song.id, song.name, song.artists, song.genre, song.status, new Date(song.date_created).toLocaleString("es-ES"), buildActions(song)))
      setRows(resultRows);
    })
  }, []);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleSetInactive = (result, value) => {
    songsService.updateSong(result.id, { status: value }, () => window.location.reload());
  };

  return (
      <React.Fragment>
        <Grid container className={classes.tableHeader}>
          <Grid item sm={12} md={6}>
            <Typography variant="h5" component="h5">
              Canciones
            </Typography>
          </Grid>
        </Grid>
        <CustomTable rows={rows} columns={columns} />
        <SongModal handleClose={handleClose} open={openModal} content={modalContent}/>
      </React.Fragment>
  );
}

export default Songs;