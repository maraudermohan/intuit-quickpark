import initialState from './initialState';
export default function updateParams(state = initialState, action) {
  switch (action.type) {
	case 'LOGIN_USER':
		return Object.assign({},state,
			{userName : action.username},
			{isAccessible : action.isAccessible}, 
			{parkedSpot : action.parkedSpot });

	case 'UPDATE_LOCATION':
		return Object.assign({},state,{location : action.content});

	case 'DESIRED_SPOT':
		return Object.assign({},state,{desiredSpot : action.content});

	case 'GOOGLE_SCRIPT':
		return Object.assign({},state,{googleScriptLoaded: action.bool});

	case 'GOOGLE_MAP':
		return Object.assign({},state,{googleMapLoaded: action.bool});

    default:
      return state;
  }
}
