import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getRecordsList, getUserInfo} from "../../actions/userActions";
import {linkTo, reqHeader, timeToYmd} from "../../utils/comUtils";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {findDOMNode} from "react-dom";
import defaultImg from "../../../img/common/tile_default.jpg";
import {
    Avatar, BottomNavigation, BottomNavigationItem, Card, CardTitle, GridList, GridTile, List, ListItem,
    Paper
} from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import OperateIcon from "material-ui/svg-icons/navigation/more-horiz";

import SvgIconFace from 'material-ui/svg-icons/action/face';
class UserIndex extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            userInfoData: {},
            recordsListTotalCounts: 0,
            recordsListData: []
        };

        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.updateRecordsList = this.updateRecordsList.bind(this);
    }

    /*get editRecord() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.editRecord);
    }*/

    componentDidUpdate(preProps) {
        // if (preProps.userInfo.userInfoStamp !== this.props.userInfo.userInfoStamp) {
        //     this.updateUserInfo();
        // }
        if (preProps.recordsList.recordsListStamp !== this.props.recordsList.recordsListStamp) {
            this.updateRecordsList();
        }
    }

    componentDidMount() {
        // const userInfoParams = {};
        // this.props.userInfoAction(userInfoParams, reqHeader(userInfoParams));

        const getRecordsListParams = {
            pageSize: 9,
            currentPage: 1
        };
        this.props.getRecordsListActions(getRecordsListParams, reqHeader(getRecordsListParams));
    }

    render() {
        const {data} = this.props.userInfo.userInfoData || {data: []};
        const userInfo = data;
        const recordsList = this.state.recordsListData;
        const recordsListTotalCounts = this.state.recordsListTotalCounts;
        return (
            <div>
                <Paper
                    style={{paddingBottom: "30px"}}
                >
                    <List>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar src={userInfo.headerImg}/>
                            }
                            primaryText={userInfo.nickName}
                            secondaryText={<RaisedButton
                                onTouchTap={() => {
                                    linkTo(`pay/home`, false, null);
                                }}
                            >
                                {this.showVIPStatus()}
                            </RaisedButton>}
                        />
                    </List>

                    <BottomNavigation
                    >
                        <BottomNavigationItem
                            label={<div>
                                <p style={{margin: "0"}}>绑定设备</p>
                                <p style={{margin: "0"}}>{parseInt(userInfo.isReDevice, 10) === 1 ? '已绑定' : '未绑定'}</p>
                            </div>}
                            icon={<img src={defaultImg}/>}
                        />
                        <BottomNavigationItem
                            label="我的相册"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo('user/photoAlbum', false, null);
                            }}
                        />
                        <BottomNavigationItem
                            label="意见反馈"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo('user/feedback/home', false, null);
                            }}
                        />
                        <BottomNavigationItem
                            label="我的订单"
                            icon={<img src={defaultImg}/>}
                            onTouchTap={() => {
                                linkTo('user/orderForm', false, null);
                            }}
                        />
                    </BottomNavigation>
                </Paper>

                <Paper>
                    <Card>
                        <AppBar
                            style={{backgroundColor: "#fff"}}
                            titleStyle={{color: "#000"}}
                            title="我的录音"
                            showMenuIconButton={false}
                            iconElementRight={<div
                                style={{marginTop: "-8px"}}
                                onTouchTap={() => {
                                    linkTo("user/recordings", false, null);
                                }}
                            >

                                <span
                                    style={{
                                        lineHeight: "64px",
                                        fontSize: "18px",
                                        color: "#959293"
                                    }}>共{recordsListTotalCounts}首</span>
                                <svg
                                    viewBox="0 0 32 32"
                                    style={{
                                        display: "inline-block",
                                        marginLeft: "6px",
                                        marginBottom: "-3px",
                                        marginRight: "3px",
                                        color: "#e48265",
                                        fill: "currentcolor",
                                        height: "20px",
                                        width: "20px",
                                        userSelect: "none",
                                        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}>
                                    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
                                </svg>
                            </div>}
                        />
                        <GridList
                            cellHeight={100}
                            style={{margin: "6px"}}
                            cols={3}
                        >
                            {recordsList.map((tile) => (
                                <GridTile
                                    key={tile.uid}
                                    title={tile.nameNorm}
                                    titleStyle={{fontSize: "12px"}}
                                    actionIcon={<OperateIcon
                                        color="#fff"
                                        onTouchTap={() => {

                                            /*this.editRecord.style.bottom = 0;
                                            this.editRecord.style.opacity = 1;*/
                                        }}
                                    />}
                                >
                                    <img
                                        src={tile.image}
                                        onError={function (e) {
                                            e.target.src = defaultImg;
                                        }}
                                        onTouchTap={() => {
                                            linkTo(`user/recordings/play/${tile.uid}`, false, null);
                                        }}
                                    />
                                </GridTile>
                            ))}
                        </GridList>
                    </Card>
                </Paper>

                {/*<div
                    ref="editRecord"
                    style={{position: "fixed", bottom: "-80px", left: 0, width: "100%", height: "80px", backgroundColor: "red", zIndex: 1, opacity: 0, transition: "bottom 1s, opacity 1s"}}
                >
                    <RaisedButton
                        label="更换封面"
                        style={{width: "50%", height: "100%"}}
                        onTouchTap={() => {
                            linkTo("user/photoAlbum", false, null);
                        }}
                    />
                    <RaisedButton
                        label="删除"
                        style={{width: "50%", height: "100%"}}
                    />
                </div>*/}
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

    showVIPStatus() {
        const userInfo = this.state.userInfoData;
        let vipStatus = '';
        switch (userInfo.vipStatus) {
            case -1:
                vipStatus = "暂时不是VIP哟";
                break;
            case 0:
                vipStatus = "VIP已过期";
                break;
            case 1:
                vipStatus = 'VIP到期时间: ' + timeToYmd(userInfo.expireTime);
                break;
            default:
                vipStatus = "VIP";
                break;
        }
        return vipStatus;
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
        getRecordsListActions: bindActionCreators(getRecordsList, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex));
