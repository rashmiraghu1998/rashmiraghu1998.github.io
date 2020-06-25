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
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import HandlerToolbar from './handler_toolbar';
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

const courses = [];

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

class Handlerhome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fireRedirect: false,
      redirect: "",
      name: "",
      courses: [],
      course_code: "",
      id: localStorage.getItem("emailId"),
      username: this.props.username
      
    }
    this.getCoursesByHandler();  
  }

  getCoursesByHandler() {
    var self = this;
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    var header = { "Authorization": localStorage.getItem("bearer_token")};
    console.log(localStorage.getItem("emailId"))
    axios.get(apiBaseUrl+"course?handler="+localStorage.getItem("emailId"),{
      headers: header}  )
    .then(function (response) {
    if(response.status == 200){
        console.log(response.data.courses);
        self.setState({courses: response.data.courses})
     }

    })
    .catch(function (error) {
    console.log(error);
    alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
    self.setState({redirect:true, url: "/handler" }); 
    self.props.handleModalClose();

    });
  
    }


  goToStore(v1, v2, event) {
    var self = this;
    console.log(v1)
    localStorage.setItem("course_name", v2);
    this.setState({fireRedirect: true,course_code: v1});   
    event.preventDefault();
  }

  getRedirect(event){
    console.log(this.state.redirect)
  }
  render () {

    const { classes } = this.props;
    courses = this.state.courses;
     if(this.state.fireRedirect){
            return   <Redirect to={"course/" + this.state.course_code } /> ;
     }
 
        return (
    <React.Fragment>
      <HandlerToolbar/>
 
      {/* Hero unit */}
     

      {this.state.courses.length?   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
      <Container  maxHeight="md" component="main">
        <Container maxWidth="sm" component="main" className={classes.heroContent}><Typography variant="h5" align="center" color="textSecondary" component="p">
        Please select one of these to proceed!!
        </Typography> 
      </Container>
        <Grid container spacing={5} alignItems="flex-end">
          {this.state.courses.map(tier => (
           
            <Grid item key={tier.name} md={4}>
              <Card>
                <CardHeader
                  title={tier.name}
                  subheader={tier.id}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                  maxHeight="30%"
                />
                {/* <CardContent>
                  
                  <ul>
                    {tier.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent> */}
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} value={tier.id, tier.name}  color="primary" onClick={this.goToStore.bind(this,tier.id, tier.name)} >
                    View
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>
      :null}
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

      </Container>
      {/* End footer */}
    </React.Fragment>
  );
    }
}
export default withStyles(useStyles)(Handlerhome);