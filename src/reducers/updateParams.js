import initialState from './initialState';
export default function updateParams(state = initialState, action) {
  switch (action.type) {
  	case 'LOGIN_USER':
		return Object.assign({},state,
			{userName : action.username},
			{isAccessible : action.isAccessible}, 
			{parkedSpot : action.parkedSpot });

	case 'UPDATE_ROW_COL':
		return Object.assign({},state,{rowLength : action.rowLength},{colLength : action.colLength},{tileWidth : action.tileWidth},{tileHeight : action.tileHeight});

	case 'DECREMENT_COUNTER':
		return Object.assign({},state,{shuffleCounter : action.counter})

	case 'TOGGLE_GAME_READY':
		return Object.assign({},state,{isGameReady : true})

	case 'IMAGE_SELECTED':
		return Object.assign({},state,{isImageSelected: action.isImageSelected}, 
								{url : action.url},
    							{width : action.width}, 
    							{height : action.height})

	case 'ACKNOWLEDGE_TIMER':
		return Object.assign({},state,{hasTimerStarted: action.bool})

	case 'TOGGLE_PAUSE':
		return Object.assign({},state,{isNotPaused: action.bool})

	case 'UPDATE_TIMER':
		if ((action.mins == 0)&&(action.secs == 0)) {
			return Object.assign({},state,{timer : ''})
		} else {
			return Object.assign({},state,{timer : [action.mins , action.secs]})
		}

    default:
      return state;
  }
}
