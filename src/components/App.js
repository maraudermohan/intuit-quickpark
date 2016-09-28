import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import GameArea from './GameArea.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location : ''
    }
  }
  componentDidUpdate() {
    if(this.state.location) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          var a = "Geolocation is not supported by this browser.";
          this.setState({location : a});
      }
    }
  }
  showPosition(position) {
      var a  = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude; 
      this.setState({location : a});
  }

  render() {
    return (
      <div className="appContainer">
          {this.state.location}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App);
