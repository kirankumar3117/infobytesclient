import {
    legacy_createStore,
    combineReducers,
    compose,
    applyMiddleware,
  } from 'redux'

  
import thunk from 'redux-thunk'
import { GetGameData } from './gameplay.reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootreducer = combineReducers({
    getgamedata:GetGameData,
});


export const store = legacy_createStore(
    rootreducer,
    composeEnhancers(applyMiddleware(thunk)),
  )