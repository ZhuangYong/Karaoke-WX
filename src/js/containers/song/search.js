import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../../actions/searchActons";
import BaseComponent from "../../components/common/BaseComponent";
import SearchHeader from "../../components/common/header/searchHeader";
import {reqHeader} from "../../utils/comUtils";
import {List, ListItem, Paper} from "material-ui";
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
        // this.handelTouchSearchList = this.handelTouchSearchList.bind(this);
    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
    }

    render() {
        // const {searchResult} = this.props.hotKeys;
        return (
            <Paper zDepth={0}>
                <SearchHeader getSearchKey={this.search}/>
                {/*<List
                 style={{paddingTop: "66px", height: "100%"}}
                 onTouchStart={this.handelTouchSearchList}
                 >
                 {searchResult && searchResult.data.result.map((song) => (
                 <ListItem
                 key={song.id}
                 primaryText={song.nameNorm + (song.charge ? "Vip" : "")}
                 secondaryText={song.actor.map((actor) => (
                 actor.nameNorm
                 ))}
                 rightToggle={<div onTouchTap={() => {
                 this.pushSong(song);
                 }}>点歌</div>}
                 />
                 ))}
                 </List>*/}

                <SongList containerStyle={{top: 66}} keyword={this.state.keyword} search={true}/>
            </Paper>
        );
    }

    search(keyword) {
        // const param = {keyword: keyword, type: 'actorAndMedias'};
        // this.props.action_search(param, reqHeader(param));
        this.setState({
            keyword: keyword
        });
    }

    // handelTouchSearchList() {
    //     const searchHeader = ReactDOM.findDOMNode(this.refs.searchHeader);
    //     console.log(searchHeader);
    // }
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
