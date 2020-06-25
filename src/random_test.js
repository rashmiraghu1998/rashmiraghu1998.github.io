import React,{ Component} from 'react'
import axios from 'axios'
export default class Random extends Component {
  // Added this:
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      items: [],
      courseCode: "16CS5DEPAJ",
      empty: true
    };
  }

  componentWillMount() {
   
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";

    console.log(this.state.courseCode)
    console.log(this.state.items)
    axios.get(apiBaseUrl+`course/`+this.state.courseCode+`/content`).then(res => {
      this.setState({items: res.data, empty: this.state.items==[]? false: true});
    });
  }

  
  render() {
    return (
      
      <ul>
        { this.state.empty && this.state.items[1].map(item =>
          <li key={item.id}>{item.name}</li>
        )}
      </ul>
      
    );
  }
}