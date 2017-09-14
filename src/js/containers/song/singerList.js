import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingerCategoryAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Avatar, List, ListItem, Paper, Popover, RefreshIndicator} from "material-ui";
import RightArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";
import ArrowDownIcon from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import Const from "../../utils/const";
import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import {setSingerList} from "../../actions/common/actions";
import NoResult from "../../components/common/NoResult";
import NoWifi from "../../components/common/NoWifi";
import NoNetworkImg from "../../../img/common/bg_no_network.png";

const style = {
    commonSingerList: {
        position: "absolute",
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: 30,
        fontSize: "14px",
        marginBottom: 84,
        alignItems: "center"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    },
    hotFilter: {
        position: 'absolute',
        top: '1.7rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: '.4rem',
        color: '#ff6832',
        icon: {
            width: '.5rem',
            display: 'flex',
            height: '.5rem',
            borderRadius: '50%',
            marginLeft: '.267rem',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ff6832'
        }
    },
    scrollToTop: {
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '1.5rem',
        backgroundColor: "rgba(255, 104, 50, 0.76)",
        position: "fixed",
        bottom: '2.9rem',
        right: '1rem',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};
class SingerList extends BaseComponent {

    constructor(props) {
        super(props);
        const {id, title} = this.props.match.params || {};
        super.title(title);
        const cacheId = this.props.common.singerList.id;
        const {pageData, loading, currentPage, lastPage, keyWord, scrollTop} = cacheId === id ? this.props.common.singerList : {};
        this.state = {
            pageSize: 20,
            pageData: pageData || [],
            loading: loading || false,
            currentPage: currentPage || 0,
            lastPage: typeof lastPage !== "undefined" ? lastPage : false,
            keyWord: typeof keyWord !== "undefined" ? keyWord : "",
            id: id,
            openHotChoose: false,
            anchorEl: null,
            cacheData: {},
            scrollTop: scrollTop || 0,
            initialScrollTop: false,
            dataLoaded: false,
            offLine: false
        };
        this.onScroll = this.onScroll.bind(this);
        this.getHotKey = this.getHotKey.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);
        this.handleHotPanel = this.handleHotPanel.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.songs.getSingerAlbumStamp !== this.props.songs.getSingerAlbumStamp) {
            const {data} = this.props.songs.getSingerAlbum || {data: {result: [], lastPage: false}};
            const {result, lastPage} = data;
            const pageData = [...this.state.pageData, ...(result || [])];
            const cacheData = {
                id: this.state.id,
                pageData: pageData,
                lastPage: lastPage,
                currentPage: this.state.currentPage,
                keyWord: this.state.keyWord
            };
            this.setState({
                pageData: pageData,
                lastPage: lastPage,
                loading: false,
                cacheData: cacheData,
                dataLoaded: true,
                offLine: false
            });

            this.props.action_setSingerList(cacheData);
        }
    }

    componentDidMount() {
        // http://portal.j-make.cn/singer_catagory/album?currentPage=1&pageSize=20&keyword=&id=3
        // const {currentPage, pageSize, keyWord, id} = this.state;
        // const param = Object.assign({currentPage, pageSize, keyWord, id}, this.props.match.params);
        // this.props.action_getSingerList(param, reqHeader(param));
        if (!this.state.initialScrollTop) {
            console.log(this.state.scrollTop);
            const {scrollTop} = this.state;
            if (scrollTop) this.refs.commSingerList.scrollTop = scrollTop;
            const cacheData = {
                id: this.state.id,
                pageData: this.state.pageData,
                lastPage: this.state.lastPage,
                currentPage: this.state.currentPage,
                keyWord: this.state.keyWord
            };
            this.state.cacheData = cacheData;
            this.state.initialScrollTop = true;
        }
        if (this.state.currentPage === 0) this.loadMoreAction();
    }

    render() {
        const singerList = this.props.songs.getSingerAlbum;
        const {w, h} = this.props.common;
        const avatarSize = 42 * (w / 375);
        const {keyWord} = this.state;
        return (

            <Paper zDepth={0}>
                <img src={NoNetworkImg} style={{display: 'none'}}/>
                <SearchHeadFake/>
                <div
                    ref="commSingerList"
                    className='common-singer-list'
                    style={style.commonSingerList}
                    onScroll={this.onScroll.bind(this)}>

                    <div style={style.hotFilter}>
                        {
                            keyWord || "热门"
                        }

                        <div style={style.hotFilter.icon} onTouchTap={this.handleHotPanel}>
                            <ArrowDownIcon color="#ff6832"/>
                        </div>

                        <Popover
                            style={{boxShadow: 'rgba(128, 128, 128, 0.51) 1px 1px 20px 3px'}}
                            open={this.state.openHotChoose}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                            onRequestClose={() => {
                                this.setState({
                                    openHotChoose: false,
                                });
                            }}
                        >
                            <div className="hot-key">
                                {this.getHotKey()}
                            </div>
                        </Popover>
                    </div>

                    {
                        (this.state.offLine && this.state.currentPage !== 0 && this.state.pageData.length === 0) ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                    }

                    {
                        (this.state.dataLoaded && this.state.currentPage >= 1 && this.state.pageData.length === 0) ? <NoResult style={{position: 'absolute', top: '-1rem'}}/> : <div>
                            <List className="single-list" style={{paddingTop: '2.4rem'}}>
                                {this.state.pageData.map((singer) => (
                                    <ListItem
                                        innerDivStyle={{paddingLeft: '2rem', paddingTop: '.553rem'}}
                                        className="single-item"
                                        key={singer.id}
                                        onClick={() => {
                                            let {cacheData, scrollTop} = this.state;
                                            cacheData.scrollTop = scrollTop;
                                            this.props.action_setSingerList(cacheData);
                                            linkTo(`songs/singerId/${singer.id}/${singer.nameNorm}`, false, null);
                                        }}
                                        leftAvatar={
                                            <Avatar
                                                style={{overflow: 'hidden', height: '1.12rem', width: '1.12rem'}}
                                                src={singer.image}
                                                size={avatarSize}
                                            />
                                        }
                                        rightIcon={<RightArrowIcon style={{top: '.01rem', margin: '.4rem', height: '.64rem', width: '.64rem'}}/>}
                                        primaryText={<div style={{fontSize: '.4rem'}}>{singer.nameNorm}</div>}
                                    />
                                ))}
                            </List>
                            <div style={style.loading}>
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
                        </div>
                    }
                </div>

                {
                    this.state.needScrollToTop ? <div style={style.scrollToTop} onClick={() => {
                        this.scrollTo(0);
                    }}>
                        <ScrollToTopIcon color="white"/>
                    </div> : ""
                }

                <MBottomNavigation selectedIndex={0}/>
            </Paper>
        );
    }

    onScroll(e) {
        if (!this.state.loading && e.target.classList && e.target.classList.contains("common-singer-list")) {
            this.state.scrollTarget = e.target;
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            this.state.scrollTop = e.target.scrollTop;
            if (betweenBottom < 50) {
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
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const {pageSize, keyWord, id} = this.state;
        const param = Object.assign({currentPage: currentPage, pageSize: pageSize, keyword: keyWord, id: id}, this.props.match.params);
        this.props.action_getSingerList(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    refreshPage() {
        this.setState({
            pageData: []
        });
        this.state.currentPage = 0;
        this.state.loading = false;
        this.state.lastPage = false;
        this.loadMoreAction();
    }

    handleHotPanel(event) {
        event.preventDefault();
        this.setState({
            openHotChoose: true,
            anchorEl: event.currentTarget,
        });
    }

    getHotKey() {
        const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const {keyWord} = this.state;
        let keyStr = [];
        keyStr.push(
            keyWord === '' ? <p className="active" key={'热门'}>
                {<font style={{fontSize: '.4rem'}}>热门</font>}
            </p> : <p onClick={() => {
                this.chooseKey('');
            }} key={'热门'}>
                {<font style={{fontSize: '.4rem'}}>热门</font>}
            </p>
        );
        for (let key of keys) {
            if (keyWord === key) {
                keyStr.push(
                    <p className="active" key={key}>
                        {key}
                    </p>
                );
            } else {
                keyStr.push(
                    <p onClick={() => {
                        this.chooseKey(key);
                    }} key={key}>
                        {key}
                    </p>
                );
            }
        }
        return keyStr;
    }

    chooseKey(key) {
        this.setState({
            openHotChoose: false,
            keyWord: key,
            dataLoaded: false
        });
        this.state.keyWord = key;
        this.refreshPage();

    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        songs: state.app.songs,
        common: state.app.common
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getSingerList: bindActionCreators(getSingerCategoryAlbum, dispatch),
        action_setSingerList: bindActionCreators(setSingerList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingerList));
