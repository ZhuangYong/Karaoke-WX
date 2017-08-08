import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import defaultImg from "../../../img/common/tile_default.jpg";
import {
    Avatar, BottomNavigation, BottomNavigationItem, Card, CardTitle, GridList, GridTile, List, ListItem,
    Paper
} from "material-ui";
import navUtils from '../../utils/navUtils';
import sysConfig from '../../utils/sysConfig';

const testaudio = [
    {title: '录音1', 'link': 'home', 'icon': defaultImg},
    {title: '录音2', 'link': 's/p/MzA3', 'icon': defaultImg},
    {title: '录音3', 'link': 'device/devhome', 'icon': defaultImg}
];

class UserIndex extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};

        this.linkTo = this.linkTo.bind(this);
    }

    render() {
        return (
            <div>
                <Paper
                    style={{paddingBottom: "30px"}}
                >
                    <List>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar src={defaultImg}/>
                            }
                        >
                            Image Avatar
                        </ListItem>
                    </List>

                    <BottomNavigation
                    >
                        <BottomNavigationItem
                            label={<div><p style={{margin: "0"}}>绑定设备</p><p style={{margin: "0"}}>未绑定</p></div>}
                            icon={<img src={defaultImg}/>}
                        />
                        <BottomNavigationItem
                            label="我的相册"
                            icon={<img src={defaultImg}/>}
                            onClick={() => {
                                this.linkTo('user/photoAlbum', false, null);
                            }}
                        />
                        <BottomNavigationItem
                            label="意见反馈"
                            icon={<img src={defaultImg}/>}
                        />
                        <BottomNavigationItem
                            label="我的订单"
                            icon={<img src={defaultImg}/>}
                        />
                    </BottomNavigation>
                </Paper>

                <Paper>
                    <Card>
                        <CardTitle
                            style={{paddingBottom: "0"}}
                            title={
                                <div
                                    style={{display: "inline-block", paddingBottom: "0"}}
                                    onClick={() => {
                                        this.linkTo('user/records', false, null);
                                    }}
                                >
                                    <div style={{float: "left"}}>精品推荐</div>
                                    <div style={{float: "right"}}>more</div>
                                </div>
                            }/>
                        <GridList
                            cellHeight={100}
                            style={{margin: "6px"}}
                            cols={3}
                        >
                            {testaudio.map((tile) => (
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
                                >
                                    <div>
                                        <img src={tile.icon}/>
                                    </div>
                                </GridTile>
                            ))}
                        </GridList>
                    </Card>
                </Paper>
                <MBottomNavigation selectedIndex={2}/>
            </div>
        );
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

        if (requireLogin) {
            navUtils.forward(sysConfig.contextPath + '/login');
        } else {
            navUtils.forward(fullLink);
        }
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex));
