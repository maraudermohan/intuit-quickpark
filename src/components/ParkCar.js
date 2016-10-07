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
      arr : [],
      jsonAll : {},
      singleSpot : 0
    }
  }

  componentWillMount() {
    this.downloadAllSpots();
  }

  componentWillUnmount() {
    this.props.dispatch(actions.googleMapLoaded(false));
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

  componentDidUpdate() {
    if ((!this.props.params.googleMapLoaded)&&(this.state.jsonAll.length)&&(!this.props.params.desiredSpot)) {  
      this.initAllSpots();
    } else if (this.props.params.desiredSpot) {
      this.initOneSpot();
    }
  }

  downloadAllSpots() {
    var $this = this;
    fetch("/api/parking/allfreespots", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            accessible : this.props.params.isAccessible
          })
      }).then(response => response.json()).then(function(json) {
          if(json) {
              $this.setState({jsonAll : json});
          }
      });
  }

  initAllSpots() {
      var json = this.state.jsonAll,
          map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.43053, lng: -122.09682},
                zoom: 18
              });
      for(var x in json) {
          var lat = parseFloat(json[x].lat) ,
              long = parseFloat(json[x].long),
              lot = json[x].lotname.toString();
          var latLng = new google.maps.LatLng(lat,long);
          var marker = new google.maps.Marker({
            position: latLng,
            label:lot.charAt(lot.length-1),
            map: map
          });
      }
      this.props.dispatch(actions.googleMapLoaded(true));
  }

  initOneSpot() {
      $(".buildingcontainer").toggleClass("closed");
      $("#map").toggleClass("closed");
      setTimeout(() => {
        var json = this.state.jsonAll, $this = this;
        $(".parkcar .parkedSpot").addClass("visible");
        for(var x in json) {
            if(json[x].lotname == $this.props.params.desiredSpot) {
                var lat = parseFloat(json[x].lat) ,
                    long = parseFloat(json[x].long),
                    lot = json[x].lotname.toString();
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
            }
        }
      },600);
  }

  submitHandler() {
    var username = this.props.params.userName ;
    fetch("/api/user/park", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username, 
        parkedSpot : this.props.params.desiredSpot
      })
    }).then(response => console.log(response));
    this.submitHandler2();
  }
  submitHandler2() {
    var username = this.props.params.userName;   
    fetch("/api/parking/park", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lotname: this.props.params.desiredSpot, 
        occupied : username
      })
    }).then(response => console.log(response)); 
    this.props.dispatch(actions.login_user(username,this.props.params.isAccessible,this.props.params.desiredSpot));
    this.props.dispatch(actions.desiredSpot(0));
  }

  pickAnother() {
    $(".buildingcontainer").toggleClass("closed");
    $("#map").toggleClass("closed");
    $(".parkcar .parkedSpot").removeClass("visible");
    this.props.dispatch(actions.desiredSpot(0));
    this.props.dispatch(actions.googleMapLoaded(false));
  }

  toggleView() {
    if(!this.props.params.desiredSpot){
      $(".buildingcontainer").toggleClass("closed");
      $("#map").toggleClass("closed");
    }
  }

  renderBuilding(value, index) {
    return <Building key={value} buildprops={value} />
  }

  render() {
    var hintText = ((this.props.params.isAccessible)? "Accessible" : "Regular");
    hintText += ' parking spots : Pick an available (green-lit) spot that you intend to park at!';
    return (
      <div className="parkcar">
          <Header />
          <div className="twobuttons flex-container"> 
            <h3>{hintText}</h3>
          </div>
          <div className="map-container flex-container">
              <div className="buildingcontainer">
              {this.state.arr.map(this.renderBuilding.bind(this))}
              </div>
              <div className="sideButton flex-container" onClick={this.toggleView.bind(this)}>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <div id='map'></div>
              <div className="parkedSpot flex-container">
                  <h2>You intend to park at <br />{this.props.params.desiredSpot}</h2>
                  <div>
                  <input
                        type="submit"
                        value="Parked Successfully"
                        className="btn btn-primary freespace" 
                        onClick={this.submitHandler.bind(this)}/>
                  <input
                        type="submit"
                        value="Pick Another"
                        className="btn btn-secondary freespace"
                        onClick={this.pickAnother.bind(this)} />
                        </div>
              </div>
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
