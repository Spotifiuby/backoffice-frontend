import React, {useCallback} from 'react';
import {
  FormControl,
  Grid, Input, InputAdornment, InputLabel,
  makeStyles,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import CustomTable from "../../../Table/Table";
import {artistsService} from "../../../../services/ArtistsService";
import ArtistModal from "./NewArtistModal/ArtistModal";
import IconButton from "@material-ui/core/IconButton";
import {Search} from "@material-ui/icons";

const useStyles = makeStyles(styles);

function createData(id, name, user_id, subscription_level, actions) {
  return {
    id,
    name,
    user_id,
    subscription_level,
    actions
  };
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 20, maxWidth: 200, sorting: true },
  { id: 'name', label: 'Titulo', minWidth: 100, maxWidth: 200, sorting: true },
  { id: 'user_id', label: 'Usuario', minWidth: 170, maxWidth: 300, sorting: true },
  { id: 'subscription_level', label: 'Subscripcion', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'actions', label: '', type: 'menu', minWidth: 50, maxWidth: 50 },
];

const Artists = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});
  const [search, setSearch] = React.useState("");

  const handleClose = useCallback(() => {
    setOpenModal(false);
    setModalContent({});
  }, []);

  function buildActions(result) {
    return [
      {
        name: 'Editar',
        'action': () => handleOpen(result)
      },
      // {
      //   name: result.status && result.status !== 'inactive' ? 'Suspender' : 'Habilitar',
      //   'action': () => handleSetInactive(result, result.status && result.status !== 'inactive' ? 'inactive' : 'active')
      // }
    ]
  };

  React.useEffect(() => {
    artistsService.getArtists(null, artists => {
      let resultRows = artists.map(artist => createData(artist.id, artist.name, artist.user_id, artist.subscription_level, buildActions(artist)))
      setRows(resultRows);
    })
  }, []);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  // const handleSetInactive = (result, value) => {
  //   artistsService.updateArtist(result.id, { status: value }, () => window.location.reload());
  // };

  const handleOnChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleOnSearch = () => {
    artistsService.getArtists(search, artists => {
      let resultRows = artists.map(artist => createData(artist.id, artist.name, artist.user_id, artist.subscription_level, buildActions(artist)))
      setRows(resultRows);
    })
  };

  return (
      <React.Fragment>
        <Grid container className={classes.tableHeader}>
          <Grid item sm={12} md={6}>
            <Typography variant="h5" component="h5">
              Artistas
            </Typography>
          </Grid>
          <Grid item sm={12} md={6}>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl >
              <InputLabel htmlFor="search-artists">Buscar</InputLabel>
              <Input
                  id="search-artists"
                  type="text"
                  value={search}
                  onChange={handleOnChangeSearch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleOnSearch}
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>
          </Grid>
        </Grid>
        <CustomTable rows={rows} columns={columns} />
        <ArtistModal handleClose={handleClose} open={openModal} content={modalContent}/>
      </React.Fragment>
  );
}

export default Artists;