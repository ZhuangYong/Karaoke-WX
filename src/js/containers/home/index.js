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
            width: "1.5rem"
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
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
        super.title("主页");
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
            barrageToastMsg: ""
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
        const stamp = this.state.stamp;
        if (preProps.songs.recommendSongsStamp !== this.props.songs.recommendSongsStamp) {
            const {data} = this.props.songs.recommendSongs || {data: {result: [], lastPage: false}};
            const {result, lastPage} = data;
            this.setState({
                pageData: [...this.state.pageData, ...(result || [])],
                lastPage: lastPage,
                loading: false
            });
        }
    }

    componentWillUnmount() {

    }

    render() {
        const getAlbumRecommendData = this.props.songs.getAlbumRecommend || {data: {result: defaultGetAlbumRecommendData}};
        const getRankingData = this.props.songs.getRanking || {data: {result: defaultGetRankingData}};
        let scrollTopStyle = {};
        if (!this.state.needScrollToTop) {
            scrollTopStyle = {
                opacity: 0
            };
        }
        return (
            <div>
                <SearchHeadFake back={this.back}/>
                <div className='home'
                     style={style.home}
                     onScroll={this.onScroll.bind(this)} onTouchEnd={this.onScroll.bind(this)}>
                    <Paper
                        zDepth={0}
                    >
                        <div style={style.topNav}>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo("catAlbum", false, null);
                            }}>
                                <img src={IconCate} style={style.topNav.img}/>
                                <p style={style.topNav.label}>分类</p>
                            </span>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo("singer/album", false, null);
                            }}>
                                <img src={IconSinger} style={style.topNav.img}/>
                                <p style={style.topNav.label}>歌星</p>
                            </span>
                            <span style={style.topNav.item} onClick={() => {
                                linkTo(`songs/hotId/48/热歌/`, false, null);
                            }}>
                                <img src={IconHotSong} style={style.topNav.img}/>
                                <p style={style.topNav.label}>热歌</p>
                            </span>
                        </div>
                    </Paper>

                    <Paper
                        zDepth={0}
                        style={{...style.paper, position: "relative"}}
                    >
                        <CardTitle
                            style={{padding: "0 8px", height: '1.467rem'}}
                            titleStyle={{fontSize: '.453rem', paddingTop: '.22rem', height: '1.467rem', display: 'flex', alignItems: 'center'}}
                            title="精选推荐"/>
                        <div className="home-recommend" style={{width: "100%", overflowX: "visible", overflowY: "hidden", position: "absolute"}}>
                                {getAlbumRecommendData.data.result.map((recommend) => (
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
                                            recommend.name && linkTo(`songs/recommendId/${recommend.id}/${recommend.name}/${encoding(recommend.wxPic || recommend.imgurl)}`, false, null);
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
                            title="经典排行"
                        />
                        <div className="home-rank" style={{width: "100%", overflowX: "auto", overflowY: "hidden", position: "absolute"}}>
                            {getRankingData.data.result.map((rank) => (
                                <GridTile
                                    key={rank.id}
                                    title=""
                                    style={{display: "table-cell", padding: "0 .067rem"}}
                                    titleBackground="transparent"
                                    onClick={() => {
                                        rank.name && linkTo(`songs/hotId/${rank.id}/${rank.name}/${encoding(rank.wxPic || rank.imgurl)}`, false, null);
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

                    <Paper
                        zDepth={0}
                        style={style.paper}
                    >
                        <CardTitle
                            style={{padding: "0 8px"}}
                            titleStyle={{fontSize: '.453rem', height: '1.467rem', display: 'flex', alignItems: 'center'}}
                            title="个性化推荐"
                        />
                        <List className="song-list">
                            {this.getRecommendSongsContent()}
                        </List>


                        <div className="loading-bottom">
                            {this.state.loading ? (<div><RefreshIndicator
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
                    </Paper>
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
                loading: false
            });
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

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        songs: state.app.songs,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getRecommend: bindActionCreators(getRecommend, dispatch),
        action_getAlbumRecommend: bindActionCreators(getAlbumRecommend, dispatch),
        action_getRanking: bindActionCreators(getRanking, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
