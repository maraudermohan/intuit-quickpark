import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header.js';
import Building from './Building.js'

class ParkCar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      arr : [1,2,3,4]
    }
  }

  componentDidMount() {
    console.log("parking/park");
    fetch("/api/parking/park", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lotname: 204
      })
    });
  }

  renderBuilding(value, index) {
    return <Building key={value} buildprops={value} />
  }

  listview() {
    if(document.getElementsByClassName("mapcontainer")[0]) {
      document.getElementsByClassName("mapcontainer")[0].style.display = "none";
    }
    if(document.getElementsByClassName("buildingcontainer")[0]) {
      document.getElementsByClassName("buildingcontainer")[0].style.display = "block";
    }
  }


  render() {
    return (
      <div className="parkcar">
          <Header />
          <div className="twobuttons flex-container"> 
            <span className="togglebutton togglebutton1 btn btn-primary">MAP VIEW</span>
            <span className="togglebutton togglebutton2 btn btn-primary" onClick={this.listview()}>LIST VIEW</span>
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
