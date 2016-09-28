import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class GameTiles extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  resetGame() {
    this.props.resetGame();
  }

  componentDidUpdate() {
    this.shuffleCounter = parseInt(this.props.params.shuffleCounter,10);
    if(this.shuffleCounter > -1) {
      setTimeout(function() {document.getElementsByClassName("empty")[0].click()},250);
    }
  }

  renderTile(value , index) {
    var clickhandler, 
      clickClassName = "game-tile", 
      position = {
        top : this.props.tiles[value].top,
        left : this.props.tiles[value].left,
        width : this.props.params.tileWidth,
        height : this.props.params.tileHeight,
        backgroundPosition : "-"+this.props.tiles[value].left +"px -"+ this.props.tiles[value].top + "px",
        backgroundImage : "url("+ this.props.params.url +")",
        backgroundSize : this.props.params.width+"px "+this.props.params.height+"px"
      },
      index0 = this.props.list.indexOf(this.props.params.rowLength*this.props.params.colLength),
      indexV = this.props.list.indexOf(parseInt(value,10)),
      row = this.props.params.rowLength;
    if((indexV == index0-1)&&(index0%this.props.params.rowLength)) {
      return <span key={index} data-key={value} className="game-tile right" style={position} onClick={this.moveRightEvent.bind(this)}></span>
    }
    else if((indexV == index0+1)&&((index0+1)%this.props.params.rowLength)) {
      return <span key={index} data-key={value} className="game-tile left" style={position} onClick={this.moveLeftEvent.bind(this)}></span>
    }
    else if(indexV == (Math.floor(index0/row)+1)*row + (index0%row)) {
      return <span key={index} data-key={value} className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this)}></span>
    }
    else if(indexV == (Math.floor(index0/row)-1)*row + (index0%row)) {
      return <span key={index} data-key={value} className="game-tile bottom" style={position} onClick={this.moveBottomEvent.bind(this)}></span>
    }
    else {
      return <span key={index} data-key={value} className="game-tile" style={position}></span>
    }
  }

  moveLeftEvent() {
    var elm = document.getElementsByClassName("left")[0],
    id = elm.dataset.key,
    top = getComputedStyle(elm).getPropertyValue("top"),
    left = getComputedStyle(elm).getPropertyValue("left"),
    arr = [...this.props.list],temp;
    left = parseInt(left,10) - this.props.params.tileWidth;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.moveTile(id,top,left));
    }
    id = this.props.list.indexOf(parseInt(id,10));
    temp = arr[id];
    arr[id] = arr[id-1];
    arr[id-1] = temp;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.update_list(arr));
    }
  }

  moveRightEvent() {
    var elm = document.getElementsByClassName("right")[0],
    id = elm.dataset.key,
    top = getComputedStyle(elm).getPropertyValue("top"),
    left = getComputedStyle(elm).getPropertyValue("left"),
    arr = [...this.props.list],temp;
    left = parseInt(left,10) + this.props.params.tileWidth;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.moveTile(id,top,left));
    }
    id = this.props.list.indexOf(parseInt(id,10));
    temp = arr[id];
    arr[id] = arr[id+1];
    arr[id+1] = temp;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.update_list(arr));
    }
  }

  moveTopEvent() {
    var elm = document.getElementsByClassName("top")[0],
    id = elm.dataset.key,
    top = getComputedStyle(elm).getPropertyValue("top"),
    left = getComputedStyle(elm).getPropertyValue("left"),
    arr = [...this.props.list],temp,id2,
    row = this.props.params.rowLength;
    top = parseInt(top,10) - this.props.params.tileHeight;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.moveTile(id,top,left));
    }
    id = this.props.list.indexOf(parseInt(id,10));
    id2 = (Math.floor(id/row)-1)*row + (id%row);
    temp = arr[id];
    arr[id] = arr[id2];
    arr[id2] = temp;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.update_list(arr));
    }
  }

  moveBottomEvent() {
    var elm = document.getElementsByClassName("bottom")[0],
    id = elm.dataset.key,
    top = getComputedStyle(elm).getPropertyValue("top"),
    left = getComputedStyle(elm).getPropertyValue("left"),
    arr = [...this.props.list],temp,id2,
    row = this.props.params.rowLength;
    top = parseInt(top,10) + this.props.params.tileHeight;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.moveTile(id,top,left));
    }
    id = this.props.list.indexOf(parseInt(id,10));
    id2 = (Math.floor(id/row)+1)*row + (id%row);
    temp = arr[id];
    arr[id] = arr[id2];
    arr[id2] = temp;
    if(this.props.params.isNotPaused) {
      this.props.dispatch(actions.update_list(arr));
    }
  }

  shuffleTile() {
    var clickableTiles = [],
    min = 0, 
    max, 
    currentTile;
    this.shuffleCounter = parseInt(this.props.params.shuffleCounter,10);
    if(document.getElementsByClassName("left")[0]) {
      clickableTiles.push(this.moveLeftEvent.bind(this));
    }
    if(document.getElementsByClassName("right")[0]) {
      clickableTiles.push(this.moveRightEvent.bind(this));
    }
    if(document.getElementsByClassName("top")[0]) {
      clickableTiles.push(this.moveTopEvent.bind(this));
    }
    if(document.getElementsByClassName("bottom")[0]) {
      clickableTiles.push(this.moveBottomEvent.bind(this));
    }
    max = clickableTiles.length;
    currentTile = clickableTiles[Math.floor(Math.random()*(max-min))+min];
    currentTile();
    this.props.dispatch(actions.decrementCounter(this.shuffleCounter-1));
  }

  shuffleManager() {
    this.shuffleCounter = parseInt(this.props.params.shuffleCounter,10);
    if(this.shuffleCounter > 0) {
      this.shuffleTile();
    } else if (this.shuffleCounter == 0) {
      this.props.dispatch(actions.toggleGameReady());
      this.props.dispatch(actions.ackwldgeTimer(true));
      this.props.dispatch(actions.updateTimer(5,1));
      document.getElementsByClassName("timerh3")[0].style.display = "inline-block";
      document.getElementsByClassName("pause-btn")[0].style.display = "inline-block";
      this.props.dispatch(actions.decrementCounter(this.shuffleCounter-1));
      document.getElementsByClassName("game-area")[0].classList.remove("not-ready");
      document.getElementsByClassName("game-area")[0].classList.add("ready");
    }
  }

  stopTimer() {
    this.props.dispatch(actions.updateTimer(0,0));
  }
  
  gameConditionCheck() {
    var sortedList = [...this.props.list].sort((a,b) => (a-b));
    if(!(this.props.params.isGameReady)) {
      return <div className="game-banner shuffle flex-container"><h1 className="flex-items">Shuffling!<br/><br/>Ready in {this.props.params.shuffleCounter}...</h1></div>
    } else if((this.props.params.isGameReady)&&(JSON.stringify(this.props.list) === JSON.stringify(sortedList))) {
      setTimeout(function() {document.getElementsByClassName("stoptimer")[0].click()},50);
      return <div className="game-banner win flex-container" onClick={this.resetGame.bind(this)}><h1 className="flex-items">Puzzle solved!<br/><br/>You Win.</h1></div>
    } else if((this.props.params.isGameReady)&&(!this.props.params.timer.length)&&(JSON.stringify(this.props.list) != JSON.stringify(sortedList))) {
      return <div className="game-banner lose flex-container" onClick={this.resetGame.bind(this)}><h1 className="flex-items">Time's up!<br/><br/>You Lose.</h1></div>
    }
  }

  render() {
    return (
      <div>
        { Object.keys(this.props.tiles).map(this.renderTile.bind(this)) }
        <span className="game-tile empty" onClick={this.shuffleManager.bind(this)}></span>
        <span className="game-tile empty stoptimer" onClick={this.stopTimer.bind(this)}></span>
        {this.gameConditionCheck()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params,
    tiles : state.tiles,
    list : state.list
  };
}

export default connect(mapStateToProps)(GameTiles);
