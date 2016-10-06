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

    default:
      return state;
  }
}
