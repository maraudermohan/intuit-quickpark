export default function updateList(state = [], action) {
  switch (action.type) {
  	case 'UPDATE_LIST':
  		return action.content;

    default:
      return state;
  }
}