import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {GridList, GridTile} from "material-ui/GridList";
import Paper from "material-ui/Paper";
import {Card, CardTitle} from "material-ui/Card";
import BaseComponent from "../../components/common/BaseComponent";

import {getRecommend, push} from "../../actions/audioActons";

import SearchHead from "../../components/common/header/searchHeader";
import navUtils from "../../utils/navUtils";
import sysConfig from "../../utils/sysConfig";
import {reqHeader, linkTo} from "../../utils/comUtils";

import defaultImg from "../../../img/common/tile_default.jpg";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import {List, ListItem} from "material-ui";
import {bindActionCreators} from "redux";
import MBottomNavigation from "../../components/common/MBottomNavigation";

const navList1 = [
    {title: '首页', 'link': 'home', 'icon': defaultImg, requireLogin: false},
    {title: 'share', 'link': 's/p/MzA3', 'icon': defaultImg, requireLogin: false},
    {title: '分类3', 'link': 'device/devhome', 'icon': defaultImg, requireLogin: false}
];
const navList2 = [
    {title: '首页', 'link': 'home', 'icon': defaultImg, requireLogin: false},
    {title: 'share', 'link': 's/p/MzA3', 'icon': defaultImg, requireLogin: false},
    {title: '分类3', 'link': 'device/devhome', 'icon': defaultImg, requireLogin: false}
];
const style = {
    tile: {
        width: "90%",
        height: "80%",
        margin: "auto",
        overflow: "hidden"
    },
    tileImg: {
        height: "100%",
        margin: "auto",
        display: "inherit"
    }
};

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultBack: '/',
            navList1: navList1,
            navList2: navList2,
            showMsg: false,
            msgText: ''
        };

        this.back = this.back.bind(this);
        this.boundedUpdate = this.boundedUpdate.bind(this);
        this.toExternal = this.toExternal.bind(this);
        this.toLogin = this.toLogin.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.msgOk = this.msgOk.bind(this);
    }

    componentDidMount() {
        const param = {id: '48'};
        this.props.action_getRecommend(param, reqHeader(param));
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("did updata");
    }

    componentWillUnmount() {
    }

    render() {
        // 导航按钮块
        let navList = this.state.navList;
        const {data} = this.props.songs.recommendSongs || {data: {result: []}};
        return (
            <div className='home' style={{marginBottom: "55px"}}>

                <SearchHead title={'标题2'} back={this.back}/>
                <Paper
                    style={{paddingBottom: "28px"}}
                >
                    <BottomNavigation
                        selectedIndex={this.state.selectedIndex}
                    >
                        <BottomNavigationItem
                            label="分类"
                            icon={<img src={defaultImg}/>}
                        />
                        <BottomNavigationItem
                            label="歌星"
                            icon={<img src={defaultImg}/>}
                        />
                        <BottomNavigationItem
                            label="热歌"
                            icon={<img src={defaultImg}/>}
                        />
                    </BottomNavigation>
                </Paper>

                <Paper
                    style={{marginTop: "8px"}}
                >
                    <Card>
                        <CardTitle
                            style={{paddingBottom: "0"}}
                            title={
                                <div style={{display: "inline-block", paddingBottom: "0"}}>
                                    <div style={{float: "left"}}>精品推荐</div>
                                    <div style={{float: "right"}}>more</div>
                                </div>
                            }/>
                        <GridList
                            cellHeight={100}
                            style={{margin: "6px"}}
                            cols={3}
                        >
                            {navList1.map((tile) => (
                                <GridTile
                                    key={tile.title}
                                    title={tile.title}
                                    titleStyle={{
                                        textAlign: "center",
                                        marginRight: "16px",
                                        marginTop: "20%",
                                        color: "black"
                                    }}
                                    titleBackground="transparent"
                                    onClick={() => {
                                        linkTo(tile.link, tile.requireLogin, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img src={tile.icon} style={style.tileImg}/>
                                    </div>
                                </GridTile>
                            ))}
                        </GridList>
                    </Card>
                </Paper>

                <Paper>
                    <Card>
                        <CardTitle title={
                            <div style={{display: "inline-block"}}>
                                <div style={{float: "left"}}>精品推荐</div>
                                <div style={{float: "right"}}>more</div>
                            </div>
                        }/>
                        <GridList
                            cellHeight={100}
                            style={{margin: "6px"}}
                            cols={3}
                        >
                            {navList2.map((tile) => (
                                <GridTile
                                    key={tile.title}
                                    title={tile.title}
                                    titleStyle={{
                                        textAlign: "center",
                                        marginRight: "16px",
                                        marginTop: "20%",
                                        color: "black"
                                    }}
                                    titleBackground="transparent"
                                    onClick={() => {
                                        linkTo(tile.link, tile.requireLogin, null);
                                    }}
                                >
                                    <div style={style.tile}>
                                        <img src={tile.icon} style={style.tileImg}/>
                                    </div>
                                </GridTile>
                            ))}
                        </GridList>
                    </Card>
                </Paper>

                <Paper>
                    <List>
                        {data.result.map((song) => (
                            <ListItem
                                key={song.id}
                                primaryText={song.nameNorm + (song.charge ? "Vip" : "")}
                                secondaryText={song.actor.map((actor) => (
                                    actor.nameNorm
                                ))}
                                rightToggle={<div onClick={() => {
                                    this.pushSong(song);
                                }}>点歌</div>}
                            />
                        ))}
                    </List>
                </Paper>

                <MBottomNavigation selectedIndex={0}/>
            </div>
        );
    }

    pushSong(song) {
        const param = {id: song, type: 4};
        this.props.action_push(param, reqHeader(param));
    }

    msgOk() {
        this.setState({
            showMsg: false
        });
    }

    showMsg(msg) {
        this.setState({
            msgText: msg,
            showMsg: true
        });
    }

    // 绑定到当前组件上的forceUpdate方法，微信登录成功后调用
    boundedUpdate() {
        this.forceUpdate();
    }

    // 后退
    back() {
        navUtils.goBack(this.state.defaultBack);
    }

    // 前往登录页面
    toLogin() {
        navUtils.forward(sysConfig.contextPath + '/login');
    }

    // 外链接，跳转到外部页面
    toExternal(url, title, isBbs) {
        location.href = url;
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
        action_push: bindActionCreators(push, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
