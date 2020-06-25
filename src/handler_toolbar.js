import React, { Component } from "react"
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Redirect } from "react-router-dom";
import Course from './course'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        XkilUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  Card: {
    minHeight: '20%',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
});

const courses = [
  {
    title: 'Design and analyses of algorithms',
    description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
    buttonVariant: 'outlined',
    Coursecode: '86878',
    Coursename: "raosuj"
  },
  {
    title: 'Data science using R',
    description: ['Course to give a gist of', 'Data analytics, solutions, questions around them ', 'and much more'],
    buttonVariant: 'outlined',
    Coursecode: '16cs089DSR',
    Coursename: 'hjadhjjf'
  },
  {
    title: 'Data structures',
    description: ['Course to give a gist of', 'stack', ', queues and much more'],
    buttonVariant: 'outlined',
    Coursecode: '16cs089PSQ',
    Coursename: 'judsjfkdsjkf'
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'Motivation', 'Contact us'],
  },
  {
    title: 'Features',
    description: ['What students can do', 'What college can do', 'What we do'],
  }

];


class HandlerToolbar extends Component {
    


  render () {

    const { classes } = this.props;
 
        return (
            
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          </Typography>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>

          </Button>
        
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
    
      {/* End footer */}
    </React.Fragment>
  );
    }
}
export default withStyles(useStyles)(HandlerToolbar);