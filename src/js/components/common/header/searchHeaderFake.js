import React from "react";
import "../../../../sass/common/searchHeader.scss";
import {connect} from "react-redux";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import {linkTo} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";
import VoiceIcon from "../../../../img/common/icon_voice.png";
import SearchIcon from "../../../../img/common/icon_search.png";

class SearchHeaderFake extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="search-header">
                <span className="search-bar-panel">
                    <Input
                        ref="input"
                        className="key-word-input"
                        hintText={
                            <div>
                                <img className="search" src={SearchIcon}/>
                                <font>请输入你要找的歌曲或歌星</font>
                                <img className="voice" src={VoiceIcon}/>
                            </div>
                        }
                        hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                        onTouchTap={
                            () => {
                                linkTo('song/search', false, null);
                            }
                        }
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
