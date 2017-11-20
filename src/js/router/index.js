/**
 * Created by walljack@163.com on 2017/11/14.
 */
import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import NotFound from "../components/common/notfound";
import Bundle from "../components/Bundle";

import Home from "../containers/home";
import Login from "../containers/login";

import Audio from "../containers/play/audio";

import Search from "../containers/song/search";
import CatAlbum from "../containers/song/catAlbum";
import SongsList from "../containers/song/SongList";
import ChooseList from "../containers/song/chooseList";
import SingerList from "../containers/song/singerList";
import SingerAlbum from "../containers/song/singerAlbum";

import Barrage from "../containers/controller/barrage";
import AudioEffect from "../containers/controller/audioEffect";
import SongController from "../containers/controller/songController";

import VoiceSearch from "../containers/voiceSearch";

import Pay from "../containers/Pay";
import Protocol from "../containers/Pay/Protocol";
import RedirectPay from "../containers/forOldVersion/pay";

import Suggestions from "../containers/forOldVersion/suggestions";

import User from "../containers/user/index";
import Recordings from '../containers/user/recordings';
import PhotoAlbum from '../containers/user/photoAlbum';
import Feedback from "../containers/user/feedback/index";
import OrderForm from "../containers/user/orderForm/index";
import Preview from '../containers/user/photoAlbum/preview';
import InvoiceList from "../containers/user/orderForm/invoiceList";
import InvoiceOrder from "../containers/user/orderForm/invoiceOrder";
import InvoiceSubmit from "../containers/user/orderForm/invoiceSubmit";
import InvoiceDetail from "../containers/user/orderForm/invoiceDetail";
import InvoiceSubmitSuccess from "../containers/user/orderForm/invoiceSubmitSuccess";

const LoginContainer = () => (
    <Bundle load={Login}>
        {Component => <Component />}
    </Bundle>
);

const HomeContainer = () => (
    <Bundle load={Home}>
        {Component => <Component />}
    </Bundle>
);

const AudioContainer = () => (
    <Bundle load={Audio}>
        {Component => <Component />}
    </Bundle>
);

const ChooseListContainer = () => (
    <Bundle load={ChooseList}>
        {Component => <Component />}
    </Bundle>
);

const SongControllerContainer = () => (
    <Bundle load={SongController}>
        {Component => <Component />}
    </Bundle>
);
const UserContainer = () => (
    <Bundle load={User}>
        {Component => <Component />}
    </Bundle>
);
const SearchContainer = () => (
    <Bundle load={Search}>
        {Component => <Component />}
    </Bundle>
);
const SingerAlbumContainer = () => (
    <Bundle load={SingerAlbum}>
        {Component => <Component />}
    </Bundle>
);
const SingerListContainer = () => (
    <Bundle load={SingerList}>
        {Component => <Component />}
    </Bundle>
);
const CatAlbumContainer = () => (
    <Bundle load={CatAlbum}>
        {Component => <Component />}
    </Bundle>
);
const SongsListContainer = () => (
    <Bundle load={SongsList}>
        {Component => <Component />}
    </Bundle>
);
const RecordingsContainer = () => (
    <Bundle load={Recordings}>
        {Component => <Component />}
    </Bundle>
);

const PhotoAlbumContainer = () => (
    <Bundle load={PhotoAlbum}>
        {Component => <Component />}
    </Bundle>
);

const PreviewContainer = () => (
    <Bundle load={Preview}>
        {Component => <Component />}
    </Bundle>
);
const AudioEffectContainer = () => (
    <Bundle load={AudioEffect}>
        {Component => <Component />}
    </Bundle>
);
const BarrageContainer = () => (
    <Bundle load={Barrage}>
        {Component => <Component />}
    </Bundle>
);
const OrderFormContainer = () => (
    <Bundle load={OrderForm}>
        {Component => <Component />}
    </Bundle>
);

const FeedbackContainer = () => (
    <Bundle load={Feedback}>
        {Component => <Component />}
    </Bundle>
);

const VoiceSearchContainer = () => (
    <Bundle load={VoiceSearch}>
        {Component => <Component />}
    </Bundle>
);

const PayContainer = () => (
    <Bundle load={Pay}>
        {Component => <Component />}
    </Bundle>
);

const ProtocolContainer = () => (
    <Bundle load={Protocol}>
        {Component => <Component />}
    </Bundle>
);
const SuggestionsContainer = () => (
    <Bundle load={Suggestions}>
        {Component => <Component />}
    </Bundle>
);
const RedirectPayContainer = () => (
    <Bundle load={RedirectPay}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceOrderContainer = () => (
    <Bundle load={InvoiceOrder}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceListContainer = () => (
    <Bundle load={InvoiceList}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceSubmitContainer = () => (
    <Bundle load={InvoiceSubmit}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceSubmitSuccessContainer = () => (
    <Bundle load={InvoiceSubmitSuccess}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceDetailContainer = () => (
    <Bundle load={InvoiceDetail}>
        {Component => <Component />}
    </Bundle>
);

export default class router extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={`/`} exact component={HomeContainer}/>
                <Route path={`/home`} component={HomeContainer}/>
                {/*
                        *state: home/aliPaySuccess/aliPayFailed/deviceRegister(页面状态)
                        * openid: 用户微信openId
                        * pollingId: OTT轮询id
                        * deviceId: OTT设备id
                        */}
                <Route path={`/pay/:state/:pollingId?/:deviceId?/:openid?`} component={RedirectPayContainer}/>
                <Route path={`/pay`} component={PayContainer}/>
                <Route path={`/protocol`} component={ProtocolContainer}/>
                <Route path={`/controller/`} exact component={SongControllerContainer}/>
                <Route path={`/controller/effect`} exact component={AudioEffectContainer}/>
                <Route path={`/controller/barrage`} exact component={BarrageContainer}/>
                <Route path={`/user`} exact component={UserContainer}/>
                <Route path={`/user/recordings`} exact component={RecordingsContainer}/>
                <Route path={`/user/recordings/play/:uid`} component={AudioContainer}/>
                <Route path={`/user/photoAlbum`} exact component={PhotoAlbumContainer}/>
                {/*imgId: 预览图片id*/}
                <Route path={`/user/photoAlbumPreview/:imgId`} exact component={PreviewContainer}/>
                <Route path={`/user/orderForm`} exact component={OrderFormContainer}/>
                <Route path={`/user/invoiceOrder`} exact component={InvoiceOrderContainer}/>
                <Route path={`/user/invoiceList`} exact component={InvoiceListContainer}/>
                {/*
                        * ids: 待开票id
                        * totalMoney: 代开票总金额
                        */}
                <Route path={`/user/invoiceSubmit/:ids/:totalMoney`} component={InvoiceSubmitContainer}/>
                <Route path={`/user/invoiceSubmitSuccess`} component={InvoiceSubmitSuccessContainer}/>
                <Route path={`/user/InvoiceDetail/:id`} component={InvoiceDetailContainer}/>
                {/*
                        *state: home/success(页面状态)
                        *deviceId: 绑定设备号
                        * */}
                <Route path={`/user/feedback/:state/:deviceId?`} exact component={FeedbackContainer}/>
                <Route path={`/suggestions/suggestions.html`} exact component={SuggestionsContainer}/>
                {/*
                        *state: home/success/failed/invalid(页面状态)
                        *uuid: 扫码登录参数/用户微信unionId
                        * userId: 服务器给用户的id
                        * deviceId: 设备id
                        */}
                <Route path={`/login/:state/:uuid?/:userId?/:deviceId?`} component={LoginContainer}/>
                <Route path={`/song/chooselist`} exact component={ChooseListContainer}/>
                <Route path={`/song/search/:keyword?`} exact component={SearchContainer}/>
                <Route path={`/singer/album`} exact component={SingerAlbumContainer}/>
                <Route path={`/singer/:id/:title`} exact component={SingerListContainer}/>
                <Route path={`/catAlbum`} exact component={CatAlbumContainer}/>
                <Route path={`/songs/:type/:id/:title?/:headImg?`} exact component={SongsListContainer}/>
                <Route path={`/voiceSearch`} exact component={VoiceSearchContainer}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    }
}
