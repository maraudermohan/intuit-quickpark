import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import fetch from 'isomorphic-fetch';
import $ from "jquery";

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
  
  checkDBForUser(userName) {
    var dispatch = this.props.dispatch;
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
        if(json == null) {
         fetch("/api/user/create", {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: userName,
                isAccessible: document.getElementById('checkbox').checked
              })
            }).then(function() {
              dispatch(actions.login_user(userName,document.getElementById('checkbox').checked,0));
            });
        }
        else {
         dispatch(actions.login_user(userName,json.isAccessible,json.parkedSpot));
        }
    });
  }

  submitHandler(userName) {
    this.setCookie('userName',userName,1);
    this.checkDBForUser(userName);    
  }

  componentDidUpdate() {

  }
  

  render() {
    
    return (
      <div className="login-page flex-container">
          <h4>Tell us who you are : <br/><br/></h4>
          <div className='flex-container'> 
            <input
              type="text"
              className="inputURL"
              placeholder="Intuit-ID or Guest-Name"
              onChange={this.changeHandler.bind(this)} />
            <input
              type="submit"
              disabled={this.disableBtn()}
              value="Sign In"
              className="btn btn-primary"
              onClick={this.submitHandler.bind(this,this.state.userName)} />
          </div>
          <div id='isAccessible-check'><input type='checkbox' id='checkbox'/>  Accessiblilty needed?</div>
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