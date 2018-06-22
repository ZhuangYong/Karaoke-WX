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
import {
    getActorsAlbum, getCatSongList, getRankAlbum, getAlbumRecommendSongList,
    getListFavorites
} from "../../actions/audioActons";
import {search} from "../../actions/searchActons";
import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import Const from "../../utils/const";
import NoResult from "./NoResult";
import NoWifi from "./NoWifi";
import NoNetworkImg from "../../../img/common/bg_no_network.png";
import {atob as decoding} from "Base64";
import intl from "react-intl-universal";

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
    },
    loadingRotate: {
        width: '.42rem',
        height: '.42rem',
        marginRight: '.2rem',
        position: 'relative',
        loadingCircle: {
            stroke: '#FF9800',
            strokeLinecap: 'round',
            transition: 'all 850ms ease-in-out 0ms',
            strokeDasharray: '80, 114',
            strokeDashoffset: '-403.668'
        }
    },
};

class SongList extends BaseComponent {
    constructor(props) {
        super(props);
        let queryFun = null;
        let dataKey = "";
        let stamp = "";
        if (this.props.singerId) {// 歌星列表
            dataKey = "getActorsAlbum";
            stamp = "getActorsAlbumStamp";
            queryFun = this.props.action_getActorsAlbum;
        } else if (this.props.catId) {// 分类歌曲列表
            dataKey = "getCatSongList";
            stamp = "getCatSongListStamp";
            queryFun = this.props.action_getCatSongList;
        } else if (this.props.hotId) {// 排行歌曲列表
            dataKey = "getRankAlbum";
            stamp = "getRankAlbumStamp";
            queryFun = this.props.action_getRankAlbum;
        } else if (this.props.recommendId) {// 推荐歌曲列表
            dataKey = "getAlbumRecommendSongList";
            stamp = "getAlbumRecommendSongListStamp";
            queryFun = this.props.action_getAlbumRecommendSongList;
        } else if (this.props.search) {// 搜索结果列表
            dataKey = "searchResult";
            stamp = "searchResultStamp";
            queryFun = this.props.action_searchResult;
        } else if (this.props.favList) {// 收藏列表
            dataKey = "getFavList";
            stamp = "getFavListStamp";
            queryFun = this.props.action_getListFavorites;
        }
        this.state = {
            pageSize: 20,
            stamp: stamp,
            pageData: [],
            noData: false,
            loading: false,
            offLineLock: false,
            currentPage: 0,
            lastPage: false,
            dataKey: dataKey,
            queryFun: queryFun,
            needScrollToTop: false,
            id: this.props.singerId || this.props.catId || this.props.hotId || this.props.recommendId
        };
        this.getContent = this.getContent.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.onUnFav = this.onUnFav.bind(this);
    }
    componentDidMount() {
        if (this.props.search) {
            this.state.currentPage = 1;
        } else if (this.state.currentPage === 0) {
            this.nextPage();
        }
    }

    componentWillUnmount() {
        window.lockShowNoWIfi = false;
    }

    componentDidUpdate(preProps) {
        const stamp = this.state.stamp;
        if (preProps.songs[stamp] !== this.props.songs[stamp]) {
            const data = this.props.songs[this.state.dataKey] || {data: {result: [], lastPage: false}};
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
        window.lockShowNoWIfi = true;
    }

    render() {
        const {noData, offLine, loading, lastPage, currentPage, pageData} = this.state;
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
            const showNoWifi = offLine && !loading && currentPage !== 0 && pageData.length === 0;
            return (
                <div className='common-song-list'
                     style={{...style.commonSongList, paddingTop: paddingTop, paddingBottom: paddingBottom}}
                     onScroll={this.onScroll.bind(this)}>
                    <img src={NoNetworkImg} style={{display: 'none'}}/>
                    {
                        showNoWifi ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                    }
                    {
                        !offLine && headImg && <img className="img-not-loaded" style={{top: 44, width: '100%', minHeight: '6.08rem', maxHeight: '7rem'}} src={decoding(decodeURIComponent(headImg))}/>
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
                        <div>
                            <svg className="rotate" viewBox="0 0 40 40" style={{opacity: loading ? 1 : 0, ...style.loadingRotate}}>
                                <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={style.loadingRotate.loadingCircle}/>
                            </svg>
                            <span>
                                {
                                    loading ? intl.get("song.loading") : ""
                                }
                                {
                                    (!offLine && lastPage) ? intl.get("song.list.end") : ""
                                }
                                {
                                    (offLine && !showNoWifi && !loading) ? intl.get("msg.network.die") : ""
                                }
                            </span>
                        </div>
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
                    key={song.id || song.serialNo}
                    song={song}
                    onPushSongSuccess={this.props.onPushSongSuccess}
                    onPushSongFail={this.props.onPushSongFail}
                    onUnFav={this.onUnFav}
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
        } else if (this.props.favList) {
            param.type = 1;
        } else {
            param.id = id;
        }
        queryFun && queryFun(param, reqHeader(param), callback, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    offLineLock: true,
                    loading: false
                });
                setTimeout(() => {
                    this.setState({
                        offLineLock: false
                    });
                }, 2000);
            }
        }, this.setState({loading: false}));
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
                    offLineLock: true,
                    loading: false
                });
                setTimeout(() => {
                    this.setState({
                        offLineLock: false
                    });
                }, 2000);
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
            if (!this.state.offLineLock && !this.state.loading && betweenBottom < 50) {
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

    onUnFav(unFavSong) {
        if (this.props.favList) {
            const pageData = this.state.pageData.filter(song => song.serialNo !== unFavSong.serialNo);
            this.setState({
                pageData: pageData,
            });
        }
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
        action_getAlbumRecommendSongList: bindActionCreators(getAlbumRecommendSongList, dispatch),
        action_getListFavorites: bindActionCreators(getListFavorites, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList));
