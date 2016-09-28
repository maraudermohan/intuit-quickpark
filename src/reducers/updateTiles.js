export default function updateTiles(state = [], action) {
  switch (action.type) {
  	case 'UPDATE_TILE_PARAMS':
  		var obj = Object.assign({}, state);
  		obj[action.index] = {top : action.topCounter, left : action.leftCounter} 
  		return obj;

  	case 'MOVE_TILE':
  		var obj = Object.assign({}, state);
      obj[action.index] = {top : action.top, left : action.left} 
      return obj;

    default:
      return state;
  }
}