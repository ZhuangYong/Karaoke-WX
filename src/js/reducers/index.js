import { combineReducers } from 'redux';

import user from './user';
import common from './common';
import audio from './play/audio';
import recordsList from './me/records';
import photoAlbumList from './me/photoAlbum';

let appReducer = combineReducers({
    user,
    common,
    audio,
    recordsList,
    photoAlbumList
});

export default appReducer;
