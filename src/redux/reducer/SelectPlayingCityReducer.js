import * as ActionTypes from 'src/constant/ActionTypes';

let initState = {
    cityName: ""
};

export default function SelectPlayingCityReducer(state=initState, action) {

    switch(action.type) {
        case ActionTypes.SELECT_PLAYING_CITY_ACTION:
            return {...state, cityName:action.value};
        default:
            return state;
    }
};