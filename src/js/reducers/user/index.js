/**
 * Created by walljack@163.com on 2017/7/24.
 */

import { combineReducers } from 'redux';

import feedback from "./feedback";
import orderForm from "./orderForm";
import photoAlbum from "./photoAlbum";
import uploadImg from "./uploadImg";
import userInfo from "./userInfo";
import userConfig from "./userConfig";
import ottLogin from "./ottLogin";

export default combineReducers({
    feedback,
    orderForm,
    photoAlbum,
    uploadImg,
    userConfig,
    userInfo,
    ottLogin
});
