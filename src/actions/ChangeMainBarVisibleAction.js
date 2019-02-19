import * as ActionTypes from 'src/constant/ActionTypes';

export const ChangeMainBarVisibleAction = (visible) => {

    return {
        type: ActionTypes.CHANGE_MAIN_BAR_VISIBLE_ACTION,
        value: visible
    }
};