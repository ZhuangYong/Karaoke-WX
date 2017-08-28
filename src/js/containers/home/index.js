import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {GridTile} from "material-ui/GridList";
import Paper from "material-ui/Paper";
import {CardTitle} from "material-ui/Card";
import BaseComponent from "../../components/common/BaseComponent";
import "../../../sass/common/Scroller.scss";
import {getAlbumRecommend, getRanking, getRecommend} from "../../actions/audioActons";

import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {linkTo, reqHeader} from "../../utils/comUtils";
import IconCate from "../../../img/common/icon_catelog.png";
import IconHotSong from "../../../img/common/icon_hot_song.png";
import IconSinger from "../../../img/common/icon_singer.png";
import {List, RefreshIndicator, Snackbar} from "material-ui";
import {bindActionCreators} from "redux";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import SongItem from "../../components/common/SongItem";

const style = {
    home: {
        paddingTop: "66px",
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
            paddingTop: 13,
            textAlign: "center"
        },
        img: {
            width: "45%"
        },
        label: {
            margin: 6,
            fontSize: "16px",
            color: "#ff6832"
        }
    },
    paper: {
        margin: 4,
        minHeight: 140
    },
    tile: {
        width: "100%",
        overflow: "hidden"
    },
    tileImg: {
        height: 70,
        minWidth: 83,
        margin: "auto",
        display: "inherit"
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        margin: "0 4px"
    },
    itemTitle: {
        fontSize: 10,
        lineHeight: "12px",
        paddingTop: 6,
        textAlign: "center"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: 30,
        fontSize: "14px",
        marginBottom: 88,
        alignItems: "center"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("金麦客");
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
        const getAlbumRecommendData = this.props.songs.getAlbumRecommend || {data: {result: []}};
        const getRankingData = this.props.songs.getRanking || {data: {result: []}};
        return (
            <div>
                <SearchHeadFake back={this.back}/>
                <div className='home'
                     style={style.home}
                     onScroll={this.onScroll.bind(this)}>
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
                                linkTo("songs/hotId/48", false, null);
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
                            style={{padding: "0 8px"}}
                            titleStyle={{fontSize: 14}}
                            title="精选推荐"/>
                        <div style={{width: "100%", overflowX: "auto", position: "absolute"}}>
                            {getAlbumRecommendData.data.result.map((recommend) => (
                                <GridTile
                                    key={recommend.id}
                                    title=""
                                    style={{display: "table-cell", padding: "0 4px"}}
                                    titleStyle={{
                                        textAlign: "center",
                                        marginRight: "16px",
                                        marginTop: "20%",
                                        color: "black"
                                    }}
                                    titleBackground="transparent"
                                    onTouchTap={() => {
                                        linkTo("songs/recommendId/" + recommend.id, false, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img src={recommend.wxPic || recommend.imgurl} style={style.tileImg}/>
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
                            style={{padding: "0 8px"}}
                            titleStyle={{fontSize: 14}}
                            title="经典排行"
                        />
                        <div style={{width: "100%", overflowX: "auto", position: "absolute"}}>
                            {getRankingData.data.result.map((rank) => (
                                <GridTile
                                    key={rank.id}
                                    title=""
                                    style={{display: "table-cell", padding: "0 4px"}}
                                    titleBackground="transparent"
                                    onTouchTap={() => {
                                        linkTo("songs/hotId/" + rank.id, false, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img src={rank.wxPic || rank.imgurl} style={style.tileImg}/>
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
                            titleStyle={{fontSize: 14}}
                            title="个性化推荐"
                        />
                        <List className="song-list">
                            {this.getRecommendSongsContent()}
                        </List>


                        <div style={style.loading}>
                            {this.state.loading ? (<RefreshIndicator
                                size={30}
                                left={70}
                                top={0}
                                loadingColor="#FF9800"
                                status="loading"
                                style={style.loadingBar}
                            />) : ""}

                            <span>{this.state.lastPage ? "亲爱滴，已经到底了" : "正在加载"}</span>
                        </div>
                    </Paper>
                </div>
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
                <MBottomNavigation selectedIndex={0}/>
            </div>
        );
    }

    onScroll(e) {
        if (!this.state.loading && e.target.classList && e.target.classList.contains("home")) {
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            if (betweenBottom < 50) {
                this.loadMoreAction();
            }
        }
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
        this.props.action_getRecommend(param, reqHeader(param), resolve);
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
