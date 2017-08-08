/**
 * Created by walljack@163.com on 2017/8/7.
 */
import React from "react";
import {List, Subheader} from "material-ui";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import BaseComponent from "./BaseComponent";
import {reqHeader} from "../../utils/comUtils";
import {connect} from "react-redux";
import SongItem from "./SongItem";
import Scroller from 'silk-scroller';
import "../../../sass/common/Scroller.scss";
import {getActorsAlbum, getCatSongList, getRankAlbum} from "../../actions/audioActons";

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
        }
        this.state = {
            currentPage: 0,
            pageSize: 20,
            id: this.props.singerId || this.props.catId || this.props.hotId,
            dataKey: dataKey,
            queryFun: queryFun,
            stamp: stamp,
            pageData: [],
            lastPage: false
        };
        this.pushSong = this.pushSong.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        if (this.state.currentPage === 0) {
            this.nextPage();
        }
    }

    componentDidUpdate(preProps) {
        const stamp = this.state.stamp;
        if (preProps.songs[stamp] !== this.props.songs[stamp]) {
            const {data} = this.props.songs[this.state.dataKey] || {data: {result: [], lastPage: false}};
            const {result, lastPage} = data;
            this.setState({
                pageData: [...this.state.pageData, ...result],
                lastPage: lastPage
            });
        }
    }

    render() {
        const pageData = this.state.pageData;
        const lastPage = this.state.lastPage;
        // return (
        //     <div style={{height: "100%"}}>
        //         <List>
        //             {pageData.map((song) => (
        //                 <SongItem
        //                     key={song.id}
        //                     song={song}
        //                 />
        //             ))}
        //         </List>
        //         {lastPage && <Subheader>亲爱滴，已经到底了</Subheader>}
        //     </div>
        //
        // );
        return (
            <Scroller
                usePullRefresh
                pullRefreshAction={this.pullRefreshAction.bind(this)}
                useLoadMore
                loadMoreAction={this.loadMoreAction.bind(this)}
                noMoreData={this.state.lastPage}
            >
                <List>{this.getContent()}</List>
            </Scroller>
        );
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {
        this.refreshPage(resolve);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        this.nextPage(resolve);
    }

    /**
     * 获取列表内容
     * */
    getContent() {
        const pageData = this.state.pageData;
        const lastPage = this.state.lastPage;
        return pageData.map((song) => (
                <SongItem
                    key={song.id}
                    song={song}
                />
            )
        );
    }

    pushSong() {
        const song = this.props.song;
        const param = {id: song, type: 4};
        this.props.action_push(param, reqHeader(param));
    }

    nextPage(callback) {
        this.state.currentPage += 1;
        const {currentPage, pageSize, queryFun, id} = this.state;
        const param = {currentPage: currentPage, pageSize: pageSize, id: id};
        queryFun && queryFun(param, reqHeader(param), callback);
    }

    refreshPage(callback) {
        this.setState({
            currentPage: 1,
            pageData: [],
            lastPage: false
        });
        const {currentPage, pageSize, queryFun, id} = this.state;
        const param = {currentPage: currentPage, pageSize: pageSize, id: id};
        queryFun && queryFun(param, reqHeader(param), callback);
    }
}

SongList.defaultProps = {
    singerId: 0,
    catId: 0
};

SongList.propTypes = {
    singerId: PropTypes.number,
    catId: PropTypes.number,
    hotId: PropTypes.number
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
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList));
