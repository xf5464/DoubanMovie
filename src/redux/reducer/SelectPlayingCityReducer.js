import * as ActionTypes from 'src/constant/ActionTypes';

let initState = {
    cityName: "",
    showSearchCityPop: false
};

export default function SelectPlayingCityReducer(state=initState, action) {

    switch(action.type) {
        case ActionTypes.SELECT_PLAYING_CITY_ACTION:
            return {...state, cityName:action.value};
        case ActionTypes.CHANGE_SEARCH_CITY_POP_VISIBLE:
            return {...state, showSearchCityPop:action.value};
        default:
            return state;
    }
};