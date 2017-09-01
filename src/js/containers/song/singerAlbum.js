import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingerCategoryAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {List, ListItem, Paper} from "material-ui";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";


class SingerAlumb extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("歌星");
        this.state = {};
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const param = {id: "home"};
        this.props.action_getSingerCategoryAlbum(param, reqHeader(param));
    }

    render() {
        const {getSingerAlbum} = this.props.songs;
        return (
            <Paper zDepth={0}>
                <SearchHeadFake/>
                <List
                    style={{padding: '50px .133rem'}}
                    className="singer-album-list"
                >
                    {getSingerAlbum && getSingerAlbum.data && getSingerAlbum.data.result.map((singer) => (
                        <ListItem
                            innerDivStyle={{padding: '0.133rem'}}
                            key={singer.id}
                            onTouchTap={() => {
                                linkTo(`singer/${singer.id}/${singer.name}`, false, null);
                            }}
                            primaryText={(
                                <div style={{height: "2.8rem", width: "4.6rem", overflow: "hidden"}}>
                                    <img style={{width: "100%"}} src={singer.wxPic || singer.ottPic}/>
                                </div>
                            )}
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
        action_getSingerCategoryAlbum: bindActionCreators(getSingerCategoryAlbum, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingerAlumb));
