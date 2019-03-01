import * as ActionTypes from 'src/constant/ActionTypes';

export const FindMovieTabChangeAction = (refName) => {

    return {
        type: ActionTypes.FIND_MOVIE_TAB_CHANGE_ACTION,
        value: refName
    }
};