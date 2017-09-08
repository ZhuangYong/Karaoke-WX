import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../../actions/searchActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {Paper, Snackbar, Subheader} from "material-ui";
import {bindActionCreators} from "redux";
import SongList from "../../components/common/SongList";
import navutils from "../../utils/navUtils";
import Const from "../../utils/const";

const style = {
    searchWord: {
        maxWidth: '6rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap'
    }
};
class Search extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("搜索");
        this.state = {
            keyword: "",
            barrageSendToast: false,
            barrageToastMsg: ""
        };
        this.search = this.search.bind(this);
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const {keyword} = this.props.match.params;
        this.search(keyword);
    }

    render() {
        const {keyword} = this.props.match.params;
        return (
            <Paper zDepth={0}>
                <SearchHeader defaultKeyWord={keyword} getSearchKey={this.search} inputIng={!keyword}/>
                {this.state.keyword ? <Paper style={{position: "fixed", top: '1.2rem', width: "100%", zIndex: 1}}>
                    <Subheader style={{display: 'flex', alignItems: 'center'}}>
                        “{<font style={style.searchWord}>{this.state.keyword}</font> }” <font>的搜索结果</font>
                    </Subheader>
                </Paper> : ""}
                <div>
                    <SongList
                        onPushSongSuccess={this.onPushSongSuccess}
                        onPushSongFail={this.onPushSongFail}
                        paddingTop="2.4rem"
                        keyword={this.state.keyword}
                        search={true}/>
                </div>
                <Snackbar
                    open={this.state.barrageSendToast}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={Const.TOAST_BOTTOM_SHOW_TIME}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />
            </Paper>
        );
    }

    search(keyword) {
        this.setState({
            keyword: keyword
        });
        //if (!location.href.endsWith("/"))navutils.replace(keyword);
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

const mapStateToProps = (state, ownPorps) => {
    return {
        hotKeys: state.app.search
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_search: bindActionCreators(search, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
