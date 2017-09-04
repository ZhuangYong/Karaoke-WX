import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "../../../../sass/common/searchHeader.scss";
import {Chip, List, ListItem, Subheader} from "material-ui";
import {getHotWords} from "../../../actions/searchActons";
import DelIcon from "material-ui/svg-icons/content/clear";
import {getCookie, linkTo, reqHeader, setCookie} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import * as ReactDOM from "react-dom";
import Scroller from "silk-scroller";
import VoiceIcon from "../../../../img/common/icon_voice.png";
import SearchIcon from "../../../../img/common/icon_search.png";
import CleanIcon from "material-ui/svg-icons/navigation/cancel";

const style = {
    searchButton: {
        position: 'absolute',
        right: '.3rem',
        fontSize: '.5rem',
        top: 0,
        display: 'flex',
        height: '1.2rem',
        alignItems: 'center',
        margin: 0
    },
    cleanKeyWord: {
        display: 'flex',
        alignItems: 'center',
        width: '.6rem',
        height: '1.2rem',
        overflow: 'hidden',
        position: 'absolute',
        right: '1.6rem',
        zIndex: 7,
        icon: {
            width: '.6rem',
            height: '.6rem',
            color: 'rgba(0, 0, 0, 0.38)'
        }
    }
};
// 通用头部组件，包含标题和一个返回按钮
class SearchHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputting: typeof this.props.inputIng !== "undefined" ? this.props.inputIng : true,
            searchKey: typeof this.props.defaultKeyWord !== "undefined" ? this.props.defaultKeyWord : "",
            searchHistory: getCookie("searchHistory")
        };
        this.handelBlur = this.handelBlur.bind(this);
        this.handelFocus = this.handelFocus.bind(this);
        this.handelDelHistoryWord = this.handelDelHistoryWord.bind(this);
        this.handelInputBlur = this.handelInputBlur.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
        this.cleanKeyWord = this.cleanKeyWord.bind(this);
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
        const showHelper = this.state.inputting ? "" : "none";
        const {hotKeyWords} = this.props.hotKeys;
        const searchHistory = this.state.searchHistory ? this.state.searchHistory.split(",").map((word) => decodeURIComponent(word)) : [];

        const funcBtn = () => {
            if (this.state.inputting && !this.state.searchKey) {
                return (
                    <div className="search-button"
                         onClick={this.handelBlur}>
                        <p style={style.searchButton}>取消</p>
                    </div>
                );
            } else if (this.state.searchKey) {
                return (
                    <div className="search-button"
                         onClick={this.handelSearch}>
                        <p style={style.searchButton}>搜索</p>
                    </div>
                );
            }
        };

        return (
            <div className="search-header">
                {
                    this.state.searchKey ? <div style={style.cleanKeyWord} onTouchTap={this.cleanKeyWord}>
                        <CleanIcon style={style.cleanKeyWord.icon}/>
                    </div> : ""
                }

                <span className="search-bar-panel">
                    <Input
                        ref="input"
                        className="key-word-input"
                        value={this.state.searchKey}
                        //autoFocus="autoFocus"
                        hintText={
                            <div>
                                <img className="search" src={SearchIcon}/>
                                <font>请输入你要找的歌曲或歌星</font>
                                <img onClick={() => {
                                    linkTo("voiceSearch", false, "");
                                }} className="voice" src={VoiceIcon}/>
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
                    <Scroller
                        ref="scroller"
                        containerStyle={{top: 33}}
                        directionLockThreshold={1}
                    >
                        <div className="search-words">
                            <Subheader>
                                <font style={{fontWeight: 'bold'}} color="#000000">热门搜索</font>
                            </Subheader>
                            <div className="hot-words">
                                {hotKeyWords && hotKeyWords.data.list.map((word) => (
                                    <Chip style={{border: '1px solid #b7b7b7', backgroundColor: 'white'}} className="word" key={word.tag} onTouchTap={() => {
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
                                            <font style={{fontWeight: 'bold'}} color="#000000">最近搜索</font>
                                            <div style={{top: "0", right: "5%", position: "absolute"}}
                                                 onTouchTap={this.handelCleanSearchHistory.bind(this)}><font color="#ff6832">清除搜索记录</font>
                                            </div>
                                        </Subheader>
                                    </div>
                                )
                            }

                            <div className="history-words">
                                <List>
                                    {searchHistory.map((word) => (
                                        <ListItem
                                            key={word}
                                            primaryText={<font color="#252525">{word}</font>}
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
                            </div>
                        </div>
                    </Scroller>
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

    cleanKeyWord() {
        this.setState({
            searchKey: ""
        });
    }
}

SearchHeader.propTypes = {
    getSearchKey: PropTypes.func,
    defaultKeyWord: PropTypes.string,
    inputIng: PropTypes.bool
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
