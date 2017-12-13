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
import intl from 'react-intl-universal';

const language = getCookie("language");
const style = {
    searchButton: {
        position: 'absolute',
        right: '.3rem',
        fontSize: language === 'zh-CN' ? '.5rem' : '.3rem',
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
        position: 'fixed',
        right: '1.7rem',
        top: 0,
        zIndex: 7,
        icon: {
            width: '.6rem',
            height: '.6rem',
            color: 'rgba(255, 255, 255, 0.77)'
        }
    }
};
// 通用头部组件，包含标题和一个返回按钮
class SearchHeader extends BaseComponent {
    constructor(props) {
        super(props);
        const searchKey = typeof this.props.defaultKeyWord !== "undefined" ? this.props.defaultKeyWord : "";
        this.state = {
            inputting: typeof this.props.inputIng !== "undefined" ? this.props.inputIng : true,
            searchKey: searchKey,
            searchHistory: getCookie("searchHistory"),
            searchedOnce: !!searchKey
        };
        this.handelBlur = this.handelBlur.bind(this);
        this.handelFocus = this.handelFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handelFocus = this.handelFocus.bind(this);
        this.handelDelHistoryWord = this.handelDelHistoryWord.bind(this);
        this.handelInputBlur = this.handelInputBlur.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
        this.cleanKeyWord = this.cleanKeyWord.bind(this);
        this.handelResize = this.handelResize.bind(this);
        this.blurSearchInput = this.blurSearchInput.bind(this);
        this.cacheKeyWord = this.cacheKeyWord.bind(this);
    }

    componentDidMount() {
        const param = {};
        this.props.action_getKeyWord(param, reqHeader(param));
        document.addEventListener("touchstart", this.handelInputBlur);
        window.addEventListener("resize", this.handelResize);
        this.props.defaultKeyWord && this.cacheKeyWord(this.props.defaultKeyWord);
    }

    componentWillUnmount() {
        document.removeEventListener("touchstart", this.handelInputBlur);
        window.removeEventListener('resize', this.handelResize);
        this.blurSearchInput();
    }

    render() {
        const showHelper = this.state.inputting ? "" : "none";
        const {hotKeyWords} = this.props.hotKeys;
        const searchHistory = this.state.searchHistory ? this.state.searchHistory.split(",").map((word) => decodeURIComponent(word)) : [];

        const funcBtn = () => {
            if (this.state.inputting && !this.state.searchKey) {
                if (this.state.searchedOnce) {
                    return (
                        <div className="search-button"
                             onClick={this.handelBlur}>
                            <p style={style.searchButton}>{intl.get("button.cancel")}</p>
                        </div>
                    );
                } else {
                    return "";
                }

            } else if (this.state.searchKey) {
                return (
                    <div className="search-button"
                         onClick={this.handelSearch}>
                        <p style={style.searchButton}>{intl.get("button.search")}</p>
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
                        trimStart={true}
                        className="key-word-input"
                        value={this.state.searchKey}
                        //autoFocus="autoFocus"
                        hintText={
                            <div>
                                <img className="search" src={SearchIcon}/>
                                <font>{intl.get("search.placeholder")}</font>
                                <img onClick={() => {
                                    linkTo("voiceSearch", false, "");
                                }} className="voice" src={VoiceIcon}/>
                            </div>
                        }
                        hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                        onFocus={this.handelFocus}
                        onBlur={this.onBlur}
                        bindState={this.bindState("searchKey")}
                        onClick={this.handelFocus}
                    />
                    {funcBtn()}
                </span>
                <div className="search-panel" style={{display: showHelper}}>
                    <Scroller
                        ref="scroller"
                        containerStyle={{top: '1.2rem'}}
                        directionLockThreshold={1}
                    >
                        <div className="search-words">
                            <Subheader>
                                <font style={{fontWeight: 'bold', fontSize: '.38rem'}} color="#000000">{intl.get("search.hot")}</font>
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
                                            <font style={{fontWeight: 'bold', fontSize: '.38rem'}} color="#000000">{intl.get("search.recently")}</font>
                                            <div style={{top: "0", right: "5%", position: "absolute"}}
                                                 onTouchTap={this.handelCleanSearchHistory.bind(this)}><font style={{fontWeight: 'bold', fontSize: '.38rem'}} color="#ff6832">{intl.get("search.clean")}</font>
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
                                            innerDivStyle={{padding: '.426rem 1.493rem .426rem .426rem', overflow: 'hidden', textOverflow: 'ellipsis'}}
                                            primaryText={<font color="#252525" style={{fontSize: '.32rem'}}>{word}</font>}
                                            rightIcon={
                                                <div onTouchTap={(e) => {
                                                    e.stopPropagation();
                                                    this.handelDelHistoryWord(word);
                                                }} style={{width: 60, height: '100%', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <DelIcon color="gray"/>
                                                </div>

                                            }
                                            onTouchTap={() => {
                                                this.handelHotSearch(word);
                                            }}
                                        />
                                    ))}
                                    <br/>
                                    <br/>
                                    <br/>
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

    onBlur() {
        this.props.handelBlur && this.props.handelBlur();
    }


    handelFocus() {
        const {h} = this.props.common;
        this.setState({
            focusHeight: h,
            inputting: true
        });
        this.props.handelFocus && this.props.handelFocus();
    }

    handelHotSearch(searchKey) {
        this.state.searchKey = searchKey;
        this.handelSearch();
    }

    handelSearch() {
        const searchKey = this.state.searchKey;
        this.props.getSearchKey && this.props.getSearchKey(searchKey);
        this.cacheKeyWord(searchKey);
    }

    cacheKeyWord(searchKey) {
        const searchHistoryStr = getCookie("searchHistory");
        let cookieSearchHistory = searchHistoryStr ? searchHistoryStr.split(",") : [];
        cookieSearchHistory = [encodeURIComponent(searchKey), ...cookieSearchHistory];
        const searchHistory = Array.from(new Set(cookieSearchHistory)).join(",");
        setCookie("searchHistory", searchHistory);
        this.setState({
            inputting: false,
            searchedOnce: true,
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

    handelResize() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const {focusHeight} = this.state;
        if (h > focusHeight) {
            this.blurSearchInput();
        }
        this.setState({
            focusHeight: h
        });
    }

    blurSearchInput() {
        this.refs.input.refs.input.input.blur();
    }
}

SearchHeader.propTypes = {
    getSearchKey: PropTypes.func,
    defaultKeyWord: PropTypes.string,
    inputIng: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        hotKeys: state.app.search,
        common: state.app.common
    };
};
const mapActionToProps = (dispatch, ownProps) => {
    return {
        action_getKeyWord: bindActionCreators(getHotWords, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(SearchHeader));
