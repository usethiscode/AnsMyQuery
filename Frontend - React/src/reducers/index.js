import errorReducer from './errorReducer';
import authReducer from './authReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    error: errorReducer,
    auth: authReducer
})


export default allReducers;