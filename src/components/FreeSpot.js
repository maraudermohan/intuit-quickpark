import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header.js';

class FreeSpot extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  submitHandler () {
    var userName = this.props.params.userName;
    fetch("/api/user/free", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userName
      })
    }).then(response => response.json());
    this.props.dispatch(actions.login_user(this.props.params.userName,this.props.params.isAccessible,0));
  }
  render() {
    return (
      <div className="freespot flex-container">
          <Header />
          <h2>You car is parked at</h2>
          <h2>{this.props.params.parkedSpot}</h2>
          <input
                type="submit"
                value="Free the Space"
                className="btn btn-primary freespace"
                onClick={this.submitHandler.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(FreeSpot);
