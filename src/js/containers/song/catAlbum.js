/**
 * Created by walljack@163.com on 2017/8/7.
 */
import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getCatAlbum} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {List, ListItem, Paper, Subheader} from "material-ui";
import {bindActionCreators} from "redux";
import {linkTo, reqHeader} from "../../utils/comUtils";
import GradeList from "../../components/common/GradeList";
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
    {id: 'defaultData6', wxPic: blankImg},
    {id: 'defaultData7', wxPic: blankImg},
    {id: 'defaultData8', wxPic: blankImg},
    {id: 'defaultData9', wxPic: blankImg}
];

class CatAlbum extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.categories"));
        this.state = {};
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const param = {id: "home"};

        this.props.action_getCatAlbum(param, reqHeader(param));
    }

    render() {
        const getCatAlbum = this.props.songs.getCatAlbum || {data: {result: [{name: intl.get("topic"), data: defaultData}]}};
        return (
            <Paper zDepth={0} style={{paddingTop: '1.2rem'}}>
                <SearchHeadFake/>
                {
                    getCatAlbum.data.result.map((cats) => {
                        const name = cats.name;
                        const catArr = cats.data;
                        if (name === intl.get("topic")) {
                            return (
                                <Paper key={name} zDepth={0} style={{paddingBottom: 66}}>
                                    <GradeList
                                        data={catArr}
                                        labelKey="name"
                                        idKey="id"
                                        imgKey="wxPic"
                                        linHeadKey="songs/catId/"
                                    />

                                    <MBottomNavigation selectedIndex={-1}/>
                                </Paper>
                            );
                        }

                    })
                }

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
        action_getCatAlbum: bindActionCreators(getCatAlbum, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatAlbum));
