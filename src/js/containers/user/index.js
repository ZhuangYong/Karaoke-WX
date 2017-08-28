import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getRecordsList, getUserInfo} from "../../actions/userActions";
import {linkTo, reqHeader, timeToYmd, toRem} from "../../utils/comUtils";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import RecordingGrid from "../../components/recordingGrid/index";
import {findDOMNode} from "react-dom";
import {Avatar, GridList, GridTile} from "material-ui";
import SvgIcon from 'material-ui/SvgIcon';

import defaultImg from "../../../img/common/tile_default.jpg";
import FeedbackIcon from "../../../img/to_feedback.png";
import DeviceIcon from "../../../img/user_device.png";
import HeaderBgIcon from "../../../img/user_header_bg.png";
import VIPIcon from "../../../img/user_vip.png";
import VIPGrayIcon from "../../../img/user_vip_gray.png";
import VIPPayContent from "../../../img/vip_pay_content.png";
import {setGlobAlert} from "../../actions/common/actions";
import ActionTypes from "../../actions/actionTypes";

const styles = {
    headerImg: {
        display: "block",
        margin: `${toRem(40)} auto ${toRem(28)}`,
        width: toRem(60),
        height: toRem(60)
    },
    headerDesc: {
        height: toRem(95),
        textAlign: "center",
        color: "#222",
        lineHeight: "normal",
        fontSize: toRem(24)
    }
};

const RightIcon = (props) => (<SvgIcon
    style={props.style}>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"/>
</SvgIcon>);
const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);

class UserIndex extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("我的");

        this.state = {
            userInfoData: {},
            recordsListTotalCounts: 0,
            recordsListData: []
        };

        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.updateRecordsList = this.updateRecordsList.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.recordsList.recordsListStamp !== this.props.recordsList.recordsListStamp) {
            this.updateRecordsList();
        }
    }

    componentDidMount() {

        if (super.isBindDevice(this.props.userInfo.userInfoData)) {
            const getRecordsListParams = {
                pageSize: 9,
                currentPage: 1
            };
            this.props.getRecordsListActions(getRecordsListParams, reqHeader(getRecordsListParams));
        }
    }

    render() {
        const userInfoData = this.props.userInfo.userInfoData;
        const {data} = userInfoData || {data: {}};
        let {headerImg} = data;
        headerImg = headerImg || "";
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        const recordsList = this.state.recordsListData;
        const recordsListTotalCounts = this.state.recordsListTotalCounts;
        return (
            <div>
                <section>
                    <header style={{
                        width: "100%",
                        height: toRem(230),
                        background: `url(${HeaderBgIcon}) center no-repeat`,
                        backgroundSize: "cover"
                    }}>

                        <Avatar style={{
                            float: "left",
                            marginTop: toRem(22),
                            marginLeft: toRem(60),
                            width: toRem(160),
                            height: toRem(160),
                            border: `${toRem(7)} solid rgba(255, 255, 255, .3)`,
                            backgroundColor: "rgba(255, 255, 255)"
                        }} src={headerImg.slice(0, 4) !== "http" ? defaultImg : headerImg} alt=""/>

                        <div style={{
                            float: "left",
                            paddingTop: toRem(65),
                            marginLeft: toRem(23)
                        }}>
                            <div style={{
                                height: toRem(50),
                                lineHeight: toRem(50),
                                fontSize: toRem(30),
                                color: "#fff"
                            }}>{data.nickName}</div>
                            {this.showVIPStatus(data)}
                        </div>
                    </header>

                    <GridList
                        cellHeight={"auto"}
                        style={{margin: 0, clear: "both"}}
                        cols={2}>

                        <GridTile
                            onTouchTap={() => {
                                if (super.validUserBindDevice(userInfoData, actionSetGlobAlert) !== true) return;
                                actionSetGlobAlert("已绑定，开始点歌吧");
                            }}>
                            <img
                                src={DeviceIcon}
                                style={styles.headerImg}
                            />
                            <div style={styles.headerDesc}>
                                <p style={{margin: "0"}}>绑定设备</p>
                                <p style={{margin: `${toRem(10)} 0 0`, fontSize: toRem(20), color: "#999"}}>
                                    {parseInt(data.isReDevice, 10) === 1 ? "已绑定" + data.deviceId.replace(data.deviceId.slice(4, data.deviceId.length - 4), "***") : '未绑定'}
                                </p>
                            </div>
                        </GridTile>

                        <GridTile
                            onTouchTap={() => {
                                if (super.validUserBindDevice(userInfoData, actionSetGlobAlert) !== true) return;
                                linkTo(`user/feedback/home`, false, null);
                            }}>
                            <img
                                src={FeedbackIcon}
                                style={styles.headerImg}
                            />
                            <div style={styles.headerDesc}>意见反馈</div>
                        </GridTile>
                    </GridList>

                </section>

                {!(data.channel === "nst_yinba") && (<section style={{
                    paddingBottom: " 85px"
                }}>
                    <header style={{
                        width: "100%",
                        height: "55px",
                        borderTop: "5px solid #d9d5d5"
                    }}>
                        <div style={{
                            float: "left",
                            marginLeft: toRem(20),
                            lineHeight: toRem(110),
                            color: "#222",
                            fontSize: toRem(34),
                            fontWeight: "bold"
                        }}>我的录音</div>
                        <div style={{
                                float: "right",
                                marginRight: toRem(20)
                            }}
                            onTouchTap={() => {
                                if (super.validUserBindDevice(userInfoData, actionSetGlobAlert) !== true) return;

                                if (recordsListTotalCounts < 1) {
                                    actionSetGlobAlert("暂无录音");
                                    return;
                                }
                                linkTo(`user/recordings`, false, null);
                            }}>
                            <span style={{
                                lineHeight: toRem(110),
                                color: "#999",
                                fontSize: toRem(24)
                            }}>共{recordsListTotalCounts}首</span>

                            <RightCircleIcon style={{
                                position: "relative",
                                top: toRem(5),
                                marginLeft: toRem(20),
                                color: "#ff7d4f",
                                width: toRem(30),
                                height: toRem(30)
                            }}/>
                        </div>
                    </header>

                    <RecordingGrid data={recordsList}/>
                </section>)}

                <MBottomNavigation selectedIndex={2}/>
            </div>
        );
    }

    updateRecordsList() {
        const {status, data, msg} = this.props.recordsList.recordsListData || {};
        const {result} = data || {result: []};
        this.setState({
            recordsListTotalCounts: data.totalCount,
            recordsListData: result
        });
    }

    updateUserInfo() {
        const {data} = this.props.userInfo.userInfoData || {data: []};
        this.setState({
            userInfoData: data
        });
    }

    showVIPStatus(data) {
        let vipStatus = data.vipStatus;
        const isReDevice = data.isReDevice;

        if (isReDevice !== 1) vipStatus = -1;

        let vipParams = {
            bgColor: vipStatus === 0 ? "rgba(239, 238, 238, .3)" : "rgba(0, 0, 0, .4)",
            imgUrl: vipStatus === 0 ? VIPGrayIcon : VIPIcon,
            content: null,
            contentColor: vipStatus === 0 ? "#909090" : "#f9f02c",
            rightColor: vipStatus === 0 ? "#909090" : "#e0b544",
            _content: (text) => {
                if (!text) {
                    return (<img style={{
                        width: toRem(86),
                        height: toRem(22)
                    }} src={VIPPayContent} alt="VIP充值"/>);
                }
                return (<span style={{
                    position: "relative",
                    top: toRem(-5),
                    lineHeight: toRem(50),
                    fontSize: toRem(20),
                    color: vipParams.contentColor
                }}>{text}</span>);
            }
        };
        switch (vipStatus) {
            case -1:
                vipParams.content = vipParams._content();
                break;
            case 0:
                vipParams.content = vipParams._content("VIP已过期");
                break;
            case 1:
                vipParams.content = vipParams._content(timeToYmd(data.expireTime, ".") + "到期");
                break;
            default:
                vipParams.content = vipParams._content();
                break;
        }
        return (<div
            style={{
                padding: `0 ${toRem(16)}`,
                height: toRem(50),
                backgroundColor: vipParams.bgColor,
                borderRadius: toRem(50)
            }}
            onTouchTap={() => {
                if (super.validUserBindDevice(this.props.userInfo.userInfoData, this.props.action_setGlobAlert) !== true) return;

                if (super.isFreeActivation(this.props.userInfo.userInfoData)) {
                    linkTo(`pay/deviceRegister`, false, null);
                    return;
                }
                linkTo(`pay/home`, false, null);
            }}>
            <img style={{
                marginTop: toRem(11),
                marginRight: toRem(10),
                width: toRem(43),
                height: toRem(27)
            }} src={vipParams.imgUrl} alt=""/>
            {vipParams.content}
            <RightIcon style={{
                marginTop: toRem(14),
                marginLeft: toRem(14),
                color: vipParams.rightColor,
                width: toRem(16.5),
                height: toRem(24)
            }}/>
        </div>);
    }
}


UserIndex.defaultProps = {
    userInfo: {},
    recordsList: {}
};

UserIndex.propTypes = {
    userInfo: PropTypes.object,
    recordsList: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        userInfo: state.app.user.userInfo,
        recordsList: state.app.songs
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userInfoAction: bindActionCreators(getUserInfo, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        getRecordsListActions: bindActionCreators(getRecordsList, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex));
