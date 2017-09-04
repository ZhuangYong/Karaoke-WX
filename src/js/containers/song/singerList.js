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
        marginBottom: 14,
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
    }
};
class SingerList extends BaseComponent {

    constructor(props) {
        super(props);
        const {title} = this.props.match.params || {};
        super.title(title);
        this.state = {
            pageSize: 20,
            pageData: [],
            loading: false,
            currentPage: 0,
            lastPage: false,
            keyWord: "",
            id: 0,
            openHotChoose: false,
            anchorEl: null
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
            this.setState({
                pageData: [...this.state.pageData, ...(result || [])],
                lastPage: lastPage,
                loading: false
            });
        }
    }

    componentDidMount() {
        // http://portal.j-make.cn/singer_catagory/album?currentPage=1&pageSize=20&keyword=&id=3
        // const {currentPage, pageSize, keyWord, id} = this.state;
        // const param = Object.assign({currentPage, pageSize, keyWord, id}, this.props.match.params);
        // this.props.action_getSingerList(param, reqHeader(param));
        if (this.state.currentPage === 0) this.loadMoreAction();
    }

    render() {
        const singerList = this.props.songs.getSingerAlbum;
        const {w, h} = this.props.common;
        const avatarSize = 42 * (w / 375);
        const {keyWord} = this.state;
        return (

            <Paper zDepth={0}>
                <SearchHeadFake/>
                <div
                    className='common-singer-list'
                    style={style.commonSingerList}
                    onScroll={this.onScroll.bind(this)}>

                    <div style={style.hotFilter}>
                        {
                            keyWord || "热门"
                        }

                        <div style={style.hotFilter.icon} onClick={this.handleHotPanel}>
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

                    <List className="single-list" style={{paddingTop: '2.4rem'}}>
                        {this.state.pageData.map((singer) => (
                            <ListItem
                                innerDivStyle={{paddingLeft: '2rem'}}
                                className="single-item"
                                key={singer.id}
                                onTouchTap={() => {
                                    linkTo(`songs/singerId/${singer.id}/${singer.nameNorm}`, false, null);
                                }}
                                leftAvatar={
                                    <Avatar
                                        style={{overflow: 'hidden'}}
                                        src={singer.image}
                                        size={avatarSize}
                                    />
                                }
                                rightIcon={<RightArrowIcon/>}
                                primaryText={<div style={{fontSize: '.4rem'}}>{singer.nameNorm}</div>}
                            />
                        ))}
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
                </div>
            </Paper>
        );
    }

    onScroll(e) {
        if (!this.state.loading && e.target.classList && e.target.classList.contains("common-singer-list")) {
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            if (betweenBottom < 50) {
                this.loadMoreAction();
            }
        }
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const {pageSize, keyWord, id} = this.state;
        const param = Object.assign({currentPage: currentPage, pageSize: pageSize, keyword: keyWord, id: id}, this.props.match.params);
        this.props.action_getSingerList(param, reqHeader(param));
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
            keyWord: key
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
        action_getSingerList: bindActionCreators(getSingerCategoryAlbum, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingerList));
