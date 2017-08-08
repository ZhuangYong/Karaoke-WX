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

const testaudio = [
    {title: '录音1', 'link': 'home', 'icon': defaultImg},
    {title: '录音2', 'link': 's/p/MzA3', 'icon': defaultImg},
    {title: '录音3', 'link': 'device/devhome', 'icon': defaultImg}
];

class UserIndex extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
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
                            label="VIP充值"
                            icon={<img src={defaultImg}/>}
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

}

const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex));
