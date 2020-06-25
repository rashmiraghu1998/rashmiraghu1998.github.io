import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CourseDetails from './course_details.js'
import UploadDetails from './upload_details.js'
import LoadDetails from './load_details.js'
import HandlerProfile from './handler_profile'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import './App.css'
import axios from 'axios';
import TagDetails from './tag_details';
import DeleteTags from "./delete_tags";
import Backdrop from '@material-ui/core/Backdrop';
import Tab from '@material-ui/core/Tab';
const useStyles = ((theme) => ({
  root: {
    display: 'container',
    flexWrap: 'wrap',

  
  },
  gridList: {
    flexWrap: 'wrap',

    overflowY: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.

  }
,
card:
{
  overflow: "auto"
},
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
  alignItems: 'center',
  padding: theme.spacing('10%', '20%', '20%'),
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
}));

class Course extends Component {
  signal = axios.CancelToken.source();
  constructor (props) {
    super(props);
    this.state = {
      fireRedirect: false,
    redirect: "/handler-homepage",
    showModal: false,
    isLoading: true,
    details: "",
    chapters: [],
    courseCode: props.match.params.courseCode,
    emailId: props.match.params.emailId,
    username: props.match.params.username,
    courseName: "",
    content: false, 
    url : "/homepage",
    open: false,
    contentId:"",
    }
    
    this.goToStore = this.goToStore.bind(this);
    this.uploadContent = this.uploadContent.bind(this);
    this.showContent = this.showContent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    // this.getContentByCourseId = this.getContentByCourseId.bind(this)
    // this.getContentByCourseId(this.state.courseCode);
    this.getContent();
    
  }

  componentDidMount() {
    this.setState({isLoading: false})
    // this.getContentByCourseId(this.state.courseCode);

      

}
getContent = async () => {
  let headers = {
    "Authorization": localStorage.getItem("bearer_token")
  }
  let res = await axios.get(window.url_prefix+"/college/BMS/branch/CSE/sem/5/course/"+this.state.courseCode+"/content", {headers: headers});
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
  goToStore(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    console.log(this.state.courseCode);
    this.setState({ fireRedirect: true, redirect: <CourseDetails handleClose={this.handleClose} course_code={localStorage.getItem("course_code")} course_name={this.props.name} />});    
    event.preventDefault();
  }

  uploadContent(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(self.state.redirect)
  self.setState({fireRedirect: true, redirect: <UploadDetails courseCode={this.state.courseCode} handleModalClose={this.handleClose}/>});   
     event.preventDefault();
  }

  showContent(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    console.log(self.props.code);
    console.log(self.props.name);
    console.log(self.state.redirect)
  self.setState({fireRedirect: true, redirect: <LoadDetails courseCode={this.state.courseCode}  file={value} contentId={this.state.contentId}/>});    
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

render(){

  
  
  const {classes} = this.props;
  // const Details =
  const details = this.state.chapters[1];

  console.log(this.state.chapters);
  console.log(this.state.content)
  
  console.log(details)
  return this.state.content?  <div className={classes.root}>  
    <HandlerProfile profile="course"></HandlerProfile>
    <br/>
    <br/>
    <br/>


<div>

<br/>
<Grid container spacing={3}>
<Grid item xs={8}>
       
      </Grid>
      <Grid>     
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

      </Grid>
      <Grid item xs={2}>
      <Button fullWidth  color="primary"  onClick={this.uploadContent}>
                 Upload content
                </Button>
      </Grid>
      <Grid item xs={2}>
      <Button fullWidth  color="primary" onClick={this.goToStore}>
                 View Course details
                </Button>
      </Grid>
  </Grid>


<Button fullWidth  color="primary"  >
 
</Button>


    {Object.keys(this.state.chapters).map(key => 
    <Grid>
    <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className={classes.heading}>Unit {key} </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        will put the syllabus for this unit here
      
      </Typography>

    </ExpansionPanelDetails>
  </ExpansionPanel>
   
  <GridList className={classes.gridList} cols={4}>
        {this.state.chapters[key].map((tile) => (
          <GridListTile className={classes.card} key={tile.id}>
       
       <Card className={classes.card}>
              <CardHeader
                
                title={tile.name}
                subheader={tile.author}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}

              />
               <CardContent>
                <Typography  numberOfLines={1} color="textSecondary">
                
                 Tags: {tile.tags ?  ( tile.tags.join(",").length > 50) ? 
    (((tile.tags.join(",")).substring(0,50-3)) + '...') : 
    tile.tags.join(",") : null }
                 
                </Typography>
              </CardContent>
           
           
             <CardActions>
               
      <Button size="small" className={classes.card} value={tile.location} onClick={this.showContent}>Learn More</Button>
      <Button  value={tile.course_code, tile.id, "delete"}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id, "delete")}>
                  Delete Tags
                  </Button>
                  <Button  value={tile.course_code, tile.id, "add"}  color="primary" onClick={this.goToStorePersonal.bind(this,tile.course_code, tile.id, "add")}>
                  Add Tags
                  </Button>
                    </CardActions>
            </Card>
          </GridListTile>
        ))}
      </GridList>
      </Grid>          
    )}



    </div>
    </div>: null;
 
    }
                    
}

export default withStyles(useStyles)(Course);