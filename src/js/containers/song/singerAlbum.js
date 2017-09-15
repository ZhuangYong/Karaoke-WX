import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingerCategoryAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {GridList, GridTile, List, ListItem, Paper} from "material-ui";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";
import BlankImg from "../../../img/common/blank.png";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import GradeList from "../../components/common/GradeList";

const style = {
    albumImg: {
        height: "2.8rem",
        width: "4.6rem",
        overflow: "hidden",
        backgroundImage: `url(${BlankImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 60%',
        backgroundColor: '#eaeaea',
        backgroundPosition: 'center'
    }
};
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
        const {w} = this.props.common;
        const cellHeight = 3 * w / 10 - 4;
        const cellPadding = 0.267 * w / 10;
        const {getSingerAlbum} = this.props.songs;
        return (
            <Paper zDepth={0} style={{paddingBottom: 66}}>
                <SearchHeadFake/>
                <GridList
                    cellHeight={cellHeight}
                    padding={cellPadding}
                    style={{margin: '0.133rem'}}
                    cols={2}
                    className="singer-album-list"
                >
                    {getSingerAlbum && getSingerAlbum.data && getSingerAlbum.data.result && getSingerAlbum.data.result.map((singer) => (
                        <GridTile
                        className="grade-tile"
                        key={singer.id}
                        title=""
                        titleStyle={{
                        display: "flex",
                        marginRight: "16px",
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: "black",
                        fontSize: ".293rem"
                    }}
                        titleBackground="transparent"
                        onClick={() => {
                        linkTo(`singer/${singer.id}/${singer.name}`, false, null);
                    }}
                        >
                        <div style={{height: "100%"}}>
                            <img className="img-not-loaded" src={singer.wxPic || singer.ottPic} style={{width: "100%", height: "100%", display: "table-cell", margin: "auto"}}/>
                        </div>
                        </GridTile>
                    ))}
                </GridList>
                <MBottomNavigation selectedIndex={0}/>
            </Paper>
        );
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        songs: state.app.songs,
        common: state.app.common
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getSingerCategoryAlbum: bindActionCreators(getSingerCategoryAlbum, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingerAlumb));
