import { combineReducers } from 'redux';

import user from './user';
import common from './common';
import audio from './play/audio';

let appReducer = combineReducers({
    user,
    common,
    audio
});

export default appReducer;
