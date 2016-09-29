import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import fetch from 'isomorphic-fetch';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userName :''
    }
  }

  setCookie(cname, cvalue, exdays) {
    var expires = "expires="+exdays;
    document.cookie = cname + "=" + cvalue + "; " + expires;
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
  
  changeHandler(event) {
    this.setState({userName : event.target.value});
  }

  disableBtn() {
    return (this.state.userName.length)? false : true;
  }
  //Once an image choice is picked, updates the state and renders the GameArea
  submitHandler(userName) {
    this.setCookie('userName',userName,1);
    this.props.dispatch(actions.login_user(userName));
    fetch('/api/user/create', { method : 'POST' , body: 'username=mohan1'}).then(response => console.log(response.json()));;
  }

  componentDidUpdate() {

  }
  

  render() {
    
    return (
      <div className="login-page">
              <h4>Tell us who you are : <br/><br/></h4>
              <input
                type="text"
                className="inputURL"
                placeholder="Intuit ID"
                onChange={this.changeHandler.bind(this)} />
              <input
                type="submit"
                disabled={this.disableBtn()}
                value="Import"
                className="btn btn-primary"
                onClick={this.submitHandler.bind(this,this.state.userName)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(LoginPage);