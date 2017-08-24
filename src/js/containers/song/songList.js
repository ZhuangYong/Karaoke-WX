import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Paper, Snackbar} from "material-ui";
import DSongList from "../../components/common/SongList";


class SongList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            barrageSendToast: false,
            barrageToastMsg: ""
        };
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
    }

    render() {
        let props = {};
        const {type, id} = this.props.match.params;
        props[type] = parseInt(id, 10);
        return (
            <Paper zDepth={0} style={{paddingTop: 44}}>
                <SearchHeadFake/>
                <DSongList
                    onPushSongSuccess={this.onPushSongSuccess}
                    onPushSongFail={this.onPushSongFail}
                    containerStyle={{top: 44}}
                    {...props}/>
                <Snackbar
                    open={this.state.barrageSendToast}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={500}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />
            </Paper>
        );
    }

    onPushSongSuccess(song) {
        const {nameNorm} = song;
        this.setState({
            barrageSendToast: true,
            barrageToastMsg: nameNorm + " 点歌成功"
        });
    }

    onPushSongFail(msg) {
        this.setState({
            barrageSendToast: true,
            barrageToastMsg: msg
        });
    }
}

export default withRouter(connect(
    () => {
        return {};
    },
    () => {
        return {};
    }
)(SongList));

