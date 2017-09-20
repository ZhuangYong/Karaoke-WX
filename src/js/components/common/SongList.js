/**
 * Created by walljack@163.com on 2017/8/7.
 */
import React from "react";
import {List, RefreshIndicator} from "material-ui";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import BaseComponent from "./BaseComponent";
import {reqHeader} from "../../utils/comUtils";
import {connect} from "react-redux";
import SongItem from "./SongItem";
import "../../../sass/common/Scroller.scss";
import {getActorsAlbum, getCatSongList, getRankAlbum, getAlbumRecommendSongList} from "../../actions/audioActons";
import {search} from "../../actions/searchActons";
import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import Const from "../../utils/const";
import NoResult from "./NoResult";
import NoWifi from "./NoWifi";
import NoNetworkImg from "../../../img/common/bg_no_network.png";
import {atob as decoding} from "Base64";

const style = {
    commonSongList: {
        position: "absolute",
        height: "100%",
        overflowY: "auto",
        width: "100%",
        top: 0
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};
class SongList extends BaseComponent {
    constructor(props) {
        super(props);
        let queryFun = null;
        let dataKey = "";
        let stamp = "";
        if (this.props.singerId) {
            dataKey = "getActorsAlbum";
            stamp = "getActorsAlbumStamp";
            queryFun = this.props.action_getActorsAlbum;
        } else if (this.props.catId) {
            dataKey = "getCatSongList";
            stamp = "getCatSongListStamp";
            queryFun = this.props.action_getCatSongList;
        } else if (this.props.hotId) {
            dataKey = "getRankAlbum";
            stamp = "getRankAlbumStamp";
            queryFun = this.props.action_getRankAlbum;
        } else if (this.props.recommendId) {
            dataKey = "getAlbumRecommendSongList";
            stamp = "getAlbumRecommendSongListStamp";
            queryFun = this.props.action_getAlbumRecommendSongList;
        } else if (this.props.search) {
            dataKey = "searchResult";
            stamp = "searchResultStamp";
            queryFun = this.props.action_searchResult;
        }
        this.state = {
            pageSize: 20,
            stamp: stamp,
            pageData: [],
            noData: false,
            loading: false,
            currentPage: 0,
            lastPage: false,
            dataKey: dataKey,
            queryFun: queryFun,
            needScrollToTop: false,
            id: this.props.singerId || this.props.catId || this.props.hotId || this.props.recommendId
        };
        this.getContent = this.getContent.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
    }
    componentDidMount() {
        if (this.props.search) {
            this.state.currentPage = 1;
        } else if (this.state.currentPage === 0) {
            this.nextPage();
        }
    }

    componentDidUpdate(preProps) {
        const stamp = this.state.stamp;
        if (preProps.songs[stamp] !== this.props.songs[stamp]) {
            const {data} = this.props.songs[this.state.dataKey] || {data: {result: [], lastPage: false}};
            const {result, lastPage} = data;
            const pageData = [...this.state.pageData, ...(result || [])];
            this.setState({
                pageData: pageData,
                lastPage: lastPage,
                loading: false,
                offLine: false
            });
            if (this.state.currentPage > 0 && pageData.length === 0) {
                this.setState({
                    noData: true
                });
            } else {
                this.setState({
                    noData: false
                });
            }
        }
        if (this.props.keyword && preProps.keyword !== this.props.keyword) {
            this.refreshPage();
        }
    }

    render() {
        const {noData} = this.state;
        const {singerId, catId, hotId, headImg, ...others} = this.props;
        const paddingTop = this.props.paddingTop ? this.props.paddingTop : '1.18rem';
        const paddingBottom = this.props.paddingBottom ? this.props.paddingBottom : 5;
        const scrollToTopBottom = this.props.scrollToTopBottom ? this.props.scrollToTopBottom : '1rem';
        let scrollTopStyle = {};
        if (!this.state.needScrollToTop) {
            scrollTopStyle = {
                opacity: 0
            };
        }
        if (!this.state.loading && noData) {
            return (
                <NoResult style={{position: 'absolute'}}/>
            );
        } else {
            return (
                <div className='common-song-list'
                     style={{...style.commonSongList, paddingTop: paddingTop, paddingBottom: paddingBottom}}
                     onScroll={this.onScroll.bind(this)}>
                    <img src={NoNetworkImg} style={{display: 'none'}}/>
                    {
                        (this.state.offLine && this.state.currentPage !== 0 && this.state.pageData.length === 0) ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                    }
                    {
                        !this.state.offLine && headImg && <img className="img-not-loaded" style={{top: 44, width: '100%', minHeight: '6.08rem', maxHeight: '7rem'}} src={decoding(headImg)}/>
                    }
                    <List className="song-list">{this.getContent()}</List>

                    {

                        <div className="scroll-to-top-button" style={{bottom: scrollToTopBottom, ...scrollTopStyle}}
                             onTouchTap={() => {
                                 this.scrollTo(0);
                             }}>
                            <ScrollToTopIcon color="white"/>
                        </div>
                    }

                    <div className="loading-bottom">
                        {!this.state.lastPage ? (<div style={{opacity: this.state.loading ? 1 : 0}}><RefreshIndicator
                            size={30}
                            left={70}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={style.loadingBar}
                        />
                            <span>正在加载</span>
                        </div>) : ""}

                        <span>{this.state.lastPage ? "亲爱滴，已经到底了" : ""}</span>
                        <span>{(!this.state.loading && this.state.offLine && this.state.currentPage !== 0 && this.state.pageData.length !== 0) ? Const.STRING_NO_WIFI : ""}</span>
                    </div>
                </div>
            );
        }
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {
        if (this.state.loading) return;
        this.refreshPage(resolve);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        if (this.state.loading) return;
        this.nextPage(resolve);
    }

    /**
     * 获取列表内容
     * */
    getContent() {
        const pageData = this.state.pageData;
        return pageData.map((song) => (
                <SongItem
                    key={song.id}
                    song={song}
                    onPushSongSuccess={this.props.onPushSongSuccess}
                    onPushSongFail={this.props.onPushSongFail}
                />
            )
        );
    }

    /**
     * 加载下一页
     * @param callback
     */
    nextPage(callback) {
        if (this.state.lastPage) return;
        this.state.currentPage += 1;
        this.state.loading = true;
        const {currentPage, pageSize, queryFun, id} = this.state;
        let param = {currentPage: currentPage, pageSize: pageSize};
        if (this.props.search) {
            param.type = 'actorAndMedias';
            param.keyword = this.props.keyword;
        } else {
            param.id = id;
        }
        queryFun && queryFun(param, reqHeader(param), callback, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

    /**
     * 刷新页面
     * @param callback
     */
    refreshPage(callback) {
        this.setState({
            currentPage: 1,
            pageData: [],
            lastPage: false,
            loading: true,
            scrollTarget: null,
            scrollIng: false,
            scrollToTop: false
        });
        const {pageSize, queryFun, id} = this.state;
        let param = {currentPage: 1, pageSize: pageSize};
        if (this.props.search) {
            param.type = 'actorAndMedias';
            param.keyword = this.props.keyword;
        } else {
            param.id = id;
        }
        queryFun && queryFun(param, reqHeader(param), callback, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

    /**
     * 滚动触发
     * @param e
     */
    onScroll(e) {
        if (e.target.classList && e.target.classList.contains("common-song-list")) {
            this.state.scrollTarget = e.target;
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            if (!this.state.loading && betweenBottom < 50) {
                this.loadMoreAction();
            }
            if (e.target.scrollTop > Const.NEED_SCROLL_TOP_HEIGHT) {
                this.setState({
                    needScrollToTop: true
                });
            } else {
                this.setState({
                    needScrollToTop: false
                });
            }
        }
    }

    /**
     * 滑动到
     * @param to number to scroll
     */
    scrollTo(to) {
        const {scrollTarget} = this.state || {scrollTo: f => f};
        scrollTarget.scrollTop = to;
        setTimeout(() => {
            scrollTarget.scrollTop = to;
        }, 100);
    }

}

SongList.defaultProps = {
    singerId: 0,
    catId: 0,
    hotId: 0,
    recommendId: 0,
    search: false
};

SongList.propTypes = {
    singerId: PropTypes.number,
    catId: PropTypes.number,
    hotId: PropTypes.number,
    recommendId: PropTypes.number,
    keyword: PropTypes.string,
    search: PropTypes.bool,
    onPushSongSuccess: PropTypes.func,
    onPushSongFail: PropTypes.func,
    headImg: PropTypes.string
};

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        songs: state.app.songs,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getActorsAlbum: bindActionCreators(getActorsAlbum, dispatch),
        action_getCatSongList: bindActionCreators(getCatSongList, dispatch),
        action_getRankAlbum: bindActionCreators(getRankAlbum, dispatch),
        action_searchResult: bindActionCreators(search, dispatch),
        action_getAlbumRecommendSongList: bindActionCreators(getAlbumRecommendSongList, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList));
