import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  setCookie(cname, cvalue, exdays) {

    var expires = "expires="+exdays;
    console.log(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  
  disableBtn() {
    return (this.props.params.userName.length)? false : true;
  }
  
  submitHandler() {
    var d = new Date("October 13, 2014 11:13:00");
    this.setCookie('userName' , "" , d);
  }

  smallLogo() {
    var position = {
        backgroundImage : "url('http://www.moreaboutmohan.com/files/assets/quickpark.png')"
    }
    return <span className="quickpark" style={position} ></span>
  }

  render() {
    return (
      <div className="header flex-container">
          <input
                type="submit"
                disabled={this.disableBtn()}
                value="Log Out"
                className="btn btn-primary logout"
                onClick={this.submitHandler.bind(this)} />
          {this.smallLogo()}
          <div></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(Header);
