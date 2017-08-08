import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import variables from "../../../../sass/common/searchHeader.scss";
import {AppBar, Chip, FlatButton, List, ListItem, Subheader} from "material-ui";
import SearchIcon from "material-ui/svg-icons/action/search";
import {getHotWords} from "../../../actions/searchActons";
import DelIcon from "material-ui/svg-icons/content/clear";
import {getCookie, reqHeader, setCookie} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll";
import * as ReactDOM from "react-dom";

// 通用头部组件，包含标题和一个返回按钮
class SearchHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputting: true,
            searchKey: "",
            searchHistory: getCookie("searchHistory")
        };
        this.handelBlur = this.handelBlur.bind(this);
        this.handelFocus = this.handelFocus.bind(this);
        this.handelDelHistoryWord = this.handelDelHistoryWord.bind(this);
        this.handelInputBlur = this.handelInputBlur.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
    }

    componentDidMount() {
        const param = {};
        this.props.action_getKeyWord(param, reqHeader(param));
        const input = ReactDOM.findDOMNode(this.refs.input);
        document.addEventListener("touchstart", this.handelInputBlur);
    }

    componentWillUnmount() {
        document.removeEventListener("touchstart", this.handelInputBlur);
    }

    render() {
        const showHelper = this.state.inputting ? "block" : "none";
        const {hotKeyWords} = this.props.hotKeys;
        const searchHistory = this.state.searchHistory ? this.state.searchHistory.split(",").map((word) => decodeURIComponent(word)) : [];

        const funcBtn = () => {
            if (this.state.inputting && !this.state.searchKey) {
                return (
                    <div className="search-button"
                         onClick={this.handelBlur}>
                        返回
                    </div>
                );
            } else if (this.state.inputting && this.state.searchKey) {
                return (
                    <div className="search-button"
                         onClick={this.handelSearch}>
                        搜索
                    </div>
                );
            }
        };

        return (
            <div className="search-header">
                <span className="search-bar-panel">
                    <Input
                        ref="input"
                        className="key-word-input"
                        value={this.state.searchKey}
                        //autoFocus="autoFocus"
                        hintText={
                            <div>
                                <SearchIcon style={{color: "white"}}/>
                                <font>请输入你要找的歌曲或歌星</font>
                            </div>
                        }
                        hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                        onFocus={this.handelFocus}
                        bindState={this.bindState("searchKey")}
                        onClick={this.handelFocus}
                    />
                    {funcBtn()}
                </span>

                <div className="search-panel" style={{display: showHelper}}>
                    <div className="search-words">
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
                                <div className="history-words-title">
                                    <Subheader style={{position: "relative"}}>
                                        搜索历史
                                        <div style={{top: "0", right: "5%", position: "absolute"}}
                                             onTouchTap={this.handelCleanSearchHistory.bind(this)}>清除搜索记录
                                        </div>
                                    </Subheader>
                                </div>
                            )
                        }

                        <div className="history-words">
                            <ReactIScroll iScroll={iScroll} style={{height: "100%"}}>
                                <List>
                                    {searchHistory.map((word) => (
                                        <ListItem
                                            key={word}
                                            primaryText={word}
                                            rightIcon={
                                                <DelIcon onTouchTap={(e) => {
                                                    e.stopPropagation();
                                                    this.handelDelHistoryWord(word);
                                                }}/>
                                            }
                                            onTouchTap={() => {
                                                this.handelHotSearch(word);
                                            }}
                                        />
                                    ))}
                                </List>
                            </ReactIScroll>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    handelInputBlur(e) {
        const input = ReactDOM.findDOMNode(this.refs.input);
        if (!input.contains(e.target)) {
            this.refs.input.refs.input.input.blur();
        }
    }

    /**
     * 当整个输入对象失去输入焦点，非仅仅输入框
     */
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
        this.state.searchKey = searchKey;
        this.handelSearch();
    }

    handelSearch() {
        const searchKey = this.state.searchKey;
        this.props.getSearchKey && this.props.getSearchKey(searchKey);

        const searchHistoryStr = getCookie("searchHistory");
        let cookieSearchHistory = searchHistoryStr ? searchHistoryStr.split(",") : [];
        cookieSearchHistory.push(encodeURIComponent(searchKey));
        const searchHistory = Array.from(new Set(cookieSearchHistory)).join(",");
        setCookie("searchHistory", searchHistory);
        this.setState({
            inputting: false,
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
        action_getKeyWord: bindActionCreators(getHotWords, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(SearchHeader));
