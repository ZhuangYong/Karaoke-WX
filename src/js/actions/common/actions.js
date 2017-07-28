import ActionTypes from '../actionTypes';

export function updateScreen() {
    return {
        type: ActionTypes.COMMON.COMMON_UPDATE_SCREEN,
        info: 'update screen w, h'
    };
}
