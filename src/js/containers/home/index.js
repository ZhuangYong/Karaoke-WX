import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import Header from "../../components/common/header";
import Tips from "../../components/common/tips";
import NavItem from "../../components/home/navItem";

import navUtils from "../../utils/navUtils";
import * as userActions from "../../actions/userActions";
import BaseComponent from "../../components/common/BaseComponent";

let navList = [
    {'info': '内链1', 'link': '/member/home', 'icon': 'hyzq', requireLogin: true},
    {'info': 'play', 'link': '/s/p', 'icon': 'jfsc', requireLogin: false},
    {'info': '内链2', 'link': '/device/devhome', 'icon': 'sbfw', requireLogin: true},
    {
        'info': '外链2',
        'link': 'http://www.youku.com',
        'icon': 'zswk',
        requireLogin: true
    },
    {'info': '内链3', 'link': '/subscription/topic', 'icon': 'wddy', requireLogin: true},
    {'info': '内链3', 'link': 'http://github.com', 'icon': 'cpsy', requireLogin: true},
];

/*
 if (location.href.match(/test\.club\.changhong\.com/)) {
 navList[1].link = 'tjf.changhong.com:9090';
 navList[3].link = 'http://tbbs.chiq-cloud.com/portal.php?mod=list&catid=20';
 navList[5].link = 'http://tbbs.chiq-cloud.com/plugin.php?id=tryout';
 }
 */

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultBack: '/',
            showUnreadDot: 'none',
            recomData: [],
            noRecom: false,
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
        if (link.indexOf('http') == 0) {
            fullLink = link;
            location.href = link;
            return;
        } else {
            fullLink = HYAPP.ContextPath + link;
        }

        if (requireLogin) {
            if (HYAPP.user.openId && HYAPP.user.token) {
                if (link == '/subscription/topic') {
                    this.subscriptionPathChk(link);
                } else {
                    navUtils.forward(fullLink);
                }
            } else {
                // this.props.actions.loginFirst(fullLink);
                if (HYAPP.ssoLogin) {
                    this.toSsoLogin();
                } else {
                    navUtils.forward(HYAPP.ContextPath + '/login/signin');
                }
            }
        } else {
            navUtils.forward(fullLink);
        }
    }


    // 前往登录页面
    toLogin() {
        navUtils.forward(HYAPP.ContextPath + '/login/signin');
    }

    // 外链接，跳转到外部页面
    toExternal(url, title, isBbs) {
        location.href = url;
    }


    componentDidMount() {
        let _this = this;

    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    removeLoginCookie() {
        (function delCookie(name) {
            let exp = new Date();
            exp.setTime(exp.getTime() - 1);
            let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            let arr = document.cookie.match(reg);
            if (arr) {
                let cval = unescape(arr[2]);
                (cval !== null) && (document.cookie = name + "=" + escape(cval) + ";path=/;expires=" + exp.toGMTString() + ";domain=.changhong.com");
            }
        })("KI4SO_SERVER_EC");
    }

    render() {
        let user = this.props.user || {} ;
        let userinfo = user.userinfo && user.userinfo.code === '000000' && user.userinfo.data || {};
        let scoreinfo = user.scoreinfo && user.scoreinfo.code === '000000' && user.scoreinfo.data || {};

        // 导航按钮块
        let navList = this.state.navList;
        let navItems = [];
        let linkTo = this.linkTo;
        navList.forEach(function (item, index) {
            navItems.push(
                <NavItem
                    linkTo={linkTo}
                    item={item}
                    middle={(index - 1) % 3 == 0}
                    key={index}/>
            );
        });

        let navItemUp = navItems.slice(0, 3);
        let navItemDown = navItems.slice(3);

        return (

            <div className='home'>

                <Header title={'标题2'} back={this.back}/>

                <div className="info-board">
                    <div className="user-info ft36">
                        <div className="inline" onClick={this.userInfo}>
                            <img className="home-avatar" src="" alt="头像"/>
                            <span className="account-name">userAccountName</span>
                        </div>


                        <div className="inline msg-icon fr" onClick={this.toNews}>
                            <span className="msg-dot" style={{display: this.state.showUnreadDot}}/>
                        </div>

                        <div className="inline login-btn fr" style={{display: 'none'}} onClick={this.toLogin}>登录</div>
                        <div className="inline login-btn fr"
                             onClick={this.toSsoLogin}>登录
                        </div>
                    </div>
                </div>

                <Link to='login'>test link</Link>
                <div className="nav-board ft36">
                    <div className="" style={{overflow: 'hidden'}}>{navItemUp}</div>
                    <div className="" style={{overflow: 'hidden'}}>{navItemDown}</div>
                </div>

                <div className="gap"/>
                <Tips
                    show={this.state.showMsg}
                    text={this.state.msgText}
                    ok={this.msgOk}
                />
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
    return {
        userAction: bindActionCreators(userActions, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
