import React from "react";
import {
  Paper, Table, TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow, TableSortLabel,
} from "@material-ui/core";
import Row from "./Row/Row";

const CustomTable = ({ rows = [], columns = [], rowsPerPage = 10, page = 0, expandable }) => {
  const [orderBy, setOrderBy] = React.useState('id');
  const [order, setOrder] = React.useState('asc');
  const [actualRows, setActualRows] = React.useState(rows);
  const [actualPage, setActualPage] = React.useState(page);
  const [actualRowsPerPage, setActualRowsPerPage] = React.useState(rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setActualPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setActualRowsPerPage(+event.target.value);
    setActualPage(0);
  };

  const sort = (columnId) => {
    const newOrder = columnId === orderBy && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(columnId);
    setActualRows(actualRows.sort(
        (a, b) => ((a[columnId] < b[columnId]) ? -1 : (a[columnId] > b[columnId]) ? 1 : 0) * (newOrder === 'asc' ? 1 : -1)
    ));
  }

  React.useEffect(() => {
    setOrder('asc');
    setOrderBy('id');
    setActualPage(0);
    setActualRows(rows);
  }, [rows]);

  return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {expandable && <TableCell/>}
              {columns.map((column) => (
                  <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, }}
                  >
                    {column.sorting ? <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => sort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel> : column.label}
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {actualRows.slice(actualPage * actualRowsPerPage, actualPage * actualRowsPerPage + actualRowsPerPage).map((row, index) => (
                <Row key={index} row={row} columns={columns} expandable={expandable}/>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={actualRows.length}
            rowsPerPage={actualRowsPerPage}
            page={actualPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Entradas por página"}
            labelDisplayedRows={({ from, to, count }) =>`${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
        />
      </TableContainer>
  );
}

export default CustomTable;