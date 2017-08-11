import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingerCategoryAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Avatar, List, ListItem, Paper} from "material-ui";
import RightArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";


class SingerList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 20,
            keyWord: "",
            id: 0
        };
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        // http://portal.j-make.cn/singer_catagory/album?currentPage=1&pageSize=20&keyword=&id=3
        const {currentPage, pageSize, keyWord, id} = this.state;
        const param = Object.assign({currentPage, pageSize, keyWord, id}, this.props.match.params);
        this.props.action_getSingerList(param, reqHeader(param));
    }

    render() {
        const singerList = this.props.songs.getSingerAlbum;
        return (

            <Paper zDepth={0}>
                <SearchHeadFake/>
                <List style={{paddingTop: "66px", height: "100%"}}>
                    {singerList && singerList.data && singerList.data.result.map((singer) => (
                        <ListItem
                            key={singer.id}
                            onTouchTap={() => {
                                linkTo(`songs/singerId/${singer.id}`, false, null);
                            }}
                            leftAvatar={
                                <Avatar
                                    src={singer.image}
                                    size={30}
                                />
                            }
                            rightIcon={<RightArrowIcon/>}
                            primaryText={singer.nameNorm}
                        />
                    ))}
                </List>
            </Paper>
        );
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        songs: state.app.songs
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getSingerList: bindActionCreators(getSingerCategoryAlbum, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingerList));
