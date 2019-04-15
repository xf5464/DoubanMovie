import * as ActionTypes from 'src/constant/ActionTypes';

export const ChangeCityNameSearchVisibleAction = (visible) => {

    return {
        type: ActionTypes.CHANGE_SEARCH_CITY_POP_VISIBLE,
        value: visible
    }
};