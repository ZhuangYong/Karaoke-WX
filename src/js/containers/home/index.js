import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {GridList, GridTile} from "material-ui/GridList";
import Paper from "material-ui/Paper";
import {Card, CardTitle} from "material-ui/Card";
import BaseComponent from "../../components/common/BaseComponent";
import "../../../sass/common/Scroller.scss";
import {getAlbumRecommend, getRanking, getRecommend} from "../../actions/audioActons";

import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {linkTo, reqHeader} from "../../utils/comUtils";

import defaultImg from "../../../img/common/tile_default.jpg";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import {List, ListItem, RefreshIndicator} from "material-ui";
import {bindActionCreators} from "redux";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import Scroller from "silk-scroller";
import ScrollArea from "react-scrollbar";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-lite";
import SongItem from "../../components/common/SongItem";

const style = {
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
        marginBottom: 62,
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
        this.state = {
            defaultBack: '/',
            showMsg: false,
            msgText: '',
            pageSize: 20,
            pageData: [],
            loading: false,
            currentPage: 0,
            lastPage: false,
        };
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
            <div className='home' style={{paddingTop: "66px", height: "100vh", overflowX: "auto"}}
                 onScroll={this.onScroll.bind(this)}>
                <SearchHeadFake back={this.back}/>
                {/* <Scroller
                 useLoadMore
                 preventDefaultException={
                 {tagName: /^(.GridList)$/}
                 }
                 containerStyle={{top: 66, bottom: 60}}
                 directionLockThreshold={1}
                 loadMoreAction={this.loadMoreAction.bind(this)}
                 noMoreData={this.state.lastPage}
                 >*/}
                {/*<ReactIScroll

                 className="ReactIScroll"
                 iScroll={iScroll}
                 options={{scrollbars: true}}
                 >*/}
                <Paper
                    zDepth={0}
                    style={{paddingBottom: "28px"}}
                >
                    <BottomNavigation
                        selectedIndex={this.state.selectedIndex}
                    >
                        <BottomNavigationItem
                            label="分类"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo("catalbum", false, null);
                            }}
                        />
                        <BottomNavigationItem
                            label="歌星"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo("singer/album", false, null);
                            }}
                        />
                        <BottomNavigationItem
                            label="热歌"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo("songs/hotId/48", false, null);
                            }}
                        />
                    </BottomNavigation>
                </Paper>

                <Paper
                    zDepth={0}
                    style={style.paper}
                >
                    <CardTitle
                        style={{padding: "0 8px"}}
                        titleStyle={{fontSize: 14}}
                        title="精选推荐"/>
                    <GridList
                        cellHeight={100}
                        style={style.gridList}
                        cols={2.5}
                        className="GridList"
                    >
                        {getAlbumRecommendData.data.result.map((recommend) => (
                            <GridTile
                                key={recommend.id}
                                title=""
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
                                    <img src={recommend.imgurl} style={style.tileImg}/>
                                    <div style={style.itemTitle}>{recommend.name}</div>
                                </div>
                            </GridTile>
                        ))}
                    </GridList>
                </Paper>

                <Paper
                    zDepth={0}
                    style={style.paper}
                >
                    <CardTitle
                        style={{padding: "0 8px"}}
                        titleStyle={{fontSize: 14}}
                        title="经典排行"
                    />
                    <GridList
                        cellHeight={100}
                        style={style.gridList}
                        cols={2.5}
                    >
                        {getRankingData.data.result.map((rank) => (
                            <GridTile
                                key={rank.id}
                                title=""
                                titleBackground="transparent"
                                onTouchTap={() => {
                                    linkTo("songs/hotId/" + rank.id, false, null);
                                }}
                            >
                                <div style={style.tile}>
                                    <img src={rank.imgurl} style={style.tileImg}/>
                                    <div style={style.itemTitle}>{rank.name}</div>
                                </div>
                            </GridTile>
                        ))}
                    </GridList>
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
                    {
                        this.state.loading ? <div style={style.loading}><RefreshIndicator
                            size={30}
                            left={70}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={style.loadingBar}
                        />正在加载</div> : ""
                    }

                    {
                        this.state.lastPage ? <div style={{...style.loading, marginBottom: 62}}>{"亲爱滴，已经到底了"}</div> : ""
                    }
                </Paper>
                {/*</ReactIScroll>*/}
                {/*</Scroller>*/}
                <MBottomNavigation selectedIndex={0}/>
            </div>
        );
    }

    onScroll(e) {
        if (!this.state.loading) {
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
        this.state.loading = true;
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
            />)
        );
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
