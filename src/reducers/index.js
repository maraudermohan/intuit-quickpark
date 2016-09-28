import { combineReducers } from 'redux'
import params from './updateParams'
import tiles from './updateTiles'
import list from './updateList'
import initialState from './initialState';

const appReducer = combineReducers({
  params,
  tiles,
  list
});

const resetStore = appReducer(initialState, {}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = resetStore
  }

  return appReducer(state, action)
}

export default rootReducer;