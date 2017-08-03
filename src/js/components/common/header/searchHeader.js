import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import variables from "../../../../sass/common/searchHeader.scss";
import {AppBar, Chip, FlatButton, List, ListItem, Paper, Subheader} from "material-ui";
import {getHotWords, search} from "../../../actions/searchActons";
import DelIcon from "material-ui/svg-icons/content/clear";

import {reqHeader, getCookie, setCookie} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

const styles = {
    title: {
        width: "100%",
        display: "inline-block",
        textAlign: "center"
    }
};
// 通用头部组件，包含标题和一个返回按钮
class SearchHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputting: false,
            searchKey: "",
            searchHistory: getCookie("searchHistory")
        };
        this.handelBlur.bind(this);
        this.handelFocus.bind(this);
        this.handelDelHistoryWord.bind(this);
    }

    componentDidMount() {
        const param = {};
        this.props.action_getKeyWord(param, reqHeader(param));
        // const input = ReactDom.findDOMNode(this.refs.input);
        // input.click && input.click();
    }

    render() {
        // const showHelper = this.state.inputting ? "block" : "none";
        const {hotKeyWords} = this.props.hotKeys;
        const showHelper = "block";
        const showSearchButton = this.state.searchKey ? "" : "none";
        const searchHistory = this.state.searchHistory ? this.state.searchHistory.split(",").map((word) => decodeURIComponent(word)) : [];
        return (
            <div className="search-header">
                <AppBar
                    style={{height: variables.barBaseHeight, backgroundColor: "white", boxShadow: "none"}}
                    titleStyle={{height: variables.barBaseHeight, lineHeight: variables.barBaseHeight}}
                    iconElementLeft={<span/>}
                    iconElementRight={<span/>}
                    title={
                        <span style={styles.title}>
                            <Input
                                ref="input"
                                value={this.state.searchKey}
                                autoFocus="autoFocus"
                                hintText="请输入你要找的歌曲或歌星"
                                onBlur={this.handelBlur.bind(this)}
                                onFocus={this.handelFocus.bind(this)}
                                bindState={this.bindState("searchKey")}/>
                            <FlatButton label="搜索" style={{display: showSearchButton}}
                                        onTouchTap={this.handelSearch.bind(this)}/>
                        </span>
                    }
                />

                <div style={{display: showHelper}}>
                    <Paper className="search-words">
                        <Subheader>
                            热门搜索
                        </Subheader>
                        <div className="hot-words">
                            {hotKeyWords && hotKeyWords.data.list.map((word) => (
                                <Chip className="word" key={word.tag} onTouchTap={() => {
                                    this.handelHotSearch(word.tag);
                                }}>
                                    {word.tag}
                                </Chip>
                            ))}
                        </div>

                        {
                            this.state.searchHistory && (
                                <div>
                                    <Subheader style={{position: "relative"}}>
                                        搜索历史
                                        <div style={{top: "0", right: "5%", position: "absolute"}} onTouchTap={this.handelCleanSearchHistory.bind(this)}>清除搜索记录</div>
                                    </Subheader>
                                    <Subheader>

                                    </Subheader>
                                </div>
                            )
                        }

                        <div className="history-words">
                            <List>
                                {searchHistory.map((word) => (
                                    <ListItem key={word} primaryText={word} rightIcon={
                                        <DelIcon onTouchTap={() => {
                                            this.handelDelHistoryWord(word);
                                        }}/>
                                    }/>
                                ))}
                            </List>
                        </div>
                    </Paper>
                </div>
            </div>

        );
    }

    handelBlur() {
        this.setState({
            inputting: false
        });
    }

    handelFocus() {
        this.setState({
            inputting: true
        });
    }

    handelHotSearch(searchKey) {
        this.setState({
            searchKey: searchKey
        });
        this.handelSearch();
    }
    handelSearch() {
        const searchKey = this.state.searchKey;
        // const param = {keyword: searchKey, type: 'actorAndMedias'};
        // this.props.action_search(param, reqHeader(param));
        this.props.getSearchKey && this.props.getSearchKey(searchKey);

        const searchHistoryStr = getCookie("searchHistory");
        let cookieSearchHistory = searchHistoryStr ? searchHistoryStr.split(",") : [];
        cookieSearchHistory.push(encodeURIComponent(searchKey));
        const searchHistory = Array.from(new Set(cookieSearchHistory)).join(",");
        setCookie("searchHistory", searchHistory);
        this.setState({
            searchHistory: searchHistory
        });
    }

    handelDelHistoryWord(word) {
        const searchHistoryStr = getCookie("searchHistory");
        let cookieSearchHistory = searchHistoryStr ? searchHistoryStr.split(",") : [];
        const wordsArr = Array.from(new Set(cookieSearchHistory)).filter((_word) => {
            if (_word && decodeURIComponent(_word) !== word) return _word;
        });
        const searchHistory = wordsArr.join(",");
        setCookie("searchHistory", searchHistory);
        this.setState({
            searchHistory: searchHistory
        });
    }

    handelCleanSearchHistory() {
        setCookie("searchHistory", "");
        this.setState({
            searchHistory: ""
        });
    }
}

SearchHeader.propTypes = {
    getSearchKey: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        hotKeys: state.app.search
    };
};
const mapActionToProps = (dispatch, ownProps) => {
    return {
        action_getKeyWord: bindActionCreators(getHotWords, dispatch),
        action_search: bindActionCreators(search, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(SearchHeader));
