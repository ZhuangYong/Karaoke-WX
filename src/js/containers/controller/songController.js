import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {linkTo, reqHeader} from "../../utils/comUtils";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {setSongTop, getChooseList} from "../../actions/audioActons";

import {Paper, RaisedButton, Tab, Tabs, FloatingActionButton, List, ListItem} from "material-ui";
import ReloadIcon from "material-ui/svg-icons/action/autorenew";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import StopIcon from "material-ui/svg-icons/av/pause";
import PlayingIcon from "material-ui/svg-icons/av/equalizer";
import PersonIcon from "material-ui/svg-icons/social/person";
import MusicIcon from "material-ui/svg-icons/image/music-note";
import NextIcon from "material-ui/svg-icons/av/skip-next";
import MusicStyleIcon from "material-ui/svg-icons/action/settings-input-component";

const style = {
    controllerBtn: {
        width: "25%",
        height: "100px",
        textAlign: "center",
        marginTop: "14px"
    }
};
class SongController extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            playList: [],
            historyPlayList: [],
            emptyChooseSongs: false
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.songs.chooseListStamp !== this.props.songs.chooseListStamp) {
            this.updateSong();
        }
    }

    componentDidMount() {
        const param = {};
        this.props.action_getChooseList(param, reqHeader(param));
    }

    render() {
        const {playList, historyPlayList} = this.state;
        const playingSong = this.state.playingSong;
        return (
            <div>
                <Tabs>
                    <Tab label="播放控制">
                        <div style={{marginTop: "40%", display: "flex", width: "90%", marginLeft: "5%"}}>
                            <div style={style.controllerBtn}>
                                <FloatingActionButton backgroundColor="#ffc51b">
                                    <ReloadIcon/>
                                </FloatingActionButton>
                                <p>重唱</p>
                            </div>

                            <div style={style.controllerBtn}>
                                <FloatingActionButton backgroundColor="#0ebc0e">
                                    <PlayIcon/>
                                    <div style={{
                                        display: "inline-flex",
                                        position: "absolute",
                                        left: "44%"
                                    }}>/
                                    </div>
                                    <StopIcon/>
                                </FloatingActionButton>
                                <p>播/暂</p>
                            </div>

                            <div style={style.controllerBtn}>
                                <FloatingActionButton backgroundColor="#2cabe9">
                                    <PersonIcon/>
                                    <div style={{
                                        display: "inline-flex",
                                        position: "absolute",
                                        left: "46%"
                                    }}>/
                                    </div>
                                    <MusicIcon/>
                                </FloatingActionButton>
                                <p>原/伴</p>
                            </div>

                            <div style={{...style.controllerBtn, marginTop: "0"}}>
                                <FloatingActionButton
                                    backgroundColor="#f2754e"
                                    iconStyle={{width: 70, height: 70}}
                                >
                                    <NextIcon/>
                                </FloatingActionButton>
                                <p>切歌</p>
                            </div>

                        </div>

                        <Paper style={{
                            border: "none",
                            boxShadow: "none",
                            width: "100%",
                            display: "table",
                            marginTop: "30%"
                        }}>
                            <RaisedButton
                                label="弹幕"
                                secondary={true}
                                style={{display: "table-cell", padding: "0 10%", boxShadow: "none", width: "50%"}}
                                icon={<MusicStyleIcon/>}
                                onTouchTap={() => {
                                    linkTo('controller/barrage', false, null);
                                }}
                            />
                            <RaisedButton
                                label="音效"
                                secondary={true}
                                style={{display: "table-cell", padding: "0 10%", boxShadow: "none", width: "50%"}}
                                icon={<MusicStyleIcon/>}
                            />
                        </Paper>

                    </Tab>
                    <Tab label="已点">
                        <div>
                            {
                                !this.state.emptyChooseSongs ? (
                                    <Paper>
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
                                                    rightToggle={<div>
                                                        <PublishIcon
                                                            onTouchTap={() => {
                                                                this.setTop(song.musicNo);
                                                            }}
                                                        />
                                                        <DeleteIcon
                                                            onTouchTap={() => {
                                                                this.unChoose();
                                                            }}
                                                        />
                                                    </div>}
                                                />
                                            ))}
                                        </List>
                                    </Paper>
                                ) : (
                                    <Paper>
                                        没有已点歌曲
                                    </Paper>
                                )
                            }


                        </div>
                    </Tab>

                    <Tab label="最近唱过">
                        <div>
                            {
                                !historyPlayList ? (
                                    <Paper>
                                        <List>
                                            {historyPlayList.map((song) => (
                                                <ListItem
                                                    key={song.musicNo}
                                                    primaryText={song.musicName}
                                                    secondaryText={song.actorName}
                                                    rightToggle={<div>
                                                        <PublishIcon
                                                            onTouchTap={() => {
                                                                this.setTop(song.musicNo);
                                                            }}
                                                        />
                                                        <DeleteIcon
                                                            onTouchTap={() => {
                                                                this.unChoose();
                                                            }}
                                                        />
                                                    </div>}
                                                />
                                            ))}
                                        </List>
                                    </Paper>
                                ) : (
                                    <Paper>
                                        没有最近唱过歌曲
                                    </Paper>
                                )
                            }


                        </div>
                    </Tab>
                </Tabs>

                <MBottomNavigation selectedIndex={1}/>
            </div>
        );
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

    handelList(jsonStr) {
        if (jsonStr) return JSON.parse(jsonStr);
        return {};
    }

    setTop(musicNo) {
        const param = {type: 12, id: musicNo};
        let playList = this.state.playList;
        const topSong = playList.find((song) => {
            if (song.musicNo === musicNo) return song;
        });
        const newSongList = playList.filter((song) => {
            if (song !== topSong) return song;
        });
        this.props.action_setSongTop(param, reqHeader(param), () => {
            this.setState({
                playList: [topSong, ...newSongList]
            });
        });
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        songs: state.app.songs
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_setSongTop: bindActionCreators(setSongTop, dispatch),
        action_getChooseList: bindActionCreators(getChooseList, dispatch),
        // action_getHistorySongList: bindActionCreators(getHistorySongList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongController));
