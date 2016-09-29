import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header.js';

class ParkCar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    
    return (
      <div className="parkcar">

          <Header />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(ParkCar);
