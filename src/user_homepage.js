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
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoadDetails from './load_details.js'
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from "react-router-dom";
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import Course from './course'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import TagDetails from './tag_details'
import DeleteTags from './delete_tags'

import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MultipleValueTextInput from 'react-multivalue-text-input';
import Backdrop from '@material-ui/core/Backdrop';
import './user_page.css';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
const searchOptions = [{title: "tags"}, {title: "courses"}]

const useStyles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },

    label: {
      border: "5px solid transparent",
      padding: "10px",
      fontSize: "20px",
      width: "100%"
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.

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
  InputBase: {

    fontSize:22
  },
//style for font size
resize:{
  
},
modal: {
  position: "absolute",
  top: "0",
  left: "25%",
  right: "25%",
  width: "100%",
  height: "100%",

  // /* spacing as needed */
  padding: "5% 20% 20%",

  /* let it scroll */
 overflow: "auto",

  alignItems: 'center',
  justifyContent: 'center',
},
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),

    textAlign: 'center',
    color: theme.palette.text.secondary,
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
const courses1 = [];

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

class userhome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fireRedirect: false,
      redirect: "",
      name: "",
    
      showModal: false,
      isLoading: true,
      file: "",
      chapters: [],
      chapters2: [],
      tags: [],
      course_code: "",
      url_state_redirect: false,
      url: "/homepage",
      contentId: ""
      
    }

    this.searchByTag = this.searchByTag.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showContent = this.showContent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.personalTags = this.personalTags.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  
  }

  onChange (event){
    this.setState({tags: event.target.value})
  }


  getContent = async () => {
    let res = await axios.get(window.url_prefix+"/college/BMS/branch/CSE/sem/5/course/"+this.state.courseCode+"/content");
    let { data } = res.data;
    this.setState({ chapters: res.data , content: true});
  };
  

  handleClose(event) {
    console.log("I was pressed")
    this.setState({fireRedirect: false});
  };
  handleModalClose(event){
    this.setState({showModal: false})};

  callbackModal = () => {
      this.setState({ showModal: false });
   } 
    searchByTag() {
      var self = this;
      console.log(window.url_prefix)
      var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/content";
      console.log(this.state.tags.length===0);
      console.log(courses);
      if(!courses.length)
      {
        alert("Please enter atleast one tag...");
      }
      else{
      var payload={
        "tags": courses,
        "course_ids": courses1 
      }
      var header = { "Authorization": localStorage.getItem("bearer_token")};
      axios.post(apiBaseUrl,payload,  {
        headers: header}  )
      .then(function (response) {
      if(response.status == 200){
          console.log(response.data);

          self.setState({chapters: response.data.or, chapters2: response.data.and})

          console.log(self.state.chapters)
          console.log(self.state.chapters2)
       }
      })
      .catch(function (error) {
      console.log(error);
      alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
      self.setState({fireRedirect:true, url_state_redirect: true,  url: "/user" }); 
      // self.props.handleModalClose();
  
      });
      }
      }
  goToStore(v1, v2, v3, event) {
    var self = this;
    console.log(v1)
    console.log(v2)
    this.setState({fireRedirect: false,course_code: v1, contentId: v2, file: v3}); 
            
    localStorage.setItem("course_code", "")
    localStorage.setItem("contentId", "")
    localStorage.setItem("course_code", v1)
    localStorage.setItem("contentId", v2)
    console.log(this.state.course_code)
    console.log(this.state.contentId)
    
    this.showContent(event);  
    event.preventDefault();
  }
  
  goToStorePersonal(v1, v2, v3,  event) {
    var self = this;
        
    localStorage.setItem("course_code", "")
    localStorage.setItem("contentId", "")
    localStorage.setItem("course_code", v1)
    localStorage.setItem("contentId", v2)
    console.log(v1)
    console.log(v2)
    self.setState({fireRedirect: false,course_code: localStorage.getItem("course_code"), contentId: localStorage.getItem("contentId")}); 


    console.log(self.state.course_code)
    console.log(self.state.contentId)
    
    this.personalTags(v3, event);  
    event.preventDefault();
  }
  personalTags(val, event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    console.log(this.state.course_code)
    console.log(this.state.contentId)
    if(val == "delete"){
  self.setState({fireRedirect: true, redirect: <DeleteTags courseCode={localStorage.getItem("course_code")} contentId={localStorage.getItem("contentId")} handleModalClose={self.handleClose}/>});
    }
    else if(val == "add") {
      self.setState({fireRedirect: true, redirect: <TagDetails courseCode={localStorage.getItem("course_code")} contentId={localStorage.getItem("contentId")} handleModalClose={self.handleClose}/>});
    }
    event.preventDefault();
  }

  showContent(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
  self.setState({fireRedirect: true, redirect: <LoadDetails file={this.state.file} courseCode={localStorage.getItem("course_code")}  contentId={this.state.contentId}/>});    
    event.preventDefault();
  }

  toggleEditing(value1, value2, event){
    console.log(value1);
     console.log(value2);
}
  getRedirect(event){
    console.log(this.state.redirect)
  }
  render () {

    const { classes } = this.props;
    
    courses = this.state.courses;
 
    if(this.state.url_state_redirect)
    {
      return <Redirect to={this.state.url}/>
    }
        return (
    <React.Fragment>
      <HandlerToolbar/>
 
      {/* Hero unit */}

      <Container 
       component="main" className={classes.heroContent}>
        
 <Paper component="form" className={classes.root}>

    
    <br/>
    <Container>
    <Grid container >
    <Modal className={classes.modal}
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
    <Grid item  xs={5}>
    {/* <Grid item md={8} > */}
                <MultipleValueTextInput required width="100%"
                    onItemAdded={(item, allItems) => courses=allItems}
                    onItemDeleted={(item, allItems) =>  courses=allItems}
                    
                    placeholder="Tags: "
                />
                </Grid>
                <Grid item  xs={5}>
    {/* <Grid item md={8} > */}
                <MultipleValueTextInput width="100%"
                    onItemAdded={(item, allItems) => courses1=allItems}
                    onItemDeleted={(item, allItems) =>  courses1=allItems}
                    
                    placeholder="Courses: "
                />
                </Grid>
     
     <Grid item xs={2}>
      <IconButton className={classes.iconButton} onClick={this.searchByTag} align-center aria-label="search">
        <SearchIcon />
      </IconButton>
      </Grid>

      <Divider className={classes.divider} orientation="vertical" />
      </Grid>
      </Container>
    <br/>
    </Paper>

      </Container>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
      <Container  maxHeight="md" component="main">
      { Object.keys(this.state.chapters2).length ?null :<Typography variant="h5" align="center" color="textSecondary" component="p">
        Oops! Seems like your tags and/or courseId don't have anything in common... <br/>Try entering different search terms...
        </Typography>
        }
      {Object.keys(this.state.chapters2).map(key => 
    <Grid>
   
 
        {this.state.chapters2[key].map((tile) => (
          
       
       <Card>
              <CardHeader
                title={tile.name}
                subheader={tile.author}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}

              />
              <CardContent>
                <Typography color="textSecondary">
                 Tags: {tile.tags ? tile.tags.join(",") : null }
                 
                </Typography>
              </CardContent>
           
             <CardActions>
             <Button  value={tile.course_code, tile.id, tile.location}  color="primary" onClick={this.goToStore.bind(this,tile.course_code, tile.id, tile.location)} >
                    Load Details
                  </Button>

                  <Button  value={tile.course_code, tile.id, "add"}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id, "add")}>
                  Add Personal tags
                  </Button>


                  <Button  value={tile.course_code, tile.id, "delete"}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id, "delete")}>
                  Delete  tags
                  </Button>
    </CardActions>
            </Card>
         
        ))    
      }
   
      </Grid>          
    )}

   

<hr/>
</Container>

 

       { Object.keys(this.state.chapters).length?< Typography variant="h5" align="center" color="textSecondary" component="p">Check these out...
        </Typography>
        : null}


  { Object.keys(this.state.chapters).map(key => 
                 <Container  maxHeight="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
        {this.state.chapters[key].map((tile) => (
           
            <Grid item key={tile.contentId} md={4}>
              <Card>
              <CardHeader
                title={tile.name}
                subheader={tile.author}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}

              />
           
             <CardActions>    <Button  value={tile.course_code, tile.id, tile.location}  color="primary" onClick={this.goToStore.bind(this,tile.course_code, tile.id, tile.location)} >
                    Load Details
                  </Button>
                 
                  <Button  value={tile.course_code, tile.id}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id)}>
                  Add Personal tags
                  </Button>

                  <Button  value={tile.course_code, tile.id, "delete"}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id, "delete")}>
                  Delete  tags
                  </Button>
                 
    </CardActions>
            </Card>

            </Grid>
          ))}
        </Grid>
      </Container> 
       ) }
            
  
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
export default withStyles(useStyles)(userhome);