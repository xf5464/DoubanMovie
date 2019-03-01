import * as ActionTypes from 'src/constant/ActionTypes';

let initState = {
    tabName: ""
};

export default function FindMovieTabChangeReducer(state=initState, action) {

    switch(action.type) {
        case ActionTypes.FIND_MOVIE_TAB_CHANGE_ACTION:
            return {...state, tabName:action.value};
        default:
            return state;
    }
};