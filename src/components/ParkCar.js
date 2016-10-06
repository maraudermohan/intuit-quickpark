import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header.js';
import Building from './Building.js';
import $ from 'jquery';

class ParkCar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      arr : []
    }
  }

  componentDidMount() {
    var $this = this;
    fetch("/api/parking/distinctbuildings", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(function(json) {
        if(json) {
          var arr = [];
          arr.push(...json);
          $this.setState({arr:arr});
        }
      });
  }

  renderBuilding(value, index) {
    return <Building key={value} buildprops={value} />
  }

  listview() {
    $(".twobuttons .selected").removeClass('selected');
    $(".twobuttons .togglebutton2").addClass('selected');
    $(".mapcontainer").slideUp(150);
    $(".buildingcontainer").slideDown(300);
  } 
  mapview() {

    $(".twobuttons .selected").removeClass('selected');
    $(".twobuttons .togglebutton1").addClass('selected');
    $(".buildingcontainer").slideUp(150);
    $(".mapcontainer").slideDown(300);
  }


  render() {
    var hintText = 'List of all ' + ((this.props.params.isAccessible)? "" : 'non-');
    hintText += 'accessible spots. Pick one!';
    return (
      <div className="parkcar">
          <Header />
          <div className="twobuttons flex-container"> 
            <h3>{hintText}</h3>
            <span className="togglebutton togglebutton1 btn btn-primary selected" onClick={this.mapview}>MAP VIEW</span>
            <span className="togglebutton togglebutton2 btn btn-primary" onClick={this.listview}>LIST VIEW</span>
          </div>
          <iframe className="mapcontainer" src="https://www.google.com/maps/d/embed?mid=1yhWOQ0tTE2NmwdL4sAl5IvQWOaM" ></iframe>
          <div className="buildingcontainer">
          {this.state.arr.map(this.renderBuilding.bind(this))}
          </div>
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
