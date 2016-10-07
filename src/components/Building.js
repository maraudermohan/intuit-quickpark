import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import fetch from 'isomorphic-fetch';

class Building extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      building :'',
      jsonX : []
    }
  }

  componentDidMount() {
    var buildprops = this.props.buildprops;
    var splitJSON = this.splitJSON.bind(this);
         fetch("/api/parking/building", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            building: buildprops,
            accessible : this.props.params.isAccessible
          })
        }).then(response => response.json()).then(function(json) {
            splitJSON(json);
        }); 
  }

  splitJSON(json) {
      this.setState({jsonX : json});
  }

  submitHandler(lotname) {
    this.props.dispatch(actions.desiredSpot(lotname));
  }

  renderTile(value, index) {
      var disabled = (this.state.jsonX[index].occupied) ? true : false;
      var lotname = this.state.jsonX[index].lotname;
      var url = "http://maps.google.com/?q="+this.state.jsonX[index].lat+","+this.state.jsonX[index].long;
      return <input
                key={index}
                type="submit"
                disabled={disabled}
                value={this.state.jsonX[index].lotname}
                className="btn btn-primary parkinglot"
                onClick={this.submitHandler.bind(this, lotname)} />
  }

  render() {
    var classname = "building flex-container b" + this.props.buildprops;

    return (
      <div className={classname}>
        <h3 className="building-title">Building {this.props.buildprops} Spaces</h3>
        {this.state.jsonX.map(this.renderTile.bind(this))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(Building);