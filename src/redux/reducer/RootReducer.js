import { combineReducers } from 'redux';
import login from './LoginReducer';
import ChangeMainBarVisibleReducer from './ChangeMainBarVisibleReducer';
import SelectPlayingCityReducer from './SelectPlayingCityReducer';
import FindMovieTabChangeReducer from './FindMovieTabChangeReducer';

const rootReducer = combineReducers({
    login: login,
    changeMainBarVisibleReducer: ChangeMainBarVisibleReducer,
    selectPlayingCityReducer: SelectPlayingCityReducer,
    findMovieTabChangeReducer: FindMovieTabChangeReducer
});

export default rootReducer;