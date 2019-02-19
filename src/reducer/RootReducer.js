import { combineReducers } from 'redux';
import login from './LoginReducer';
import ChangeMainBarVisibleReducer from './ChangeMainBarVisibleReducer';

const rootReducer = combineReducers({
    login: login,
    changeMainBarVisibleReducer: ChangeMainBarVisibleReducer
});

export default rootReducer;