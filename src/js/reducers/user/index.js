/**
 * Created by Zed on 2017/8/18.
 */
import { combineReducers } from 'redux';

import feedback from './feedback';
import orderForm from './orderForm';
import photoAlbum from './photoAlbum';
import ottLogin from "./ottLogin";
import uploadImg from "./uploadImg";
import userConfig from "./userConfig";
import userInfo from "./userInfo";

let appReducer = combineReducers({
    feedback,
    orderForm,
    photoAlbum,
    ottLogin,
    uploadImg,
    userConfig,
    userInfo
});

export default appReducer;
