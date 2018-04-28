import { combineReducers } from 'redux';

import user from './user';
import common from './common';
import audio from './play/audio';
import songs from './songs';
import search from './search';
import pay from './pay';
import device from './device';
import comment from './comment';

let appReducer = combineReducers({
    user,
    common,
    audio,
    songs,
    search,
    pay,
    device,
    comment
});

export default appReducer;
