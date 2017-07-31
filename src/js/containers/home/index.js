import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {GridList} from "material-ui/GridList";
import Header from "../../components/common/header";
import NavItem from '../../components/home/navItem';

import navUtils from "../../utils/navUtils";
import BaseComponent from "../../components/common/BaseComponent";
import sysConfig from "../../utils/sysConfig";

import defaultImg from "../../../img/common/tile_default.jpg";

const navList = [
    {title: '分类1', 'link': '/member/home', 'icon': defaultImg, requireLogin: true},
    {title: '分类2', 'link': '/s/p', 'icon': defaultImg, requireLogin: false},
    {title: '分类3', 'link': '/device/devhome', 'icon': defaultImg, requireLogin: true},
    {title: '分类4', 'link': '/subscription/topic', 'icon': defaultImg, requireLogin: true},
    {title: '分类5', 'link': 'http://github.com', 'icon': defaultImg, requireLogin: true},
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
            navList: navList,
            showMsg: false,
            msgText: ''
        };

        this.back = this.back.bind(this);
        this.linkTo = this.linkTo.bind(this);
        this.boundedUpdate = this.boundedUpdate.bind(this);
        this.toExternal = this.toExternal.bind(this);
        this.toLogin = this.toLogin.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.msgOk = this.msgOk.bind(this);
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

    /**
     * 前往指定的页面
     * @param  {[type]} link         页面path
     * @param  {[type]} requireLogin 是否需要登录
     * @return {[type]}              [description]
     */
    linkTo(link, requireLogin, info) {
        let fullLink;
        if (link.indexOf('http') === 0) {
            fullLink = link;
            location.href = link;
            return;
        } else {
            fullLink = sysConfig.contextPath + link;
        }

        console.log(fullLink);

        navUtils.forward(fullLink);
        // if (requireLogin) {
        //     navUtils.forward(sysConfig.contextPath + '/login');
        // } else {
        //     navUtils.forward(fullLink);
        // }
    }

    // 前往登录页面
    toLogin() {
        navUtils.forward(sysConfig.contextPath + '/login');
    }

    // 外链接，跳转到外部页面
    toExternal(url, title, isBbs) {
        location.href = url;
    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    render() {
        let _this = this;
        // 导航按钮块
        let navList = this.state.navList;
        let navItems = [];
        navList.forEach(function (item, index) {
            navItems.push(
                <NavItem
                    linkTo={_this.linkTo}
                    item={item}
                    key={index}/>
            );
        });

        return (

            <div className='home'>

                <Header title={'标题2'} back={this.back}/>

                <GridList
                    cellHeight={100}
                    style={{margin: "6px"}}
                    cols={3}
                >
                    {navItems}
                </GridList>
            </div>
        );
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        common: state.app.user,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
