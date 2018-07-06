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
import Logout from "../containers/login/logout";

import RedirectAudio from "../containers/play/redirectAudio";
import Audio from "../containers/play/audio";

import Search from "../containers/song/search";
import CatAlbum from "../containers/song/catAlbum";
import SongsList from "../containers/song/songList";
import ChooseList from "../containers/song/chooseList";
import SingerList from "../containers/song/singerList";
import SingerAlbum from "../containers/song/singerAlbum";

import Barrage from "../containers/controller/barrage";
import AudioEffect from "../containers/controller/audioEffect";
import SongController from "../containers/controller/songController";

import VoiceSearch from "../containers/voiceSearch";

import Pay from "../containers/pay";
import PayMode from "../containers/pay/payMode";
import Recharge from '../containers/pay/recharge';
import Protocol from "../containers/pay/protocol";
import DeviceRegister from "../containers/pay/deviceRegister";
import RedirectPay from "../containers/forOldVersion/pay";

import Suggestions from "../containers/forOldVersion/suggestions";

import User from "../containers/user/index";
import Recordings from '../containers/user/recordings';
import EditRecord from '../containers/play/editRecord';
import PhotoAlbum from '../containers/user/photoAlbum';
import PhotoAlbumCrop from '../containers/user/photoAlbum/crop';
import Feedback from "../containers/user/feedback/index";
import OrderForm from "../containers/user/orderForm/index";
import InvoiceList from "../containers/user/orderForm/invoiceList";
import InvoiceOrder from "../containers/user/orderForm/invoiceOrder";
import InvoiceSubmit from "../containers/user/orderForm/invoiceSubmit";
import InvoiceDetail from "../containers/user/orderForm/invoiceDetail";
import InvoiceImage from "../containers/user/orderForm/invoiceImage";
import InvoiceOrderForDetail from "../containers/user/orderForm/invoiceOrderForDetail";
import InvoiceSubmitSuccess from "../containers/user/orderForm/invoiceSubmitSuccess";
import myOrder from "../containers/user/orderForm/myOrder";
import commentList from "../containers/comment/commentList";
import p1 from "../containers/product/p1";

const LoginContainer = () => (
    <Bundle load={Login}>
        {Component => <Component />}
    </Bundle>
);
const LogoutContainer = () => (
    <Bundle load={Logout}>
        {Component => <Component />}
    </Bundle>
);

const HomeContainer = () => (
    <Bundle load={Home}>
        {Component => <Component />}
    </Bundle>
);

const RedirectAudioContainer = () => (
    <Bundle load={RedirectAudio}>
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
const EditRecordContainer = () => (
    <Bundle load={EditRecord}>
        {Component => <Component />}
    </Bundle>
);

const PhotoAlbumContainer = () => (
    <Bundle load={PhotoAlbum}>
        {Component => <Component />}
    </Bundle>
);

const PhotoAlbumCropContainer = () => (
    <Bundle load={PhotoAlbumCrop}>
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

const payModeContainer = () => (
    <Bundle load={PayMode}>
        {Component => <Component />}
    </Bundle>
);

const rechargeContainer = () => (
    <Bundle load={Recharge}>
        {Component => <Component />}
    </Bundle>
);

const DeviceRegisterContainer = () => (
    <Bundle load={DeviceRegister}>
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
const InvoiceImageContainer = () => (
    <Bundle load={InvoiceImage}>
        {Component => <Component />}
    </Bundle>
);
const InvoiceOrderForDetailContainer = () => (
    <Bundle load={InvoiceOrderForDetail}>
        {Component => <Component />}
    </Bundle>
);
const myOrderContainer = () => (
    <Bundle load={myOrder}>
        {Component => <Component />}
    </Bundle>
);
const commentListContainer = () => (
    <Bundle load={commentList}>
        {Component => <Component />}
    </Bundle>
);
const ProductPage1 = () => (
    <Bundle load={p1}>
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
                *state: home/aliPaySuccess/aliPayFailed(页面状态)
                * openid: 用户微信openId
                * pollingId: OTT轮询id
                * deviceId: OTT设备id
                */}
                <Route path={`/pay/:state/:pollingId?/:deviceId?/:openid?`} component={RedirectPayContainer}/>
                <Route path={`/deviceRegister`} component={DeviceRegisterContainer}/>
                <Route path={`/pay`} component={PayContainer}/>
                <Route path={`/payMode`} component={payModeContainer}/>
                <Route path={`/recharge/:deviceUuid`} component={rechargeContainer}/>
                <Route path={`/protocol`} component={ProtocolContainer}/>
                <Route path={`/controller/`} exact component={SongControllerContainer}/>
                <Route path={`/controller/effect`} exact component={AudioEffectContainer}/>
                <Route path={`/controller/barrage`} exact component={BarrageContainer}/>
                <Route path={`/user`} exact component={UserContainer}/>
                <Route path={`/user/recordings`} exact component={RecordingsContainer}/>
                <Route path={`/editRecord/:shareId`} exact component={EditRecordContainer}/>

                /**
                * 录音播放页面
                * edit 是否可编辑 edit/play
                * uid 录音id
                */
                <Route path={`/recording/:edit/:uid/:shareId?`} component={RedirectAudioContainer}/>
                <Route path={`/recordingPlay/:uid/:shareId`} exact component={AudioContainer}/>

                <Route path={`/user/photoAlbum/:edit?/:maxNum?/:shareId?`} exact component={PhotoAlbumContainer}/>
                <Route path={`/user/crop/:dataUrl`} exact component={PhotoAlbumCropContainer}/>
                <Route path={`/user/myOrder`} exact component={myOrderContainer}/>
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
                <Route path={`/user/InvoiceImage/:url`} component={InvoiceImageContainer}/>
                <Route path={`/user/InvoiceOrderForDetail/:id`} component={InvoiceOrderForDetailContainer}/>
                {/*
                *state: home/webHome/success(页面状态)
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
                <Route path={`/logout`} component={LogoutContainer}/>
                <Route path={`/song/chooselist`} exact component={ChooseListContainer}/>
                <Route path={`/song/search/:keyword?`} exact component={SearchContainer}/>
                <Route path={`/singer/album`} exact component={SingerAlbumContainer}/>
                <Route path={`/singer/:id/:title`} exact component={SingerListContainer}/>
                <Route path={`/catAlbum`} exact component={CatAlbumContainer}/>
                <Route path={`/songs/:type/:id/:title?/:headImg?`} exact component={SongsListContainer}/>
                <Route path={`/voiceSearch`} exact component={VoiceSearchContainer}/>
                <Route path={`/comment/list/:uid/:shareId/:title?`} exact component={commentListContainer}/>

                <Route path={`/product/show/1`} exact component={ProductPage1}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    }
}
