import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingerCategoryAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {GridList, GridTile, Paper} from "material-ui";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import intl from 'react-intl-universal';

const blankImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
const defaultData = [
    {id: 'defaultData0', wxPic: blankImg},
    {id: 'defaultData1', wxPic: blankImg},
    {id: 'defaultData2', wxPic: blankImg},
    {id: 'defaultData3', wxPic: blankImg},
    {id: 'defaultData4', wxPic: blankImg},
    {id: 'defaultData5', wxPic: blankImg},
    {id: 'defaultData6', wxPic: blankImg}
];
class SingerAlumb extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.artists"));
        this.state = {};
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const param = {id: "home"};
        this.props.action_getSingerCategoryAlbum(param, reqHeader(param));
    }

    render() {
        const {w, h} = this.props.common;
        let cellHeight = 3 * w / 10 - 8;
        let cellPadding = 0.267 * w / 10;
        const {getSingerAlbum} = this.props.songs;
        let rowNumber = 2;
        if (w >= 568 && h < w) {
            rowNumber = 3;
            cellPadding = 0.16 * w / 10;
            cellHeight = 2 * w / 10 - 8;
        }
        const listData = (getSingerAlbum && getSingerAlbum.data && getSingerAlbum.data.result) || defaultData;
        return (
            <Paper zDepth={0} style={{paddingBottom: 66}}>
                <SearchHeadFake/>
                <GridList
                    cellHeight={cellHeight}
                    padding={cellPadding}
                    style={{margin: '0.133rem'}}
                    cols={rowNumber}
                    className="singer-album-list"
                >
                    {listData.map((singer) => (
                        <GridTile
                        className="grade-tile img-not-loaded"
                        key={singer.id || singer.serialNo}
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
                            if (singer.name) linkTo(`singer/${singer.id || singer.serialNo}/${singer.name}`, false, null);
                        }}
                        >
                        <div>
                            <img src={singer.wxPic || singer.ottPic} style={{width: "100%", height: "100%", display: "table-cell", margin: "auto"}}/>
                        </div>
                        </GridTile>
                    ))}
                </GridList>
                <MBottomNavigation selectedIndex={-1}/>
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
