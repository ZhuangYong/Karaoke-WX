import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {dynaPush, isLongWordLanguage, linkTo, reqHeader} from "../../utils/comUtils";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {getChooseList, getHistorySongList, push, pushLocal, setSongTop} from "../../actions/audioActons";

import {CircularProgress, List, ListItem, Paper, Snackbar, Tab, Tabs} from "material-ui";
import ReloadIcon from "material-ui/svg-icons/action/autorenew";
import NextIcon from "material-ui/svg-icons/av/skip-next";
import SongItem from "../../components/common/SongItem";
import BarrageIcon from "../../../img/common/icon_barrage.png";
import EffectIcon from "../../../img/common/icon_effect.png";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import PlayStopIcon from "../../../img/controller/play_stop.png";
import YuanBanIcon from "../../../img/controller/yuan_ban.png";
import DelIcon from "../../../img/common/icon_un_top.png";
import SetTopIcon from "../../../img/common/icon_set_top.png";
import NoResult from "../../components/common/NoResult";
import GifPlayIng from "../../../img/common/gif_playing.png";
import GifPlayStop from "../../../img/common/gif_playstop.png";
import VIPIcon from "../../../img/common/icon_vip.png";
import Const from "../../utils/const";
import NoWifi from "../../components/common/NoWifi";
import NoNetworkImg from "../../../img/common/bg_no_network.png";
import ActionTypes from "../../actions/actionTypes";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import intl from 'react-intl-universal';
import MallImg from "../../../img/mall/me.png";

const longLan = isLongWordLanguage();
const style = {
    controllerPan: {
        position: 'absolute',
        top: 0,
        marginBottom: "2.2rem",
        display: "flex",
        width: "100%",
        flexWrap: "wrap"
    },
    controllerBtn: {
        width: "50%",
        height: "3.2rem",
        maxHeight: 170,
        textAlign: "center",
        marginTop: "0",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        button: {
            backgroundColor: '#ffc51b',
            width: '1.867rem',
            height: '1.867rem',
            maxWidth: 100,
            maxHeight: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1.867rem'
        },
        label: {
            margin: '.3rem 0',
            fontSize: '.4rem'
        }
    },
    extArea: {
        border: "none",
        boxShadow: "none",
        width: "100%",
        display: "flex",
        padding: '0 1.4rem',
        justifyContent: "center",
        btn: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ff6832",
            borderRadius: '1rem',
            width: '2.2rem',
            height: '1.2rem',
            icon: {
                width: ".5rem",
                marginRight: '.1rem'
            },
            label: {
                margin: 0,
                fontSize: longLan ? '.3rem' : '.45rem',
                color: "#ff6832"
            }
        }
    },
    tabs: {
        leftTab: {
            flexDirection: "row",
            height: '.933rem',
            border: "1px solid white",
            borderRadius: "6px 0 0 6px"
        },
        centerTab: {
            flexDirection: "row",
            height: '.933rem',
            borderTop: "1px solid white",
            borderBottom: "1px solid white"
        },
        rightTab: {
            flexDirection: "row",
            height: '.933rem',
            border: "1px solid white",
            borderRadius: "0 6px 6px 0"
        }
    },
    chooseList: {
        operationArea: {
            height: '100%',
            width: '2rem',
            display: "flex",
            top: "0",
            right: '.4rem'
        },
        deleteButton: {
            delIng: {
                fontSize: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex"
            }
        }
    }
};
const UPDATE_CHOOSE_SONG_TIME_COUNT = 5;
const UPDATE_HISTORY_SONG_TIME_COUNT = 60 * 3;
const PLAY_CONTROLLER_RE_SING = 5;
const PLAY_CONTROLLER_ORIGINAL_ACCOMPANY = 6;
const PLAY_CONTROLLER_PAUSE_PLAY = 7;
const PLAY_CONTROLLER_NEXT = 8;

class SongController extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.controller"));
        this.state = {
            playList: [],
            historySongList: [],
            controllerIng: {},
            tabIndex: 0,
            setTopSongIdIng: 0,
            delChooseSongIdIng: {},
            updateChooseSongsCount: 0,
            updateHistorySongCount: 0,
            emptyChooseSongs: false,
            barrageSendToast: '',
            barrageToastMsg: '',
            offLine: false
        };
        this.songName = this.songName.bind(this);
        this.unChoose = this.unChoose.bind(this);
        this.showAudioEffect = this.showAudioEffect.bind(this);
        this.playController = this.playController.bind(this);
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
        this.handelChangeTab = this.handelChangeTab.bind(this);
        this.songListButtons = this.songListButtons.bind(this);
        this.songSetTopButton = this.songSetTopButton.bind(this);
        this.chooseSongList = this.chooseSongList.bind(this);
        this.historySongList = this.historySongList.bind(this);
        this.updateChooseSongList = this.updateChooseSongList.bind(this);
        this.updateHistorySongList = this.updateHistorySongList.bind(this);
        this.updateChooseSongListTimer = this.updateChooseSongListTimer.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.songs.chooseListStamp !== this.props.songs.chooseListStamp) {
            this.updateSong();
        }
        if (preProps.songs.getHistorySongListStamp !== this.props.songs.getHistorySongListStamp) {
            this.updateHistorySong();
        }
        if (preProps.userInfo.userInfoStamp !== this.props.userInfo.userInfoStamp) {
            const {userInfo} = this.props;
            const isBindDevice = this.isBindDevice(userInfo.userInfoData);
            if (isBindDevice === true) {
                this.updateChooseSongList();
                this.updateChooseSongListTimer();
                this.updateHistorySongList();
            } else {
                this.setState({
                    unBindDevice: true
                });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.updateChooseSongsInterval);
    }

    componentDidMount() {
        const {userInfo} = this.props;
        const isBindDevice = this.isBindDevice(userInfo.userInfoData);
        if (isBindDevice === true) {
            this.updateChooseSongList();
            this.updateChooseSongListTimer();
            this.updateHistorySongList();
        } else {
            this.setState({
                unBindDevice: true
            });
        }
    }

    render() {
        const {playList, historySongList} = this.state;
        // const playListStr = JSON.stringify(playList || {});
        const {w, h} = this.props.common;
        let tabContainerHeight = '10rem';
        const playingSong = this.state.playingSong;
        let backgroundColor = ['transparent', 'transparent', 'transparent'];
        let fontColor = ['white', 'white', 'white'];
        backgroundColor[this.state.tabIndex] = "white";
        fontColor[this.state.tabIndex] = "#ff6832";
        let extAreaMarginTop = (h / w) < 1.4 ? "0" : ".6rem";
        let controllerButtonsMarginTop = (h / w) < 1.4 ? "2.5rem" : "2.6rem";
        if (w >= 768 && h > w) {
            controllerButtonsMarginTop = '3.6rem';
            extAreaMarginTop = '.1rem';
        }
        if (h < w) {
            tabContainerHeight = '6rem';
        }
        if (h < w && h < 768) {
            extAreaMarginTop = '-.1rem';
        }
        return (
            <div>
                {/*<div style={{position: 'absolute', width: "100%", height: 500, fontSize: 10, overflow: 'auto', zIndex: 5}}>
                    {
                        playListStr
                    }
                </div>*/}
                <img src={NoNetworkImg} style={{display: 'none'}}/>
                <SearchHeadFake grayTheme={"gray"}/>
                <Tabs
                    inkBarStyle={{display: "none"}}
                    tabItemContainerStyle={{display: "-webkit-flex", top: 0, zIndex: 999, position: 'fixed', alignItems: 'center !important', background: '-webkit-gradient(linear, 0 100, 283 0, from(#ff6932), to(#ff8332))', height: '1.2rem', backgroundColor: "#ff8333", padding: ".1rem 10%"}}
                >
                    <Tab
                        selected={this.state.tabIndex === 0}
                        onActive={() => {
                            this.handelChangeTab(0);
                        }}
                        buttonStyle={{...style.tabs.leftTab, backgroundColor: backgroundColor[0], color: fontColor[0]}}
                        label={
                            <div style={{fontSize: longLan ? '.3rem' : '.4rem'}}>
                                {intl.get("controller.tab.play.controller")}
                            </div>
                        }>

                        {
                            //播放控制页面
                            this.state.tabIndex === 0 ? <div style={{...style.controllerPan, height: tabContainerHeight, marginTop: controllerButtonsMarginTop}}>
                                <div style={style.controllerBtn}>
                                    <div style={style.controllerBtn.button} onClick={() => {
                                        this.state.controllerIng[PLAY_CONTROLLER_RE_SING] !== true && this.playController(PLAY_CONTROLLER_RE_SING);
                                    }}>
                                        {
                                            this.state.controllerIng[PLAY_CONTROLLER_RE_SING] === true ? <CircularProgress
                                                size={20}
                                                thickness={2}
                                                color="white"/> : <ReloadIcon
                                                color="white"
                                                style={{width: '1.1rem', height: '1.1rem'}}
                                            />
                                        }
                                    </div>
                                    <p style={style.controllerBtn.label}>{intl.get("controller.restart")}</p>
                                </div>

                                <div style={style.controllerBtn}>
                                    <div style={{...style.controllerBtn.button, backgroundColor: "#0ebc0e"}} onClick={() => {
                                        this.state.controllerIng[PLAY_CONTROLLER_PAUSE_PLAY] !== true && this.playController(PLAY_CONTROLLER_PAUSE_PLAY);
                                    }}>
                                        {
                                            this.state.controllerIng[PLAY_CONTROLLER_PAUSE_PLAY] === true ? <CircularProgress
                                                size={20}
                                                thickness={2}
                                                color="white"/> : (
                                                <img src={PlayStopIcon} style={{width: '60%'}}/>
                                            )
                                        }
                                    </div>
                                    <p style={style.controllerBtn.label}>{intl.get("controller.play.pause")}</p>
                                </div>

                                <div style={style.controllerBtn}>
                                    <div style={{...style.controllerBtn.button, backgroundColor: "#2cabe9"}} onClick={() => {
                                        this.state.controllerIng[PLAY_CONTROLLER_ORIGINAL_ACCOMPANY] !== true && this.playController(PLAY_CONTROLLER_ORIGINAL_ACCOMPANY);
                                    }}>
                                        {
                                            this.state.controllerIng[PLAY_CONTROLLER_ORIGINAL_ACCOMPANY] === true ? <CircularProgress
                                                size={20}
                                                thickness={2}
                                                color="white"/> : (
                                                <img src={YuanBanIcon} style={{width: '60%'}}/>
                                            )
                                        }
                                    </div>
                                    <p style={style.controllerBtn.label}>{intl.get("controller.orig.inst")}</p>
                                </div>

                                <div style={{...style.controllerBtn}}>
                                    <div style={{...style.controllerBtn.button, backgroundColor: "#ff5223"}}
                                         onClick={() => {
                                             this.state.controllerIng[PLAY_CONTROLLER_NEXT] !== true && this.playController(PLAY_CONTROLLER_NEXT);
                                         }}>
                                        {
                                            this.state.controllerIng[PLAY_CONTROLLER_NEXT] === true ? <CircularProgress
                                                size={20}
                                                thickness={2}
                                                color="white"/> : <NextIcon color="white" style={{width: '1.5rem', height: '1.5rem'}}/>
                                        }
                                    </div>
                                    <p style={style.controllerBtn.label}>{intl.get("controller.next.song")}</p>
                                </div>

                                <Paper style={{...style.extArea, marginTop: extAreaMarginTop}}>
                                    {
                                        this.props.ottInfo && this.props.ottInfo.data.appVersion >= Const.BARRAGE_MIN_OTT_VERSION ? <div style={{
                                            margin: '0 .5rem',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={style.extArea.btn}
                                                 onTouchTap={() => {
                                                     linkTo('controller/barrage', false, null);
                                                 }}
                                            >
                                                <img src={BarrageIcon} style={{...style.extArea.btn.icon, width: '.6rem'}}/>
                                                <p style={style.extArea.btn.label}>{intl.get("barrage")}</p>
                                            </div>

                                        </div> : ""
                                    }

                                    {
                                        this.showAudioEffect() ? <div style={{
                                            margin: '0 .5rem',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <div
                                                style={style.extArea.btn}
                                                onTouchTap={() => {
                                                    linkTo('controller/effect', false, null);
                                                }}
                                            >
                                                <img src={EffectIcon} style={style.extArea.btn.icon}/>
                                                <p style={style.extArea.btn.label}>{intl.get("controller.sound.effect")}</p>
                                            </div>
                                        </div> : ""
                                    }

                                </Paper>

                                <Paper
                                    zDepth={0}
                                    style={{margin: '.3rem .267rem 2.2rem .267rem'}}
                                >
                                    <img src={MallImg} style={{width: '100%'}} onClick={f => location.href = sysConfig.mallIndex}/>
                                </Paper>

                            </div> : <div/>
                        }

                    </Tab>
                    <Tab
                        selected={this.state.tabIndex === 1}
                        buttonStyle={{
                            ...style.tabs.centerTab,
                            backgroundColor: backgroundColor[1],
                            color: fontColor[1]
                        }}
                        onActive={() => {
                            this.handelChangeTab(1);
                        }}
                        label={
                            <div style={{fontSize: longLan ? '.3rem' : '.4rem'}}>
                                {intl.get("controller.tab.selected.list")}
                            </div>
                        }>

                        {
                            //已点歌曲页面
                            this.state.tabIndex === 1 ? <div style={{paddingTop: '2rem', paddingBottom: '1.2rem', width: "100%"}}>
                                {
                                    this.chooseSongList(playingSong, playList)
                                }
                            </div> : <div/>
                        }

                    </Tab>

                    <Tab
                        selected={this.state.tabIndex === 2}
                        onActive={() => {
                            this.handelChangeTab(2);
                        }}
                        buttonStyle={{...style.tabs.rightTab, backgroundColor: backgroundColor[2], color: fontColor[2]}}
                        label={
                            <div style={{fontSize: longLan ? '.3rem' : '.4rem'}}>
                                {intl.get("controller.tab.history")}
                            </div>
                        }>

                        {
                            // 最近唱过页面
                            this.state.tabIndex === 2 ? <div style={{paddingTop: '2rem', paddingBottom: '1.2rem'}}>
                                {
                                    this.historySongList(historySongList)
                                }
                            </div> : <div/>
                        }

                    </Tab>
                </Tabs>
                <Snackbar
                    open={!!this.state.barrageSendToast}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={Const.TOAST_BOTTOM_SHOW_TIME}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />
                <MBottomNavigation selectedIndex={1}/>
            </div>
        );
    }

    /**
     * 已点歌曲列表
     * @param playingSong
     * @param playList
     * @returns {XML}
     */
    chooseSongList(playingSong, playList) {
        const {w, h} = this.props.common;
        if (this.state.offLine) {
            return (
                <NoWifi style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
            );
        } else if (this.state.unBindDevice) {
            return (
                <Paper className="history-song-list" zDepth={0}>
                    <NoResult style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
                </Paper>
            );
        } else if (!this.state.emptyChooseSongs) {
            return (
                <Paper style={style.chooseList} zDepth={0}>
                    <List className="song-list">
                        {
                            playingSong ? (
                                <ListItem
                                    className="song-item"
                                    key={playingSong.musicNo}
                                    primaryText={<div className="song-title">
                                        <font>{playingSong.musicName}</font>
                                        <i className="label-vip">{playingSong.vipStutas ? <img src={VIPIcon} style={{height: '.4rem'}}/> : ""}</i>
                                    </div>
                                    }
                                    secondaryText={<div className="song-author">
                                        {playingSong.actorName}
                                    </div>}
                                    rightToggle={<div style={{...style.chooseList.operationArea, justifyContent: 'center'}}>
                                        {
                                            playingSong.playStatus === 1 ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <img src={GifPlayIng} style={{height: '.8rem', width: '.653rem'}}/>
                                            </div> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <img src={GifPlayStop} style={{height: '.8rem', width: '.653rem'}}/>
                                            </div>
                                        }
                                    </div>}
                                />
                            ) : ""
                        }
                        {playList.map((song, index) => (
                            <ListItem
                                className="song-item"
                                key={song.musicNo}
                                primaryText={
                                    <div className="song-title">
                                        <font>{song.musicName}</font>
                                        <i className="label-vip">{song.vipStutas ? <img src={VIPIcon} style={{height: '.4rem'}}/> : ""}</i>
                                    </div>
                                }
                                secondaryText={
                                    this.songName(song, index)
                                }
                                rightToggle={
                                    <div style={style.chooseList.operationArea}>
                                        {
                                            this.songListButtons(song, index)
                                        }
                                    </div>
                                }
                            />
                        ))}
                    </List>
                </Paper>
            );
        } else {
            return (
                <Paper style={style.chooseList} zDepth={0}>
                    <NoResult style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
                </Paper>
            );
        }
    }

    updateChooseSongList() {
        const param = {};
        this.props.action_getChooseList(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true
                });
            }
        });
    }

    updateChooseSongListTimer() {
        const updateChooseSongsInterval = this.state.updateChooseSongsInterval;
        if (!updateChooseSongsInterval) {
            this.state.updateChooseSongsInterval = setInterval(() => {
                if (!this.state.offLine && this.state.updateChooseSongsCount >= UPDATE_HISTORY_SONG_TIME_COUNT) {
                    this.updateHistorySongList();
                    this.state.updateHistorySongCount = 0;
                } else {
                    this.state.updateHistorySongCount += 1;
                }
                if (!this.state.offLine && this.state.updateChooseSongsCount >= UPDATE_CHOOSE_SONG_TIME_COUNT && this.state.tabIndex === 1) {
                    this.updateChooseSongList();
                    this.state.updateChooseSongsCount = 0;
                } else {
                    this.state.updateChooseSongsCount += 1;
                }
            }, 1000);
        }
    }

    updateHistorySongList() {
        const paramHistory = {type: "history"};
        this.props.action_getHistorySongList(paramHistory, reqHeader(paramHistory), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true
                });
            }
        });
    }

    /**
     * 已唱歌曲列表
     * @param historySongList
     * @returns {XML}
     */
    historySongList(historySongList) {
        const {w, h} = this.props.common;
        if (this.state.offLine) {
            return (
                <NoWifi style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
            );
        } else if (historySongList && historySongList.length > 0) {
            return (
                <Paper className="history-song-list" zDepth={0}>
                    <List className="song-list">
                        {historySongList.map((song) => (
                            <SongItem
                                key={song.id}
                                song={song}
                                onPushSongSuccess={this.onPushSongSuccess}
                                onPushSongFail={this.onPushSongFail}
                            />
                        ))}
                    </List>
                </Paper>
            );
        } else if (historySongList && historySongList.length === 0) {
            return (
                <Paper className="history-song-list" zDepth={0}>
                    <NoResult style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
                </Paper>
            );
        } else if (this.state.unBindDevice) {
            return (
                <Paper className="history-song-list" zDepth={0}>
                    <NoResult style={{marginTop: w > h ? '.4rem' : '2.2rem'}}/>
                </Paper>
            );
        }
    }

    /**
     * 已点歌曲操作按钮
     * @param song
     * @param index
     * @returns {XML}
     */
    songListButtons(song, index) {
        if (this.state.delChooseSongIdIng[song.musicNo] === true) {
            return (
                <div style={style.chooseList.deleteButton.delIng}>
                    <CircularProgress size={16} thickness={1}
                                      style={{marginRight: 3}}/> {intl.get("msg.deleting")}
                </div>
            );
        } else if (this.state.setTopSongIdIng === song.musicNo) {
            return (
                <div style={style.chooseList.deleteButton.delIng}>
                    <CircularProgress size={16} thickness={1}
                                      style={{marginRight: 3}}/> {intl.get("msg.set.top.ing")}
                </div>
            );
        } else if (this.state.setTopSongIdIng) {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '100%'}}>
                    {
                        this.songSetTopButton(song, index) //<div style={{marginRight: '0.6rem', width: '0.4rem'}}/>
                    }
                    <img src={DelIcon} style={{width: '.4rem'}}
                         onTouchTap={() => {
                             this.unChoose(song.musicNo);
                         }}/>
                </div>
            );
        } else {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '100%'}}>
                    {
                        this.songSetTopButton(song, index) //<div style={{marginRight: '0.6rem', width: '0.4rem'}}/>
                    }
                    <img src={DelIcon} style={{width: '.4rem'}}
                         onTouchTap={() => {
                             this.unChoose(song.musicNo);
                         }}/>
                </div>
            );
        }
    }

    songName(song, index) {
        // needDownload:id 0不需要下载 1 需要下载
        const {needDownload, downloadStatus} = song;
        let downloadStatusStr = "";
        switch (downloadStatus) {
            case Const.DOWNLOAD_STATUS_NOT_DOWN:
                downloadStatusStr = intl.get("msg.waiting.download");
                break;
            case Const.DOWNLOAD_STATUS_DONE:
                // downloadStatusStr = "下载完成";
                break;
            case Const.DOWNLOAD_STATUS_DOWNING:
                downloadStatusStr = intl.get("msg.downloading");
                break;
            case Const.DOWNLOAD_STATUS_DOWN_FAILED:
                downloadStatusStr = intl.get("msg.download.fail");
                break;
            default:
                break;
        }

        return (
            <div style={{marginTop: 0, display: 'inline-flex', height: '.8rem', alignItems: 'center', width: '100%'}}>
                <div className="song-author" style={{marginTop: 'unset'}}>
                    {song.actorName}
                </div>
                <div style={{fontSize: '.3rem', color: (downloadStatus === Const.DOWNLOAD_STATUS_DOWN_FAILED) ? "red" : "#ff8433", marginLeft: '.2rem', whiteSpace: 'nowrap'}}>
                    {downloadStatusStr}
                 </div>
            </div>
        );
    }

    /**
     * 设置置顶按钮
     * @param song
     * @param index
     * @returns {XML}
     */
    songSetTopButton(song, index) {
        // needDownload:id 0不需要下载 1 需要下载
        const {needDownload, downloadStatus} = song;
        const setTopButton = (
            <img src={SetTopIcon} style={{marginRight: '.6rem', width: '.4rem'}}
                 onClick={() => {
                     this.setTop(song.musicNo);
                 }}/>
        );
        if (index === 0) {
            this.state.notDownloadIndex = -1;
        }
        if (downloadStatus === Const.DOWNLOAD_STATUS_NOT_DOWN && this.state.notDownloadIndex === -1) {
            this.state.notDownloadIndex = index;
        }
        if (index !== 0 && downloadStatus !== Const.DOWNLOAD_STATUS_DOWNING && index !== this.state.notDownloadIndex) {
            return setTopButton;
        } else {
            return (
                <div style={{display: 'block', marginRight: '0.6rem', width: '0.4rem'}}/>
            );
        }
    }

    /**
     * 更新已点歌曲数据
     */
    updateSong() {
        const {data} = this.props.songs.chooseList || {data: {recordJson: '{"list":[],"playing":{}}'}};
        if (!this.props.songs.chooseList) {
            this.setState({
                emptyChooseSongs: true
            });
        } else {
            let {list, playing} = this.handelList(data.recordJson);
            if (typeof list === "string") list = JSON.parse(list);
            this.setState({
                playList: list,
                playingSong: playing
            });
        }
    }

    /**
     * 更新已唱歌曲列表数据
     */
    updateHistorySong() {
        const historyPlayList = this.props.songs.getHistorySongList;
        let historySongList;
        if (historyPlayList && historyPlayList.data) {
            let {list} = this.handelList(historyPlayList.data.recordJson);
            if (typeof list === "string") list = JSON.parse(list);
            historySongList = list.map((song) => {
                const actorIcon = song.actorIcon;
                const actorName = song.actorName;
                const actorNo = song.actorNo;
                const musicIcon = song.musicIcon;
                const musicName = song.musicName;
                const musicNo = song.musicNo;
                const vipStutas = song.vipStutas;
                const fileMark = song.fileMark;
                return {
                    "nameNorm": musicName,
                    "id": musicNo,
                    "image": musicIcon,
                    "charge": vipStutas,
                    "serialNo": musicNo,
                    "fileMark": fileMark,
                    "actor": [
                        {
                            "actorNo": actorNo,
                            "nameNorm": actorName,
                        }
                    ]
                };
            });
        }
        this.setState({
            historySongList: historySongList
        });
    }

    /**
     * 字符串转json
     * @param jsonStr
     * @returns {{}}
     */
    handelList(jsonStr) {
        if (jsonStr) return JSON.parse(jsonStr);
        return {};
    }

    /**
     * 置顶操作
     * @param musicNo
     */
    setTop(musicNo) {
        if (super.validUserBindDevice(this.props.userInfoData, this.props.action_setGlobAlert) !== true) return;
        if (super.validUserDeviceOnline(this.props.ottInfo, this.props.action_setGlobAlert) !== true) return;
        const param = {type: 12, id: musicNo};
        let playList = this.state.playList;
        const topSong = playList.find((song) => {
            if (song.musicNo === musicNo) return song;
        });
        const newSongList = playList.filter((song) => {
            if (song !== topSong) return song;
        });
        this.setState({
            setTopSongIdIng: musicNo
        });
        // this.props.action_setSongTop(param, reqHeader(param), () => {
        //     setTimeout(() => {
        //         this.setState({
        //             offLine: false,
        //             setTopSongIdIng: 0,
        //             barrageSendToast: true,
        //             barrageToastMsg: "置顶成功",
        //             updateChooseSongsCount: UPDATE_CHOOSE_SONG_TIME_COUNT
        //         });
        //     }, 500);
        // });
        const success = () => {
            setTimeout(() => {
                this.setState({
                    offLine: false,
                    setTopSongIdIng: 0,
                    barrageSendToast: true,
                    barrageToastMsg: intl.get("msg.in.top.success"),
                    updateChooseSongsCount: UPDATE_CHOOSE_SONG_TIME_COUNT
                });
            }, 500);
        };
        const fail = (msg) => {
            this.setState({
                offLine: true
            });
        };

        dynaPush({
            ottInfo: this.props.ottInfo,
            userInfo: this.props.userInfo,
            param: param,
            localNetIsWork: this.props.localNetIsWork,
            action_pushLocal: this.props.action_pushLocal,
            action_setLocalNet: this.props.action_setLocalNet,
            action_push: this.props.action_push,
            action_setGlobAlert: this.props.action_setGlobAlert,
            success: success,
            fail: fail
        });
    }

    handelChangeTab(index) {
        let notBindDevice = false;
        const {userInfo, action_setGlobAlert} = this.props;
        const isBindDevice = this.isBindDevice(userInfo.userInfoData);
        if (isBindDevice === false) {
            notBindDevice = true;
            action_setGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
        }
        this.setState({
            notBindDevice: notBindDevice,
            tabIndex: index
        });
    }

    onPushSongSuccess(song) {
        const {nameNorm} = song;
        this.setState({
            offLine: false,
            barrageSendToast: true,
            barrageToastMsg: nameNorm + " " + intl.get("song.add.success"),
            updateChooseSongsCount: UPDATE_CHOOSE_SONG_TIME_COUNT
        });

        // 更新最近唱过
        // const paramHistory = {type: "history"};
        // this.props.action_getHistorySongList(paramHistory, reqHeader(paramHistory));
    }

    unChoose(musicNo) {
        if (super.validUserBindDevice(this.props.userInfoData, this.props.action_setGlobAlert) !== true) return;
        const param = {type: 13, id: musicNo};
        let playList = this.state.playList;
        let {delChooseSongIdIng} = this.state;
        delChooseSongIdIng[musicNo] = true;
        this.setState({
            delChooseSongIdIng: delChooseSongIdIng
        });
        // this.props.action_setSongTop(param, reqHeader(param), () => {
        //     delChooseSongIdIng[musicNo] = false;
        //     this.setState({
        //         offLine: false,
        //         barrageSendToast: true,
        //         barrageToastMsg: "删除成功",
        //         delChooseSongIdIng: delChooseSongIdIng,
        //         playList: playList.filter((song) => {
        //             return song.musicNo !== musicNo;
        //         })
        //     });
        // });
        const success = () => {
            delChooseSongIdIng[musicNo] = false;
            this.setState({
                offLine: false,
                barrageSendToast: true,
                barrageToastMsg: intl.get("msg.delete.success"),
                delChooseSongIdIng: delChooseSongIdIng,
                playList: playList.filter((song) => {
                    return song.musicNo !== musicNo;
                })
            });
        };
        const fail = (msg) => {
            delChooseSongIdIng[musicNo] = false;
            this.setState({
                offLine: true
            });
        };

        dynaPush({
            ottInfo: this.props.ottInfo,
            userInfo: this.props.userInfo,
            param: param,
            localNetIsWork: this.props.localNetIsWork,
            action_pushLocal: this.props.action_pushLocal,
            action_setLocalNet: this.props.action_setLocalNet,
            action_push: this.props.action_push,
            action_setGlobAlert: this.props.action_setGlobAlert,
            success: success,
            fail: fail
        });
    }

    playController(type) {
        if (super.validUserBindDevice(this.props.userInfoData, this.props.action_setGlobAlert) !== true) return;
        if (super.validUserDeviceOnline(this.props.ottInfo, this.props.action_setGlobAlert) !== true) return;
        const param = {
            type: type
        };
        let {controllerIng} = this.state;
        controllerIng[type] = true;
        this.setState({
            controllerIng: controllerIng
        });
        const success = () => {
            controllerIng[type] = false;
            setTimeout(() => {
                this.setState({
                    offLine: false,
                    controllerIng: controllerIng
                });
            }, 600);
        };
        const fail = (msg) => {
            controllerIng[type] = false;
            this.setState({
                offLine: true,
                controllerIng: controllerIng
            });
        };

        dynaPush({
            ottInfo: this.props.ottInfo,
            userInfo: this.props.userInfo,
            param: param,
            localNetIsWork: this.props.localNetIsWork,
            action_pushLocal: this.props.action_pushLocal,
            action_setLocalNet: this.props.action_setLocalNet,
            action_push: this.props.action_push,
            action_setGlobAlert: this.props.action_setGlobAlert,
            success: success,
            fail: fail
        });

    }

    onPushSongFail(msg) {
        this.setState({
            barrageSendToast: true,
            barrageToastMsg: msg
        });
    }

    showAudioEffect() {
        const {data} = this.props.userInfo.userInfoData || {data: {}};
        // 国光老板卡，显示音控台
        // 新加一个版卡支持音效
        return ((data.channel === 'gg_laobanka' || data.channel === 'gg_f886_ahfy') && data.isReDevice === 1);
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        songs: state.app.songs,
        common: state.app.common,
        userInfo: state.app.user.userInfo,
        ottInfo: state.app.device.ottInfo,
        localNetIsWork: state.app.common.localNetIsWork,
        userInfoData: state.app.user.userInfo.userInfoData
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        action_setSongTop: bindActionCreators(setSongTop, dispatch),
        action_getChooseList: bindActionCreators(getChooseList, dispatch),
        action_getHistorySongList: bindActionCreators(getHistorySongList, dispatch),
        action_pushLocal: bindActionCreators(pushLocal, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        action_setLocalNet: bindActionCreators(setLocalNet, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongController));
