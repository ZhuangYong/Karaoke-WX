import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {setSongTop, getChooseList} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import {reqHeader} from "../../utils/comUtils";
import {List, ListItem, Paper} from "material-ui";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import PlayingIcon from "material-ui/svg-icons/av/equalizer";


class ChooseList extends BaseComponent {

    constructor(props) {
        super(props);
        // super.title("已点列表");
        this.state = {
            playList: []
        };
        this.unChoose = this.unChoose.bind(this);
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
        const playList = this.state.playList;
        const playingSong = this.state.playingSong;

        return (
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
                                        this.unChoose(song.musicNo);
                                    }}
                                />
                            </div>}
                        />
                    ))}
                </List>
            </Paper>
        );
    }

    updateSong() {
        const data = this.props.songs.chooseList || {recordJson: '{"list":[],"playing":{}}'};
        let {list, playing} = this.handelList(data.recordJson);
        if (typeof list === "string") list = JSON.parse(list);
        this.setState({
            playList: list,
            playingSong: playing
        });
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

    unChoose(musicNo) {
        const param = {type: 13, id: musicNo};
        let playList = this.state.playList;
        this.props.action_setSongTop(param, reqHeader(param), () => {
            this.setState({
                playList: playList.filter((song) => {
                    return song.musicNo !== musicNo;
                })
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
        action_getChooseList: bindActionCreators(getChooseList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChooseList));
