import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs, Typography
} from "@material-ui/core";
import styles from "./styles";
import CustomTable from "../../../Table/Table";
import {usersService} from "../../../../services/UsersService";

const useStyles = makeStyles(styles);

function createData(id, description, definition, enabled, consensus, actions) {
  return {
    id,
    description,
    definition,
    enabled,
    consensus,
    actions,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 5, maxWidth: 10, sorting: true },
  { id: 'description', label: 'Descripción completa', minWidth: 100, maxWidth: 200, sorting: true },
  { id: 'definition', label: 'Definición o Alcance', minWidth: 170, maxWidth: 300, sorting: true },
  { id: 'enabled', label: 'Habilitado', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'consensus', label: 'Consensuado', minWidth: 20, maxWidth: 20, sorting: false },
  { id: 'actions', label: '', type: 'menu', minWidth: 5, maxWidth: 5 },
  { id: 'forum', label: '', minWidth: 5, maxWidth: 5 },
];

const Users = () => {
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
        name: 'Hacer administrador'
      },
      {
        name: 'Suspender'
      }
    ]
  }

  React.useEffect(() => {
    usersService.getUsers(users => {
      let resultRows = users.map(user => createData(user.id, user.username, user.first_name, user.last_name, user.user_type, buildActions(user)))
      setRows(resultRows);
    })
    /*const response = [
      createData(0, "Nom sin tipo", "Nomencladores que aún no se han podido encuadrar en ningun tipo.", "Si", "Si", buildActions({id: 0})),
      createData(1, "Nom de espacios físicos", "Nomencladores para caracterizar espacios fìsicos: aulas, laboratorios, oficinas, gimnasios, baños, salones, etc. ", "Si", "No", buildActions({id: 1})),
      createData(2, "Nom de medios de comunicación", "Nomencladores para caracterizar tipo de teléfonos, mails, y otras formas de comunicación", "No", "No", buildActions({id: 2})),
      createData(3, "Nom de unidades de tiempo", "Nomencladores para caracterizar unidades de tiempo: frecuencias, días de la semana, etc.", "Si", "No", buildActions({id: 3})),
      createData(4, "Nom de cargos docentes", "Nomencladores para caracterizar cargos docentes", "No", "Si", buildActions({id: 4})),
    ];
    setRows(response);*/
  }, []);

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
              <Button variant="contained"  color="primary" onClick={() => setOpenModal(true)}>
                Crear Nuevo Tipo
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <CustomTable rows={rows} columns={columns} />
      </React.Fragment>
  );
}

export default Users;