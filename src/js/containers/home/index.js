import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {GridTile} from "material-ui/GridList";
import Paper from "material-ui/Paper";
import {CardTitle} from "material-ui/Card";
import BaseComponent from "../../components/common/BaseComponent";
import "../../../sass/common/Scroller.scss";
import {getAlbumRecommend, getRanking, getRecommend} from "../../actions/audioActons";
import {btoa as encoding} from "Base64";

import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {linkTo, reqHeader} from "../../utils/comUtils";
import IconCate from "../../../img/common/icon_catelog.png";
import IconHotSong from "../../../img/common/icon_hot_song.png";
import IconSinger from "../../../img/common/icon_singer.png";
import {List, RefreshIndicator, Snackbar} from "material-ui";
import {bindActionCreators} from "redux";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import SongItem from "../../components/common/SongItem";
import Const from "../../utils/const";
import MallImg from "../../../img/mall/home.png";
import sysConfig from "../../utils/sysConfig";
import intl from 'react-intl-universal';
import { comFetch } from '../../utils/fetchUtils';
import apiUrl from '../../actions/apiUrl';
import { thirdPayWxAuth } from '../../actions/payAction';

const style = {
    home: {
        paddingTop: "1.2rem",
        position: "absolute",
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    topNav: {
        display: "table",
        width: "100%",
        item: {
            display: "table-cell",
            width: "33.33%",
            paddingTop: '.347rem',
            textAlign: "center"
        },
        img: {
            width: "1.5rem",
            height: "1.5rem",
            display: "inline-table"
        },
        label: {
            margin: '.16rem',
            fontSize: ".4rem",
            color: "#ff6832"
        }
    },
    paper: {
        margin: '0 .267rem',
        minHeight: '5.2rem'
    },
    tile: {
        width: "100%",
        overflow: "hidden"
    },
    tileImg: {
        height: '3.067rem',
        width: '4.27rem',
        minWidth: '4.27rem',
        margin: "auto",
        display: "inherit",
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        margin: "0 4px"
    },
    itemTitle: {
        fontSize: '.32rem',
        paddingTop: '.08rem',
        height: '.6rem',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        overflow: 'hidden',
        width: '4.27rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'block',
        padding: 0,
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
const blankImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
const defaultGetAlbumRecommendData = [
    {id: 'defaultData0', wxPic: blankImg},
    {id: 'defaultData1', wxPic: blankImg},
    {id: 'defaultData2', wxPic: blankImg},
    {id: 'defaultData3', wxPic: blankImg},
    {id: 'defaultData4', wxPic: blankImg},
    {id: 'defaultData5', wxPic: blankImg},
    {id: 'defaultData6', wxPic: blankImg}
];

const defaultGetRankingData = defaultGetAlbumRecommendData;

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.home"));
        this.state = {
            defaultBack: '/',
            showMsg: false,
            msgText: '',
            pageSize: 20,
            pageData: [],
            loading: false,
            currentPage: 0,
            lastPage: false,
            barrageSendToast: false,
            barrageToastMsg: "",
            offLineLock: false
        };
        this.onPushSongFail = this.onPushSongFail.bind(this);
        this.onPushSongSuccess = this.onPushSongSuccess.bind(this);
        this.getRecommendSongsContent = this.getRecommendSongsContent.bind(this);
    }

    componentDidMount() {
        const paramRank = {id: "home"};
        const paramRecommend = paramRank;
        //获取排行
        this.props.action_getRanking(paramRank, reqHeader(paramRank));
        //获取推荐
        this.props.action_getAlbumRecommend(paramRecommend, reqHeader(paramRecommend));
        if (this.state.currentPage === 0) this.loadMoreAction();
    }

    componentDidUpdate(preProps) {
        if (preProps.songs.recommendSongsStamp !== this.props.songs.recommendSongsStamp) {
            const {recommendSongs} = this.props.songs;
            const {result, lastPage} = recommendSongs;
            this.setState({
                pageData: [...this.state.pageData, ...(result || [])],
                lastPage: lastPage,
                loading: false
            });
        }
    }

    render() {
        const {offLine, loading, lastPage, currentPage, pageData} = this.state;
        const getAlbumRecommendData = this.props.songs.getAlbumRecommend || {data: {result: defaultGetAlbumRecommendData}};
        const getRankingData = this.props.songs.getRanking || {data: {result: defaultGetRankingData}};
        let scrollTopStyle = {};
        if (!this.state.needScrollToTop) {
            scrollTopStyle = {
                opacity: 0
            };
        }
        return (
            <div className="page-home">
                <SearchHeadFake back={this.back}/>
                <div className='home'
                     style={style.home}
                     onScroll={this.onScroll.bind(this)} onTouchEnd={this.onScroll.bind(this)}>
                    <Paper
                        zDepth={0}
                    >
                        <div className="top-nav" style={style.topNav}>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo("catAlbum", false, null);
                            }}>
                                <div className="nav-item category" style={style.topNav.img}/>
                                <p style={style.topNav.label}>{intl.get("index.category")}</p>
                            </span>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo("singer/album", false, null);
                            }}>
                                <div className="nav-item artists" style={style.topNav.img}/>
                                <p style={style.topNav.label}>{intl.get("index.artists")}</p>
                            </span>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo(`songs/hotId/48/${intl.get("index.trending")}/`, false, null);
                            }}>
                                <div className="nav-item trending" style={style.topNav.img}/>
                                <p style={style.topNav.label}>{intl.get("index.trending")}</p>
                            </span>
                        </div>
                    </Paper>
                    {/*<button onClick={() => {*/}
                        {/*const params = {*/}
                            {/*sn: 'WS0017050010100068',*/}
                            {/*mac: '28070d0000db',*/}
                        {/*};*/}
                        {/*this.props.actionTest(params, reqHeader(params));*/}
                    {/*}}>测试</button>*/}

                    <Paper
                        zDepth={0}
                        style={{...style.paper, position: "relative"}}
                    >
                        <CardTitle
                            style={{padding: "0 8px", height: '1.467rem'}}
                            titleStyle={{fontSize: '.453rem', paddingTop: '.22rem', height: '1.467rem', display: 'flex', alignItems: 'center'}}
                            title={intl.get("index.recommend")}/>
                        <div className="home-recommend" style={{width: "100%", overflowX: "visible", overflowY: "hidden", position: "absolute"}}>
                            {getAlbumRecommendData.result && getAlbumRecommendData.result.map((recommend) => (
                                <GridTile
                                    key={recommend.id}
                                    title=""
                                    style={{display: "table-cell", padding: "0 .067rem"}}
                                    titleStyle={{
                                        textAlign: "center",
                                        marginRight: "16px",
                                        marginTop: "20%",
                                        color: "black"
                                    }}
                                    titleBackground="transparent"
                                    onClick={() => {
                                        recommend.name && linkTo(`songs/recommendId/${recommend.id}/${recommend.name}/${encodeURIComponent(encoding(recommend.wxPic || recommend.imgurl))}`, false, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img className="img-not-loaded" src={recommend.wxPic || recommend.imgurl} style={style.tileImg}/>
                                        <div style={style.itemTitle}>{recommend.name}</div>
                                    </div>
                                </GridTile>
                            ))}
                        </div>
                    </Paper>

                    <Paper
                        zDepth={0}
                        style={{...style.paper, position: "relative"}}
                    >
                        <CardTitle
                            style={{padding: "0 8px", height: '1.467rem'}}
                            titleStyle={{fontSize: '.453rem', paddingTop: '.22rem', height: '1.467rem', display: 'flex', alignItems: 'center'}}
                            title={intl.get("index.rank")}
                        />
                        <div className="home-rank" style={{width: "100%", overflowX: "auto", overflowY: "hidden", position: "absolute"}}>
                            {getRankingData.result && getRankingData.result.map((rank) => (
                                <GridTile
                                    key={rank.id}
                                    title=""
                                    style={{display: "table-cell", padding: "0 .067rem"}}
                                    titleBackground="transparent"
                                    onClick={() => {

                                        rank.name && linkTo(`songs/hotId/${rank.id}/${rank.name}/${encodeURIComponent(encoding(rank.wxPic || rank.imgurl))}`, false, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img className="img-not-loaded" src={rank.wxPic || rank.imgurl} style={style.tileImg}/>
                                        <div style={style.itemTitle}>{rank.name}</div>
                                    </div>
                                </GridTile>
                            ))}
                        </div>
                    </Paper>

                     {/*<Paper
                    zDepth={0}
                    className="mall-index"
                    style={{margin: '.3rem .267rem 0 .267rem'}}
                    >
                         <img src={MallImg} style={{width: '100%'}} onClick={f => location.href = sysConfig.mallIndex}/>
                     </Paper>*/}

                    <Paper
                        zDepth={0}
                        style={style.paper}
                    >
                        <CardTitle
                            style={{padding: "0 8px"}}
                            titleStyle={{fontSize: '.453rem', height: '1.467rem', display: 'flex', alignItems: 'center'}}
                            title={intl.get("index.personalize.recommend")}
                        />
                        <List className="song-list">
                            {this.getRecommendSongsContent()}
                        </List>


                        <div className="loading-bottom">
                            <div>
                                <svg className="rotate" viewBox="0 0 40 40" style={{display: loading ? "" : "none", ...style.loadingRotate}}>
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
                                        (offLine && !loading) ? intl.get("msg.network.die") : ""
                                    }
                                </span>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Snackbar
                    open={this.state.barrageSendToast}
                    bodyStyle={{height: 'auto', minHeight: 48, lineHeight: '.7rem', display: 'flex', alignItems: 'center'}}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={Const.TOAST_BOTTOM_SHOW_TIME}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />

                {/*置顶操作*/}
                {
                    <div className="scroll-to-top-button" style={scrollTopStyle} onTouchTap={() => {
                        this.scrollTo(0);
                    }}>
                        <ScrollToTopIcon color="white"/>
                    </div>
                }

                <MBottomNavigation selectedIndex={0}/>
            </div>
        );
    }

    onScroll(e) {
        if (e.target.classList && e.target.classList.contains("home")) {
            this.state.scrollTarget = e.target;
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            this.state.scrollTop = e.target.scrollTop;
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

    scrollTo(to) {
        const {scrollTarget} = this.state || {scrollTo: f => f};
        scrollTarget.scrollTop = to;
        setTimeout(() => {
            scrollTarget.scrollTop = to;
        }, 100);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const pageSize = this.state.pageSize;
        let param = {currentPage: currentPage, pageSize: pageSize, id: '48'};
        //个性化推荐
        this.props.action_getRecommend(param, reqHeader(param), resolve, () => {
            this.setState({
                offLine: true,
                offLineLock: true,
                loading: false
            });
            setTimeout(() => {
                this.setState({
                    offLineLock: false
                });
            }, 3000);
        });

        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    /**
     * 获取列表内容
     * */
    getRecommendSongsContent() {
        const pageData = this.state.pageData;
        return pageData.map((song) => (
            <SongItem
                key={song.id}
                song={song}
                onPushSongSuccess={this.onPushSongSuccess}
                onPushSongFail={this.onPushSongFail}
            />)
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

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        songs: state.app.songs,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionTest: bindActionCreators(thirdPayWxAuth, dispatch),
        action_getRecommend: bindActionCreators(getRecommend, dispatch),
        action_getAlbumRecommend: bindActionCreators(getAlbumRecommend, dispatch),
        action_getRanking: bindActionCreators(getRanking, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
