import React from "react";
import "../../../../sass/common/searchHeader.scss";
import {connect} from "react-redux";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import {linkTo} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";
import VoiceIcon from "../../../../img/common/icon_voice.png";
import SearchIcon from "../../../../img/common/icon_search.png";
import VoiceIconGray from "../../../../img/common/icon_voice_gray.png";
import SearchIconGray from "../../../../img/common/icon_search_gray.png";
import intl from 'react-intl-universal';

class SearchHeaderFake extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const grayTheme = this.props.grayTheme || "";
        let searchIcon = SearchIcon;
        let voiceIcon = VoiceIcon;
        if (grayTheme === "gray") {
            searchIcon = SearchIconGray;
            voiceIcon = VoiceIconGray;
        }
        return (
            <div className={`search-header ${grayTheme}`} onTouchTap={
                () => {
                    linkTo('song/search', false, null);
                }
            }>
                <span className="search-bar-panel" style={{display: "flex!important"}}>
                    <Input
                        ref="input"
                        className="key-word-input"
                        hintText={
                            <div>
                                <img className="search" src={searchIcon}/>
                                <font>{intl.get("search.placeholder")}</font>
                                <img onTouchTap={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    linkTo("voiceSearch", false, "");
                                }} className="voice" src={voiceIcon}/>
                            </div>
                        }
                        hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                    />
                </span>
            </div>

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
)(SearchHeaderFake));
