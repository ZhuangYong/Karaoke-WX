import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeadFake from "../../components/common/header/searchHeaderFake";
import {Paper} from "material-ui";
import DSongList from "../../components/common/SongList";


class SongList extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let props = {};
        const {type, id} = this.props.match.params;
        props[type] = parseInt(id, 10);
        return (
            <Paper zDepth={0}
                   style={{paddingTop: "66px"}}>
                <SearchHeadFake/>
                <DSongList containerStyle={{top: 66}} {...props}/>
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
)(SongList));

