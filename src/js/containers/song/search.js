import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {Paper} from "material-ui";


class Search extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.search.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
    }

    render() {

        return (
            <Paper>
                <SearchHeader getSearchKey={this.search()}/>
            </Paper>
        );
    }

    search(keyword) {
        console.log(keyword);
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
