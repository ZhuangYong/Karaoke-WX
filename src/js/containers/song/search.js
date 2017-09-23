import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../../actions/searchActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {Paper, Snackbar, Subheader} from "material-ui";
import {bindActionCreators} from "redux";
import SongList from "../../components/common/SongList";
import Const from "../../utils/const";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {chkDevice} from "../../utils/comUtils";

const style = {
    searchWord: {
        maxWidth: '70%',
        overflow: 'hidden',
        fontSize: '.32rem',
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
            barrageToastMsg: "",
            focus: false
        };
        this.search = this.search.bind(this);
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
        this.handelFocus = this.handelFocus.bind(this);
        this.handelBlur = this.handelBlur.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const {keyword} = this.props.match.params;
        this.search(keyword);
    }

    render() {
        const {keyword} = this.props.match.params;
        const {isAndroid} = chkDevice();
        return (
            <Paper zDepth={0}>
                <SearchHeader handelBlur={this.handelBlur} handelFocus={this.handelFocus} defaultKeyWord={keyword} getSearchKey={this.search} inputIng={!keyword}/>
                {this.state.keyword ? <Paper style={{height: '1.2rem', position: "fixed", top: '1.2rem', width: "100%", zIndex: 1}}>
                    <Subheader style={{height: '1.2rem', display: 'flex', alignItems: 'center'}}>
                        “{<font style={style.searchWord}>{this.state.keyword}</font> }” <font style={style.searchWord}>的搜索结果</font>
                    </Subheader>
                </Paper> : ""}
                <div>
                    <SongList
                        ref="SongList"
                        onPushSongSuccess={this.onPushSongSuccess}
                        onPushSongFail={this.onPushSongFail}
                        paddingTop="2.4rem"
                        scrollToTopBottom="2rem"
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
                {
                    ((!this.state.focus && isAndroid) || !isAndroid) ? <MBottomNavigation selectedIndex={0}/> : ""
                }

            </Paper>
        );
    }

    search(keyword) {
        if (keyword === this.state.keyword) {
            console.log(this.refs);
        } else {
            this.setState({
                keyword: keyword
            });
        }
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

    handelFocus() {
        this.setState({
            focus: true
        });
    }

    handelBlur() {
        setTimeout(() => {
            this.setState({
                focus: false
            });
        }, 300);
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
