import React from "react";
import "../../../../sass/common/searchHeader.scss";
import {connect} from "react-redux";
import SearchIcon from "material-ui/svg-icons/action/search";
import Input from "../Input";
import BaseComponent from "../BaseComponent";
import {linkTo} from "../../../utils/comUtils";
import {withRouter} from "react-router-dom";

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
                                <SearchIcon style={{color: "white"}}/>
                                <font>请输入你要找的歌曲或歌星</font>
                            </div>
                        }
                        hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                        onClick={
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
