import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import LoginPage from './LoginPage.js';
import ParkCar from './ParkCar.js';
import FreeSpot from './FreeSpot.js';
import fetch from 'isomorphic-fetch';


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location : ''
    }
  }

  componentDidMount() {
    if ((this.getCookie('userName'))&&(!this.props.params.userName)) {
        this.props.dispatch(actions.login_user(this.getCookie('userName')));
    var dispatch = this.props.dispatch,
    userName = this.getCookie('userName');
    fetch("/api/user", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userName
      })
    }).then(response => response.json()).then(function(json) {
        dispatch(actions.login_user(userName,json.isAccessible,json.parkedSpot));
    });
  }
  this.initGeolocation.bind(this);
  }
  initGeolocation() {
    if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successCallback.bind(this));
    } else {
            console.log('Geolocation is not supported');
    }
  }
 
  successCallback() {
      console.log("success");
      console.log(arguments[0]);
      var a = arguments[0].coords.latitude + " " + arguments[0].coords.longitude;
      this.props.dispatchsetState({location : a});
  }

  getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  userCurrentState() {
    console.log("checkpoint"+ this.props.params);
    console.log( this.props.params);
    if (!this.props.params.userName) {
        return <LoginPage />
    } else if (this.props.params.parkedSpot == 0 ) {
        return <ParkCar />
    } else {
        return <FreeSpot />
    }
  }

  bigLogo() {
    var position = {
        backgroundImage : "url('http://www.moreaboutmohan.com/files/assets/quickparkbig.png')"
    }
    console.log(!this.props.params.userName);
    if (!this.props.params.userName) {
        return <span className="quickparkbig" style={position} ></span>
    }
    
  }

  render() {
    return (
      <div className="flex-container app">
        {this.bigLogo()}
        {this.userCurrentState()}
      </div>
    );
  }
}

    function mapStateToProps(state) {
      return {
        params : state.params
      };
    }

    export default connect(mapStateToProps)(App);