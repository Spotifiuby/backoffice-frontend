const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  reasonItem: {
    padding: '1hv',
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '300px',
    height: '300px',
    'border-radius': '50%',
    "object-fit": "cover",
  },
  dialogActions: {
    marginTop: '30px',
  },
  root: {
    width: '100%',
    position: 'sticky'
  },
  container: {
    maxHeight: '100%',
  },
  accordion: {
    width: '100%',
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export default styles;
