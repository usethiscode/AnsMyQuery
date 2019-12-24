import {createStore,applyMiddleware,compose } from 'redux';
import allReducer from './reducers';
import thunk from 'redux-thunk';

const initialState={}
const middleware =[thunk];
const store = createStore(allReducer, initialState,compose(
    applyMiddleware(...middleware)
    )
);

export default store;