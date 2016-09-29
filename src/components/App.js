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
    }
    fetch('/api/user/all', { method : 'POST'}).then(response => response.json()).then(function(json) {
    for (var x in json) {
      console.log(json[x]);
    }
    });
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
    if (!this.props.params.userName) {
        return ([this.bigLogo(),
          <LoginPage />])
    } else if (this.props.params.ParkedSpot == 0 ) {
        return <ParkCar />
    } else {
        return <FreeSpot />
    }
  }

  bigLogo() {
    var position = {
        backgroundImage : "url('http://www.moreaboutmohan.com/files/assets/quickparkbig.png')"
    }
    return <span className="quickparkbig" style={position} ></span>
  }

  render() {
    return (
      <div className="flex-container app">
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