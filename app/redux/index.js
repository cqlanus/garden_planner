import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import  { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import plants from './plants';
import weather from './weather';

const reducer = combineReducers({ user, plants, weather });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
const withDevTools = composeWithDevTools(middleware)
const store = createStore(reducer, withDevTools);

export default store;
export * from './user';
export * from './plants';
export * from './weather';