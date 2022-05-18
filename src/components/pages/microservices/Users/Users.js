import React, {useCallback} from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import CustomTable from "../../../Table/Table";
import {usersService} from "../../../../services/UsersService";
import UserModal from "./NewUserModal/UserModal";

const useStyles = makeStyles(styles);

function createData(id, email, name, lastName, type, active, actions) {
  return {
    id,
    email,
    name,
    lastName,
    type,
    active,
    actions,
  };
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 5, maxWidth: 10, sorting: true },
  { id: 'email', label: 'Mail', minWidth: 20, maxWidth: 100, sorting: true },
  { id: 'name', label: 'Nombre', minWidth: 20, maxWidth: 100, sorting: true },
  { id: 'lastName', label: 'Apellido', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'type', label: 'Tipo de usuario', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'active', label: 'Esta activo', minWidth: 5, maxWidth: 5, sorting: false },
  { id: 'actions', label: '', type: 'menu', minWidth: 5, maxWidth: 5 },
];

const Users = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState({
    new: false,
  });
  const [modalContent, setModalContent] = React.useState({});

  const handleClose = useCallback(() => {
    setOpenModal({
      new: false,
    });
    setModalContent({});
  }, [openModal, modalContent]);

  function buildActions(result) {
    return [
      {
        name: 'Editar',
        'action': () => handleOpen(result, 'new')
      },
      {
        name: result.user_type !== 'admin' ? 'Hacer administrador' : 'Revocar permisos',
        'action': () => handleGrantAdmin(result, result.user_type !== 'admin' ? 'admin' : 'listener')
      },
      {
        name: result.is_active ? 'Suspender' : 'Activar',
        'action': () => handleSetInactive(result, !result.is_active)
      }
    ]
  }

  React.useEffect(() => {
    usersService.getUsers(users => {
      let resultRows = users.map(user => createData(user.id, user.email, user.first_name, user.last_name, user.user_type, user.is_active, buildActions(user)))
      setRows(resultRows);
    })
  }, []);

  const handleOpen = (content, field) => {
    setOpenModal({
      ...openModal,
      [field]: true
    });
    setModalContent({
      [field]: content
    });
  };

  const handleSetInactive = (result, value) => {
    console.log(value);
    usersService.updateUser(result.email, { is_active: value }, () => window.location.reload());
  };

  const handleGrantAdmin = (result, value) => {
    usersService.updateUser(result.email, { user_type: value }, result => window.location.reload());
  };

  return (
      <React.Fragment>
        <Grid container className={classes.tableHeader}>
          <Grid item sm={12} md={6}>
            <Typography variant="h5" component="h5">
              Usuarios
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} >
            <Grid container justifyContent="flex-end">
              <Button variant="contained"  color="primary" onClick={() => handleOpen(null, "new")}>
                Crear Nuevo Usuario
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <CustomTable rows={rows} columns={columns} />
        <UserModal open={openModal.new}
                    handleClose={handleClose}
                    content={modalContent.new}
        />
      </React.Fragment>
  );
}

export default Users;