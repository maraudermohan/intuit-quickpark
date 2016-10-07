import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import Header from './Header.js';
import $ from 'jquery';

class FreeSpot extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.dispatch(actions.googleMapLoaded(false));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.googleMapLoaded(false));
  }

  componentDidUpdate() {
    if(!this.props.params.googleMapLoaded) {
      this.initMap();
    }
  }

  initMap() {
    var $this = this;
    fetch("/api/parking/getspot", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lotname: this.props.params.parkedSpot
        })
      }).then(response => response.json()).then(function(json) {
          if(json) {
              var lat = parseFloat(json.lat) ,
                  long = parseFloat(json.long),
                  lot = json.lotname.toString();
              var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: long},
                zoom: 19
              });
              var latLng = new google.maps.LatLng(lat,long);
              var marker = new google.maps.Marker({
                position: latLng,
                label:lot.charAt(lot.length-1),
                map: map
              });
              $this.props.dispatch(actions.googleMapLoaded(true));
          }
      });
    
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
    this.submitHandler2();
  }

  submitHandler2 () {
    var userName = this.props.params.userName;
    fetch("/api/parking/free", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lotname: this.props.params.parkedSpot
      })
    }).then(response => response.json());
    this.props.dispatch(actions.login_user(this.props.params.userName,this.props.params.isAccessible,0));
  }

  render() {
    return (
      <div className="freespot flex-container">
          <Header />
          <div id='map'></div>
          <div className="parkedSpot flex-container">
              <h2>You car is parked at <br />{this.props.params.parkedSpot}</h2>
              <p>After taking the car out,</p>
              <input
                    type="submit"
                    value="Free the Space"
                    className="btn btn-primary freespace"
                    onClick={this.submitHandler.bind(this)} />
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

export default connect(mapStateToProps)(FreeSpot);
