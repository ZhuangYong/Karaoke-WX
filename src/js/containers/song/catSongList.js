import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Paper} from "material-ui";
import SongList from "../../components/common/SongList";


class CatSongList extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {id} = this.props.match.params;
        const catId = parseInt(id, 10);
        return (
            <Paper zDepth={0}
                   style={{paddingTop: "66px"}}>
                <SearchHeadFake/>
                <SongList catId={catId}/>
            </Paper>
        );
    }
}

export default withRouter(connect(
    () => {
        return {};
    },
    () => {
        return {};
    }
)(CatSongList));

