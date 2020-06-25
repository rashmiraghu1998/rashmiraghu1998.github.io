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
import UserSignup from './user_signup';
import axios from 'axios';
import AddStudents from './add_students';
import Backdrop from '@material-ui/core/Backdrop';
import CourseSignup from './course_signup';
import Assign from './assign';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

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

const types = [
  {
    title: 'Course Handlers',
    description: ['Create them.', 'Provide their details to', 'start using the platform'],
    buttonText: 'Start',
    buttonVariant: 'outlined',
    text: 'u',
    buttonValue: 'user'
  },
  {
    title: 'Students',
    description: ['Add them.', 'Provide email addresses', ' to invite them to the platform'],
    buttonText: 'Start',
    buttonVariant: 'outlined',
    text: 's',
    buttonValue: 'student'
  },
  {
    title: 'Courses',
    description: ['Create them.', 'Help the course handlers ','get started with courses'],
    buttonText: 'Start',
    buttonVariant: 'outlined',
    text: 'c',
    buttonValue: 'course'
  },
  {
    title: 'Assign',
    description: ['Assign','Start assigning',' courses to the course handlers. '],
    buttonText: 'Start',
    buttonVariant: 'outlined',
    text: 'a',
    buttonValue: 'assign'
  }
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


class home extends Component {
  constructor () {
    super();
    this.state = {
      fireRedirect: false,
    course: <CourseSignup/>,
    user: <UserSignup/>,
    assign: <Assign/>,
    redirect: "/homepage",
    showModal: false,
    open: false

    }
    this.goToStore = this.goToStore.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  goToStore(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    
    if(value=="c")
      this.setState({fireRedirect:true, redirect: <CourseSignup handleModalClose = {this.handleClose}/> });
    else if(value=="u")
      this.setState({fireRedirect: true, redirect: <UserSignup handleModalClose = {this.handleClose}/>});
    else if(value=="s")
      this.setState({fireRedirect: true, redirect: <AddStudents handleModalClose = {this.handleClose}/>});
    else 
      this.setState({fireRedirect: true, redirect: <Assign handleModalClose = {this.handleClose}/>});    

    event.preventDefault();
  }

  handleClose(event) {
    this.setState({fireRedirect: false});
  };
  handleModalClose = ()=>{
    this.setState({showModal: false})}

  render () {

    const { classes } = this.props;
    
        return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Admin
          </Typography>

          <Button href="/admin" color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>

        <Typography variant="h5" align="center" color="textSecondary" component="p">
        Please select one of these to proceed!!
        </Typography>
      </Container>
      
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {types.map(tier => (
            
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" value={tier.text} onClick={this.goToStore} >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
        <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.fireRedirect}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.fireRedirect} >
                <div className={classes.paper}>
                  {this.state.redirect}
                </div>
              </Fade>
            </Modal>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
    }
}
export default withStyles(useStyles)(home);