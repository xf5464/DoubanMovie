import * as ActionTypes from 'src/constant/ActionTypes';

let initState = {
    needHide: false
};

export default function ChangeMainBarVisibleReducer(state=initState, action) {

    switch(action.type) {
        case ActionTypes.CHANGE_MAIN_BAR_VISIBLE_ACTION:
            return {...state, needHide:action.value};
        default:
            return state;
    }
};