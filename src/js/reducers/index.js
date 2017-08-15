import { combineReducers } from 'redux';

import user from './user';
import common from './common';
import audio from './play/audio';
import songs from './songs';
import search from './search';
import photoAlbum from './user/photoAlbum';
import orderForm from './user/orderForm';
import feedback from './user/feedback';

let appReducer = combineReducers({
    user,
    common,
    audio,
    songs,
    search,
    photoAlbum,
    orderForm
});

export default appReducer;
