/**
 * Created by walljack@163.com on 2017/8/2.
 */

import React from "react";
import {BottomNavigation, BottomNavigationItem, Dialog, FlatButton} from "material-ui";
import {getCookie, getSysConfig, linkTo, linkToPayment, setCookie} from '../../utils/comUtils';
import PropTypes from "prop-types";
import BaseComponent from "./BaseComponent";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import navIndexIcon from "../../../img/common/nav_index.png";
import navIndexOnIcon from "../../../img/common/nav_index_on.png";
import navMeIcon from "../../../img/common/nav_me.png";
import navMeOnIcon from "../../../img/common/nav_me_on.png";
import navControllerIcon from "../../../img/common/nav_controll.png";
import Const from "../../utils/const";
import intl from 'react-intl-universal';

const style = {
    nav: {
        height: "1.4rem",
        position: "fixed",
        borderTop: "1px solid #efeeef",
        bottom: -1,
        zIndex: "5",
        left: 0,
        playController: {
            position: "relative",
            paddingLeft: 0,
            paddingRight: 0,
            circle: {
                position: "absolute",
                top: '-.93rem',
                height: '2.4rem',
                arc: {
                    border: "1px solid #efeeef",
                    position: "absolute",
                    marginLeft: '-.907rem',
                    left: "50%",
                    width: '1.813rem',
                    height: '1.067rem',
                    bottom: '1.1rem',
                    borderRadius: "1.067rem 1.067rem 0 0",
                    backgroundColor: "white"
                },
                maskLine: {
                    height: '1.493rem',
                    borderTop: "1px solid white",
                    width: '1.707rem',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    marginLeft: '-.853rem',
                    backgroundColor: "transparent"
                },
                maskArc: {
                    height: '1.467rem',
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "white"
                },
                icon: {
                    position: "absolute",
                    left: "50%",
                    marginLeft: '-.7rem',
                    width: '1.4rem',
                    height: '1.4rem',
                    bottom: '.56rem',
                    backgroundColor: '#ff6d32',
                    borderRadius: '50%'
                }
            }
        },
        label: {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            bottom: 4,
            left: 0,
            fontSize: ".267rem"
        }
    }
};

class MBottomNavigation extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex,
            showAlert: false
        };
        this.validUserVipDialog = this.validUserVipDialog.bind(this);
    }

    render() {
        const {selectedIndex} = this.state;
        const indexIcon = selectedIndex === 0 ? navIndexOnIcon : navIndexIcon;
        const meIcon = selectedIndex === 2 ? navMeOnIcon : navMeIcon;
        let labelColor = ["#999", "#999", "#999"];
        labelColor[selectedIndex] = "#ff6832";
        return (
            <div>
                <BottomNavigation
                    className="bottom-nav"
                    selectedIndex={selectedIndex}
                    style={style.nav}
                >
                    <BottomNavigationItem
                        style={{paddingTop: '.213rem', paddingBottom: '.113rem', maxWidth: '100%', width: '40%'}}
                        label={<div className={selectedIndex === 0 ? "title on" : "title"} style={{...style.nav.label, color: labelColor[0], bottom: '.107rem'}}>{intl.get("nav.index")}</div>}
                        icon={
                            <div className="nav-item nav-index" style={{height: '.667rem', marginBottom: '.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{height: ".667rem", width: '.62rem'}} className={selectedIndex === 0 ? "on" : ""}/>
                            </div>
                        }
                        onTouchTap={() => selectedIndex !== 0 && this.navSelect(0)}
                    />
                    <BottomNavigationItem
                        style={{...style.nav.playController, maxWidth: '100%', width: '20%'}}
                        label={<div className={selectedIndex === 1 ? "title on" : "title"} style={{...style.nav.label, color: labelColor[1], bottom: '.107rem'}}>{intl.get("nav.controller")}</div>}
                        icon={
                            <div className="nav-item nav-controller" style={style.nav.playController.circle}>
                                <div className="nav-circle-top" style={style.nav.playController.circle.arc}/>
                                <div className="nav-circle-mask-line" style={style.nav.playController.circle.maskLine}/>
                                <div className="nav-circle-mask-arc" style={style.nav.playController.circle.maskArc}/>
                                <div style={style.nav.playController.circle.icon} className={selectedIndex === 1 ? "controller on" : "controller"}/>
                            </div>
                        }
                        onTouchTap={() => selectedIndex !== 1 && this.navSelect(1)}
                    />
                    <BottomNavigationItem
                        style={{paddingTop: '.213rem', paddingBottom: '.113rem', maxWidth: '100%', width: '40%'}}
                        label={<div className={selectedIndex === 2 ? "title on" : "title"} style={{...style.nav.label, color: labelColor[2], bottom: '.107rem'}}>{intl.get("nav.my")}</div>}
                        icon={
                            <div className="nav-item nav-me" style={{height: '.667rem', marginBottom: '.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{height: ".667rem", width: ".667rem"}} className={selectedIndex === 2 ? "on" : ""}/>
                            </div>
                        }
                        onTouchTap={
                            () => {
                                // 如果设备channel在“非过期不能进入充值页面”
                                const config = getSysConfig();
                                const {channel} = this.props.userInfoData || {channel: getCookie("channel") || ""};
                                const {channelList} = config["no-jump-vip-charge-when-in-vip"] || {};
                                if (channel && channelList && channelList.indexOf && channelList.indexOf(channel) >= 0) {
                                    selectedIndex !== 2 && this.navSelect(2);
                                } else {
                                    this.validUserVipDialog(() => {
                                        selectedIndex !== 2 && this.navSelect(2);
                                    });
                                }
                                //selectedIndex !== 2 && this.navSelect(2);
                            }
                        }
                    />
                </BottomNavigation>

                {
                    <div>
                        <Dialog
                            className="dialog-panel"
                            actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                            contentStyle={{textAlign: 'center'}}
                            actions={this.state.actions}
                            modal={false}
                            open={this.state.showAlert}
                            // onRequestClose={handleClose}
                        >
                            {this.state.alertStr}
                        </Dialog>
                    </div>
                }

            </div>
        );
    }

    navSelect(index) {
        this.setState({selectedIndex: index});
        switch (index) {
            case 0:
                linkTo("", false, null);
                break;
            case 1:
                linkTo("controller/", false, null);
                break;
            case 2:
                linkTo("user", false, null);
                break;
            default:
                break;
        }
    }

    validUserVipDialog(callback) {
        const data = this.props.userInfoData || {};
        if (data.hasOwnProperty('time')) {
            callback && callback();
            return "";
        }
        const isBindDevice = this.isBindDevice(this.props.userInfoData);
        const vipAlert = JSON.parse(getCookie("vipAlert") || "{}");
        if (isBindDevice !== true || (vipAlert.lastShowAlertTime && new Date(vipAlert.lastShowAlertTime).getDay() === new Date().getDay())) {
            callback && callback();
            return "";
        }
        let leftBtnStr = intl.get("vip.recharge.immediately");
        let rightBtnStr = intl.get("vip.recharge.later");
        const vipTime = super.vipTime(this.props.userInfoData);
        if (typeof vipTime !== 'string') {
            if (vipTime <= 0) {
                this.state.alertStr = intl.get("vip.has.expired.go.recharge");
            } else if (vipTime > 0 && vipTime < Const.VIP_ALERT_TIME) {
                this.state.alertStr = intl.get("vip.will.expired.go.recharge");
                leftBtnStr = intl.get("vip.renew.now");
                rightBtnStr = intl.get("vip.renew.later");
            } else {
                callback && callback();
                return "";
            }
        } else if (vipTime === '0') {
            this.state.alertStr = intl.get("vip.has.expired.go.recharge");
        } else {
            callback && callback();
            return "";
        }

        const handleClose = () => {
            this.setState({
                showAlert: false
            });
            setCookie("vipAlert", JSON.stringify({lastShowAlertTime: new Date()}));
            callback && callback();
        };
        const handleSure = () => {
            this.setState({
                showAlert: false
            });
            setCookie("vipAlert", JSON.stringify({lastShowAlertTime: new Date()}));
            linkToPayment(this.props.userInfoData);
        };
        this.state.actions = [
            <FlatButton
                label={leftBtnStr}
                className="sure-button"
                primary={true}
                onClick={handleSure}
            />,
            <FlatButton
                label={rightBtnStr}
                className="cancel-button"
                primary={true}
                onClick={handleClose}
            />,
        ];
        this.setState({
            showAlert: true
        });
    }
}

MBottomNavigation.propTypes = {
    selectedIndex: PropTypes.number
};
MBottomNavigation.defaultProps = {
    selectedIndex: 0
};


const mapStateToProps = (state, ownPorps) => {
    return {
        common: state.app.common,
        userInfoData: state.app.user.userInfo.userInfoData
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MBottomNavigation));
