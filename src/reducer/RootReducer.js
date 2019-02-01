import { combineReducers } from 'redux';
import login from './LoginReducer';

const rootReducer = combineReducers({
    login: login
});

export default rootReducer;