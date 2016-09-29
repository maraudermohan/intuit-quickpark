import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';

class FreeSpot extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    
    return (
      <div className="freespot">
          Free Car
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
