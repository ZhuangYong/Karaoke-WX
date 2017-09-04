import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../../actions/searchActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {Paper, Subheader} from "material-ui";
import {bindActionCreators} from "redux";
import SongList from "../../components/common/SongList";

const style = {
    searchWord: {
        maxWidth: '6rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap'
    }
};
class Search extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("搜索");
        this.state = {
            keyword: ""
        };
        this.search = this.search.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
        const {keyword} = this.props.match.params;
        this.search(keyword);
    }

    render() {
        const {keyword} = this.props.match.params;
        return (
            <Paper zDepth={0}>
                <SearchHeader defaultKeyWord={keyword} getSearchKey={this.search} inputIng={!keyword}/>
                {this.state.keyword ? <Paper style={{position: "absolute", top: 44, width: "100%", zIndex: 1}}>
                    <Subheader style={{display: 'flex', alignItems: 'center'}}>
                        “{<font style={style.searchWord}>{this.state.keyword}</font> }” <font>的搜索结果</font>
                    </Subheader>
                </Paper> : ""}
                <div style={{paddingTop: 86}}>
                    <SongList keyword={this.state.keyword} search={true}/>
                </div>
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
