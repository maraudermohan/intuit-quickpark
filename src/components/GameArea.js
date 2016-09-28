import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import GameTiles from './GameTiles.js';

class GameArea extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  //Calculate the best possible tile-width, tile-height and number of tiles, based on the given properties
  componentDidMount() {
    var elm = document.getElementsByClassName("game-area")[0],
        rowLength, colLength, tileWidth, tileHeight, topCounter = 0, leftCounter = 0, arr= [];
    elm.style.width = this.props.params.width+"px";
    elm.style.height = this.props.params.height+"px";
    var temp = this.props.params.height/this.props.params.width*6;
    if((temp - Math.floor(temp)) < 0.4) {
      rowLength = 6;
    } else {
      temp = this.props.params.height/this.props.params.width*7;
      rowLength = 7;
    }
    colLength = Math.floor(temp);
    tileWidth = Math.floor(this.props.params.width/rowLength);
    tileHeight = Math.floor(this.props.params.height/colLength);
    this.props.dispatch(actions.updateRowCol(rowLength, colLength, tileWidth, tileHeight));
    for(var counter = 1; counter < (rowLength*colLength); counter++) {
        this.props.dispatch(actions.updateTileParams(counter,topCounter,leftCounter));
        arr.push(counter);
        if ((counter%rowLength) == 0) {
          topCounter += tileHeight;
          leftCounter = 0;
        }
        else {
          leftCounter += tileWidth;
        }
    }
    arr.push(rowLength*colLength);
    this.props.dispatch(actions.update_list(arr));
  }

  render() {
    return (
      <div className="well game-area not-ready flex-item">
          <GameTiles resetGame={this.props.resetGame.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(GameArea);
