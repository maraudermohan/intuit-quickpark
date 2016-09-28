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

  initGeolocation() {
    console.log("hello");
    if (navigator && navigator.geolocation) {
      console.log("if");
            navigator.geolocation.getCurrentPosition(this.successCallback.bind(this));
    } else {
            console.log('Geolocation is not supported');
    }
  }
 
  successCallback() {
      console.log(arguments[0]);
      var a = arguments[0].coords.latitude + " " + arguments[0].coords.longitude;
      this.setState({location : a});
  }

  render() {
    return (
      <div className="appContainer">
        {this.state.location}
        <input
          type="submit"
          value="Import"
          className="btn btn-primary"
          onClick={this.initGeolocation.bind(this)} />
      </div>
    );
  }
}

    function mapStateToProps(state) {
      return {
      };
    }

    export default connect(mapStateToProps)(App);
