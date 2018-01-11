import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Paper, Snackbar} from "material-ui";
import DSongList from "../../components/common/SongList";
import Const from "../../utils/const";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import intl from 'react-intl-universal';


class SongList extends BaseComponent {

    constructor(props) {
        super(props);
        const {title} = this.props.match.params || {};
        super.title(title);
        this.state = {
            barrageSendToast: false,
            barrageToastMsg: ""
        };
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
    }

    render() {
        let props = {};
        const {type, id, headImg} = this.props.match.params || {};
        props[type] = parseInt(id, 10);
        return (
            <Paper zDepth={0} style={{paddingTop: '1.04rem'}}>
                <SearchHeadFake/>
                <DSongList
                    onPushSongSuccess={this.onPushSongSuccess}
                    onPushSongFail={this.onPushSongFail}
                    headImg={headImg}
                    scrollToTopBottom="2rem"
                    {...props}/>
                <Snackbar
                    open={this.state.barrageSendToast}
                    bodyStyle={{height: 'auto', minHeight: 48}}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={Const.TOAST_BOTTOM_SHOW_TIME}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />
                <MBottomNavigation selectedIndex={-1}/>
            </Paper>
        );
    }

    onPushSongSuccess(song) {
        const {nameNorm} = song;
        this.setState({
            barrageSendToast: true,
            barrageToastMsg: nameNorm + " " + intl.get("song.add.success")
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

