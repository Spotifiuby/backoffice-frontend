import React from "react";
import styles from "./styles.js";
import {
  Box, Collapse,
  makeStyles, Menu, MenuItem, Table, TableBody,
  TableCell, TableHead,
  TableRow, Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(styles);

const Row = ({row, columns, expandable}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  function getCellContent(column, value) {
    if (typeof value === 'function') {
      return (
        <IconButton onClick={value} >
          { column.icon === 'cancel' ? <CancelIcon color={'error'}/> : <VisibilityIcon/>}
        </IconButton>
      );
    } else {
      if (column.format && typeof value === 'number') {
        column.format(value)
      } else if (column.type && column.type === 'menu') {
        return buildMenu(value);
      } else if (column.type && column.type === 'image') {
        return <img alt="complex" src={value ? value : '/defualtUserProfilePicture.png'} style={{ maxWidth: column.maxWidth }} className={classes.img}/>;
      } else {
        return `${value}`;
      }
    }
  }

  function buildMenu(actions) {
    return <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            //maxHeight: ITEM_HEIGHT * 4.5,
            width: 'auto',
          },
        }}
      >
        {actions.map((option) => (
          <MenuItem key={option.name} onClick={option.action}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root} hover role="checkbox" tabIndex={-1}>
        {expandable &&
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setExpand(!expand)}>
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        }
        {columns.map((column) => {
          const value = row[column.id];
          const cellContent = getCellContent(column, value);
          return (
            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, maxWidth: column.maxWidth}}>
              {cellContent}
            </TableCell>
          );
        })}
      </TableRow>
      {expandable &&
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      }
    </React.Fragment>
  );
}

export default Row;
