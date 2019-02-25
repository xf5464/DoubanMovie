import { combineReducers } from 'redux';
import login from './LoginReducer';
import ChangeMainBarVisibleReducer from './ChangeMainBarVisibleReducer';
import SelectPlayingCityReducer from './SelectPlayingCityReducer';

const rootReducer = combineReducers({
    login: login,
    changeMainBarVisibleReducer: ChangeMainBarVisibleReducer,
    selectPlayingCityReducer: SelectPlayingCityReducer
});

export default rootReducer;