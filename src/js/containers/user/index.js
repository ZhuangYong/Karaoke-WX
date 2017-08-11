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

    get editRecord() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.editRecord);
    }

    componentDidUpdate(preProps) {
        if (preProps.userInfo.userInfoStamp !== this.props.userInfo.userInfoStamp) {
            this.updateUserInfo();
        }
        if (preProps.recordsList.recordsListStamp !== this.props.recordsList.recordsListStamp) {
            this.updateRecordsList();
        }
    }

    componentDidMount() {
        const userInfoParams = {};
        this.props.userInfoAction(userInfoParams, reqHeader(userInfoParams));

        const getRecordsListParams = {
            pageSize: 9,
            currentPage: 1
        };
        this.props.getRecordsListActions(getRecordsListParams, reqHeader(getRecordsListParams));
    }

    render() {
        const userInfo = this.state.userInfoData;
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
                            secondaryText={<RaisedButton>
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
                                linkTo('user/feedback', false, null);
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
                            iconElementRight={<RaisedButton
                                backgroundColor="#ccc"
                                onTouchTap={() => {
                                    linkTo("user/records", false, null);
                                }}
                            >
                                共{recordsListTotalCounts}首 >
                            </RaisedButton>}
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
                                            this.editRecord.style.bottom = 0;
                                            this.editRecord.style.opacity = 1;
                                        }}
                                    />}
                                >

                                    <img
                                        src={tile.image}
                                        onError={function (e) {
                                            e.target.src = defaultImg;
                                        }}
                                        onTouchTap={() => {
                                            linkTo(`s/p/${tile.uid}`, false, null);
                                        }}
                                    />
                                </GridTile>
                            ))}
                        </GridList>
                    </Card>
                </Paper>

                <div
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
                </div>
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
        userInfo: state.app.user,
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
