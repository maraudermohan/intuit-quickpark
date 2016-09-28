import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import GameArea from './GameArea.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      url : ''
    }
  }
  //Resets the state values for a new game
  resetGame() {
    this.props.dispatch(actions.log_out());
    document.getElementsByClassName("inputURL")[0].value = "";
    document.getElementsByClassName("disappear")[0].style.display = "block";
    document.getElementsByClassName("reset-btn")[0].style.display = "none";
    document.getElementsByClassName("timerh3")[0].style.display = "none";
    document.getElementsByClassName("timerh3")[0].style.display = "none";
  }

  disableBtn() {
    return (this.state.url.length)? false : true;
  }

  changeHandler(event) {
    this.setState({url : event.target.value});
  }
  //returns an array of spans-with-images as choices for the puzzle
  imageOptions(value , index) {
    if(!this.props.params.isImageSelected) {
      var position = {
        backgroundImage : "url("+value+")"
      }
      return <span key={index} data-url={value} className="image-item" style={position} onClick={this.imageClickHandler.bind(this,value)}></span>
    }
  }
  //Once an image choice is picked, updates the state and renders the GameArea
  imageClickHandler(url) {
    var dispatch = this.props.dispatch.bind(this),
    img = new Image();
    img.onload = function() {
      var winWidth = document.documentElement.clientWidth,
        ratio = this.width/this.height,
        width = (winWidth > 809)? 810 : (winWidth > 639)? 640 : 320,
        height = Math.floor(width/ratio);
      dispatch(actions.image_selected(true, url, width, height));
    }
    img.src = url;
    document.getElementsByClassName("disappear")[0].style.display = "none";
    document.getElementsByClassName("reset-btn")[0].style.display = "inline-block";
  }

  componentDidUpdate() {
    if(this.props.params.hasTimerStarted) {
      this.props.dispatch(actions.ackwldgeTimer(false));
      this.timerDisplay();
    }
    if((!this.props.params.timer.length)&&
    (document.getElementsByClassName("pause-btn")[0].style.display == "inline-block")) {
      document.getElementsByClassName("pause-btn")[0].style.display = "none";
      document.getElementsByClassName("timerh3")[0].style.display = "none";
    }
  }
  //toggle isNotPaused boolean value
  togglePause() {
    this.props.dispatch(actions.toggle_pause(!this.props.params.isNotPaused));
    if(this.props.params.isNotPaused){
      document.getElementsByClassName('pause-btn')[0].classList.add("resume");
    } else {
      document.getElementsByClassName('pause-btn')[0].classList.remove("resume");
      this.props.dispatch(actions.ackwldgeTimer(true));
    }
  }
  //countdown timer
  timerDisplay() {
      var secs = this.props.params.timer[1] - 1,
          mins = this.props.params.timer[0];
      if((secs == -1)&&(mins > 0)) {
        secs = 59;
        mins -= 1;
      }
      if(mins < 1) {
        document.getElementsByClassName("timerh3")[0].classList.toggle('red');
      }
      if((this.props.params.timer.length)&&(this.props.params.isNotPaused)){
        this.props.dispatch(actions.updateTimer(mins,secs));
        setTimeout(this.timerDisplay.bind(this),1000,true);
      }
  }
  //Render game area with the chosen-image's properties
  renderGameArea() {
    if(this.props.params.isImageSelected) {
      return <GameArea 
              resetGame={this.resetGame.bind(this)}
              />;
    }
  }

  render() {
    var timeRemaining = '',
        timerClassName = 'timerh3'
    if(this.props.params.timer.length) {
      var mins = this.props.params.timer[0] < 10 ? "0" + this.props.params.timer[0] : this.props.params.timer[0];
      timerClassName += this.props.params.timer[0] < 1 ? " red" : '';
      var secs = this.props.params.timer[1] < 10 ? "0" + this.props.params.timer[1] : this.props.params.timer[1];
      timeRemaining = mins+":"+secs;
    }
    return (
      <div className="appContainer">
          <div className="disappear">
              <h4>Pick an image below or import one with url :<br/><br/></h4>
              <input
                type="text"
                className="inputURL"
                placeholder="http://www.image.url"
                onChange={this.changeHandler.bind(this)} />
              <input
                type="submit"
                disabled={this.disableBtn()}
                value="Import"
                className="btn btn-primary"
                onClick={this.imageClickHandler.bind(this,this.state.url)} />
                <h4><br/>OR</h4>
          </div>
          <div className="appear flex-container">
              <input
                type="submit"
                value="Back"
                className="btn btn-primary reset-btn"
                onClick={this.resetGame.bind(this)} />
              <h1 className={timerClassName}>{timeRemaining}</h1>
              <span className="pause-btn flex-container" onClick={this.togglePause.bind(this)}>
                <span className="icon-pause pause1"></span>
                <span className="icon-pause pause2"></span>
              </span>
          </div>
          {this.props.params.links.map(this.imageOptions.bind(this)) }
          {this.renderGameArea()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(App);
