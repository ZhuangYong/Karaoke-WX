import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../../actions/searchActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {reqHeader} from "../../utils/comUtils";
import {List, ListItem, Paper, Subheader} from "material-ui";
import {bindActionCreators} from "redux";
import ReactDOM from "react-dom";
import SongList from "../../components/common/SongList";


class Search extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
        this.search = this.search.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
    }

    render() {
        return (
            <Paper zDepth={0}>
                <SearchHeader getSearchKey={this.search}/>
                {this.state.keyword ? <Paper style={{position: "absolute", top: 44, width: "100%", zIndex: 4}}>
                    <Subheader>
                        “{this.state.keyword}” 的搜索结果
                    </Subheader>
                </Paper> : ""}
                <SongList containerStyle={{top: 86}} keyword={this.state.keyword} search={true}/>

            </Paper>
        );
    }

    search(keyword) {
        this.setState({
            keyword: keyword
        });
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        hotKeys: state.app.search
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_search: bindActionCreators(search, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
