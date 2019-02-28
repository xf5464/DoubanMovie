import * as ActionTypes from 'src/constant/ActionTypes';

export const SelectPlayingCityAction = (cityName) => {

    return {
        type: ActionTypes.SELECT_PLAYING_CITY_ACTION,
        value: cityName
    }
};