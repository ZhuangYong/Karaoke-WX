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


class CatAlbum extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const param = {id: "home"};

        this.props.action_getCatAlbum(param, reqHeader(param));
    }

    render() {
        const {getCatAlbum} = this.props.songs;
        return (
            <Paper zDepth={0} style={{paddingTop: 44}}>
                <SearchHeadFake/>
                {
                    getCatAlbum && getCatAlbum.data.result.map((cats) => {
                        const name = cats.name;
                        const catArr = cats.data;
                        if (name === "主题") {
                            return (
                                <Paper key={name} zDepth={0}>
                                    <GradeList
                                        data={catArr}
                                        labelKey="name"
                                        idKey="id"
                                        imgKey="wxPic"
                                        linHeadKey="songs/catId/"
                                    />
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
