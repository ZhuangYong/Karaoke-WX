/**
 * Created by walljack@163.com on 2017/7/24.
 */
import { combineReducers } from 'redux';

import userInfo from './userInfo';
import feedback from './feedback';
import orderForm from './orderForm';
import photoAlbum from './photoAlbum';
import uploadImg from "./uploadImg";

let appReducer = combineReducers({
    userInfo,
    feedback,
    orderForm,
    photoAlbum,
    uploadImg
});

export default appReducer;
