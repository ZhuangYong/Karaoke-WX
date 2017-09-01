import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {dynaPush, linkTo, reqHeader} from "../../utils/comUtils";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {getChooseList, getHistorySongList, push, pushLocal, setSongTop} from "../../actions/audioActons";

import {CircularProgress, List, ListItem, Paper, Snackbar, Tab, Tabs} from "material-ui";
import ReloadIcon from "material-ui/svg-icons/action/autorenew";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import StopIcon from "material-ui/svg-icons/av/pause";
import PlayingIcon from "material-ui/svg-icons/av/equalizer";
import PersonIcon from "material-ui/svg-icons/social/person";
import MusicIcon from "material-ui/svg-icons/image/music-note";
import NextIcon from "material-ui/svg-icons/av/skip-next";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import SongItem from "../../components/common/SongItem";
import BarrageIcon from "../../../img/common/icon_barrage.png";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import NoResultImg from "../../../img/common/bg_no_result.png";
import PlayStopIcon from "../../../img/controller/play_stop.png";
import YuanBanIcon from "../../../img/controller/yuan_ban.png";

const style = {
    controllerBtn: {
        width: "50%",
        height: "3.4rem",
        textAlign: "center",
        marginTop: ".4rem",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        button: {
            backgroundColor: '#ffc51b',
            width: '1.867rem',
            height: '1.867rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1.867rem'
        }
    },
    extArea: {
        border: "none",
        boxShadow: "none",
        width: "100%",
        display: "flex",
        marginTop: "16%",
        padding: '0 1.4rem',
        justifyContent: "center",
        alignItems: "center",
        btn: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ff6832",
            borderRadius: '1rem',
            width: '2.2rem',
            height: '1.2rem',
            icon: {
                height: "20px",
                marginRight: '.1rem'
            },
            label: {
                margin: 0,
                fontSize: '.45rem',
                color: "#ff6832"
            }
        }
    },
    tabs: {
        leftTab: {
            flexDirection: "row",
            height: 36,
            border: "1px solid white",
            borderRadius: "6px 0 0 6px"
        },
        centerTab: {
            flexDirection: "row",
            height: 36,
            borderTop: "1px solid white",
            borderBottom: "1px solid white"
        },
        rightTab: {
            flexDirection: "row",
            height: 36,
            border: "1px solid white",
            borderRadius: "0 6px 6px 0"
        }
    },
    chooseList: {
        deleteButton: {
            delIng: {
                fontSize: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex"
            }
        }
    },
    noResult: {
        height: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
};
const UPDATE_CHOOSE_SONG_TIME_COUNT = 5;
const PLAY_CONTROLLER_RE_SING = 5;
const PLAY_CONTROLLER_ORIGINAL_ACCOMPANY = 6;
const PLAY_CONTROLLER_PAUSE_PLAY = 7;
const PLAY_CONTROLLER_NEXT = 8;

class SongController extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("播控");
        this.state = {
            playList: [],
            historySongList: [],
            controllerIng: {},
            tabIndex: 0,
            setTopSongIdIng: 0,
            delChooseSongIdIng: {},
            updateChooseSongsCount: 0,
            emptyChooseSongs: false,
            barrageSendToast: '',
            barrageToastMsg: ''
        };
        this.unChoose = this.unChoose.bind(this);
        this.showAudioEffect = this.showAudioEffect.bind(this);
        this.playController = this.playController.bind(this);
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
        this.handelChangeTab = this.handelChangeTab.bind(this);
        this.songListButtons = this.songListButtons.bind(this);
        this.songSetTopButton = this.songSetTopButton.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.songs.chooseListStamp !== this.props.songs.chooseListStamp) {
            this.updateSong();
        }
        if (preProps.songs.getHistorySongListStamp !== this.props.songs.getHistorySongListStamp) {
            this.updateHistorySong();
        }

    }

    componentWillUnmount() {
        clearInterval(this.state.updateChooseSongsInterval);
    }

    componentDidMount() {
        const param = {};
        const updateChooseSongsInterval = this.state.updateChooseSongsInterval;
        const paramHistory = {type: "history"};
        this.props.action_getChooseList(param, reqHeader(param));
        this.props.action_getHistorySongList(paramHistory, reqHeader(paramHistory));
        if (!updateChooseSongsInterval) {
            this.state.updateChooseSongsInterval = setInterval(() => {
                if (this.state.updateChooseSongsCount >= UPDATE_CHOOSE_SONG_TIME_COUNT && this.state.tabIndex === 1) {
                    this.props.action_getChooseList(param, reqHeader(param));
                    this.state.updateChooseSongsCount = 0;
                } else {
                    this.state.updateChooseSongsCount += 1;
                }
            }, 1000);
        }
    }

    render() {
        const {playList, historySongList} = this.state;
        const {w, h} = this.props.common;
        const tabContainerHeight = h - 48 - 60;
        const playingSong = this.state.playingSong;
        let backgroundColor = ['transparent', 'transparent', 'transparent'];
        let fontColor = ['white', 'white', 'white'];
        backgroundColor[this.state.tabIndex] = "white";
        fontColor[this.state.tabIndex] = "#ff6832";

        return (
            <div>
                <Tabs
                    inkBarStyle={{display: "none"}}
                    tabItemContainerStyle={{backgroundColor: "#ff8333", padding: "6px 10%"}}
                >
                    <Tab
                        onActive={() => {
                            this.handelChangeTab(0);
                        }}
                        buttonStyle={{...style.tabs.leftTab, backgroundColor: backgroundColor[0], color: fontColor[0]}}
                        label={
                            <div>
                                播放控制
                            </div>
                        }>
                        <div style={{
                            marginTop: "10%",
                            display: "flex",
                            width: "80%",
                            marginLeft: "10%",
                            flexWrap: "wrap"
                        }}>
                            <div style={style.controllerBtn}>
                                <div style={style.controllerBtn.button} onTouchTap={() => {
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
                                <p style={{margin: '.3rem 0'}}>重唱</p>
                            </div>

                            <div style={style.controllerBtn}>
                                <div style={{...style.controllerBtn.button, backgroundColor: "#0ebc0e"}} onTouchTap={() => {
                                    this.state.controllerIng[PLAY_CONTROLLER_PAUSE_PLAY] !== true && this.playController(PLAY_CONTROLLER_PAUSE_PLAY);
                                }}>
                                    {
                                        this.state.controllerIng[PLAY_CONTROLLER_PAUSE_PLAY] === true ? <CircularProgress
                                            size={20}
                                            thickness={2}
                                            color="white"/> : (
                                                <div style={{...style.controllerBtn.button, backgroundColor: "#0ebc0e"}}>
                                                    <img src={PlayStopIcon} style={{width: '60%'}}/>
                                                </div>
                                        )
                                    }
                                </div>
                                <p style={{margin: '.3rem 0'}}>播/暂</p>
                            </div>

                            <div style={style.controllerBtn}>
                                <div style={{...style.controllerBtn.button, backgroundColor: "#2cabe9"}} onTouchTap={() => {
                                    this.state.controllerIng[PLAY_CONTROLLER_ORIGINAL_ACCOMPANY] !== true && this.playController(PLAY_CONTROLLER_ORIGINAL_ACCOMPANY);
                                }}>
                                    {
                                        this.state.controllerIng[PLAY_CONTROLLER_ORIGINAL_ACCOMPANY] === true ? <CircularProgress
                                            size={20}
                                            thickness={2}
                                            color="white"/> : (
                                            <div style={{...style.controllerBtn.button, backgroundColor: "#2cabe9"}}>
                                                <img src={YuanBanIcon} style={{width: '60%'}}/>
                                            </div>
                                        )
                                    }
                                </div>
                                <p style={{margin: '.3rem 0'}}>原/伴</p>
                            </div>

                            <div style={{...style.controllerBtn}}>
                                <div style={{...style.controllerBtn.button, backgroundColor: "#ff5223"}}
                                     onTouchTap={() => {
                                         this.state.controllerIng[PLAY_CONTROLLER_NEXT] !== true && this.playController(PLAY_CONTROLLER_NEXT);
                                }}>
                                    {
                                        this.state.controllerIng[PLAY_CONTROLLER_NEXT] === true ? <CircularProgress
                                            size={20}
                                            thickness={2}
                                            color="white"/> : <NextIcon color="white" style={{width: '1.5rem', height: '1.5rem'}}/>
                                    }
                                </div>
                                <p style={{margin: '.3rem 0'}}>切歌</p>
                            </div>

                        </div>

                        <Paper style={style.extArea}>
                            <div style={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <div
                                    style={style.extArea.btn}
                                    onTouchTap={() => {
                                        linkTo('controller/barrage', false, null);
                                    }}
                                >
                                    <img src={BarrageIcon} style={style.extArea.btn.icon}/>
                                    <p style={style.extArea.btn.label}>弹幕</p>
                                </div>
                            </div>
                            {
                                this.showAudioEffect() ? <div style={{
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <div
                                        style={style.extArea.btn}
                                        onTouchTap={() => {
                                            linkTo('controller/effect', false, null);
                                        }}
                                    >
                                        <img src={BarrageIcon} style={style.extArea.btn.icon}/>
                                        <p style={style.extArea.btn.label}>音效</p>
                                    </div>
                                </div> : ""
                            }

                        </Paper>

                    </Tab>
                    <Tab
                        buttonStyle={{
                            ...style.tabs.centerTab,
                            backgroundColor: backgroundColor[1],
                            color: fontColor[1]
                        }}
                        onActive={() => {
                            this.handelChangeTab(1);
                        }}
                        label="已点歌曲">
                        <div style={{height: tabContainerHeight, width: "100%", position: 'absolute', overflowY: 'auto'}}>
                            {
                                !this.state.emptyChooseSongs ? (
                                    <Paper style={style.chooseList} zDepth={0}>
                                        <List>
                                            {
                                                playingSong ? (
                                                    <ListItem
                                                        key={playingSong.musicNo}
                                                        primaryText={playingSong.musicName}
                                                        secondaryText={playingSong.actorName}
                                                        rightToggle={<div><PlayingIcon/></div>}
                                                    />
                                                ) : ""
                                            }
                                            {playList.map((song) => (
                                                <ListItem
                                                    key={song.musicNo}
                                                    primaryText={song.musicName}
                                                    secondaryText={song.actorName}
                                                    rightToggle={
                                                        <div style={{height: '1rem', width: '2rem', display: "flex", top: "auto"}}>
                                                            {
                                                                this.songListButtons(song)
                                                            }

                                                        </div>
                                                    }
                                                />
                                            ))}
                                        </List>
                                    </Paper>
                                ) : (
                                    <Paper style={style.chooseList} zDepth={0}>
                                        <div style={style.noResult}>
                                            <img src={NoResultImg} style={{maxWidth: "80%"}}/>
                                            <p style={{color: "#7e7e7e", textAlign: 'center'}}>没有任何东东哟</p>
                                        </div>
                                    </Paper>
                                )
                            }
                        </div>
                    </Tab>

                    <Tab
                        onActive={() => {
                            this.handelChangeTab(2);
                        }}
                        buttonStyle={{...style.tabs.rightTab, backgroundColor: backgroundColor[2], color: fontColor[2]}}
                        label="最近唱过">
                        <div style={{height: tabContainerHeight, width: "100%", position: 'absolute', overflowY: 'auto'}}>
                            {
                                (historySongList && historySongList.length > 0) ? (
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
                                ) : (
                                    <Paper className="history-song-list" zDepth={0}>
                                        <div style={style.noResult}>
                                            <img src={NoResultImg} style={{maxWidth: "80%"}}/>
                                            <p style={{color: "#7e7e7e", textAlign: 'center'}}>没有任何东东哟</p>
                                        </div>
                                    </Paper>
                                )
                            }
                        </div>
                    </Tab>
                </Tabs>
                <Snackbar
                    open={!!this.state.barrageSendToast}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={500}
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

    songListButtons(song) {
        if (this.state.delChooseSongIdIng[song.musicNo] === true) {
            return (
                <div style={style.chooseList.deleteButton.delIng}>
                    <CircularProgress size={16} thickness={1}
                                      style={{marginRight: 3}}/> 刪除中
                </div>
            );
        } else if (this.state.setTopSongIdIng === song.musicNo) {
            return (
                <div style={style.chooseList.deleteButton.delIng}>
                    <CircularProgress size={16} thickness={1}
                                      style={{marginRight: 3}}/> 置顶中
                </div>
            );
        } else if (this.state.setTopSongIdIng) {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {
                        this.songSetTopButton(song)
                    }
                    <DeleteIcon
                        onTouchTap={() => {
                            this.unChoose(song.musicNo);
                        }}
                    />
                </div>
            );
        } else {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {
                        this.songSetTopButton(song)
                    }
                    <DeleteIcon
                        onTouchTap={() => {
                            this.unChoose(song.musicNo);
                        }}
                    />
                </div>
            );
        }
    }

    songSetTopButton(song) {
        // needDownload:id 0不需要下载 1 需要下载
        // downloadStatus: 1下载完成 0未下载 2下载失败
        const {needDownload, downloadStatus} = song;
        if (needDownload === 1 && downloadStatus !== 1) {
            const downloadStatusStr = downloadStatus ? "下载失败" : "未下载";
            return (
                <p style={{fontSize: '.3rem', color: downloadStatus ? "red" : "gray", marginRight: '.2rem'}}>
                    {downloadStatusStr}
                </p>
            );
        } else {
            return (
                    <PublishIcon
                        style={{marginRight: '.38rem'}}
                        onTouchTap={() => {
                            this.setTop(song.musicNo);
                        }}
                    />
            );
        }
    }

    updateSong() {
        const {data} = this.props.songs.chooseList || {data: {recordJson: '{"list":[],"playing":{}}'}};
        if (!data) {
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
                return {
                    "nameNorm": musicName,
                    "id": musicNo,
                    "image": musicIcon,
                    "charge": vipStutas,
                    "serialNo": musicNo,
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

    handelList(jsonStr) {
        if (jsonStr) return JSON.parse(jsonStr);
        return {};
    }

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
        this.props.action_setSongTop(param, reqHeader(param), () => {
            this.setState({
                setTopSongIdIng: 0,
                playList: [topSong, ...newSongList]
            });
        });
    }

    handelChangeTab(index) {
        this.setState({
            tabIndex: index
        });
    }

    onPushSongSuccess(song) {
        const {nameNorm} = song;
        this.setState({
            barrageSendToast: true,
            barrageToastMsg: nameNorm + " 点歌成功",
            updateChooseSongsCount: UPDATE_CHOOSE_SONG_TIME_COUNT
        });
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
        this.props.action_setSongTop(param, reqHeader(param), () => {
            delChooseSongIdIng[musicNo] = false;
            this.setState({
                delChooseSongIdIng: delChooseSongIdIng,
                playList: playList.filter((song) => {
                    return song.musicNo !== musicNo;
                })
            });
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
                    controllerIng: controllerIng
                });
            }, 600);
        };
        const fail = (msg) => {
            controllerIng[type] = false;
            this.setState({
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
        return (data.channel === 'gg_laobanka' && data.isReDevice === 1);
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
