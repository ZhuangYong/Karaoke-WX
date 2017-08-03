import { combineReducers } from 'redux';

import user from './user';
import common from './common';
import audio from './play/audio';
import songs from './songs';
import search from './search';

let appReducer = combineReducers({
    user,
    common,
    audio,
    songs,
    search
});

export default appReducer;
