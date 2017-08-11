/**
 * Created by walljack@163.com on 2017/8/10.
 */

import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "../../../sass/effect.scss";
import {FloatingActionButton, RaisedButton} from "material-ui";
import LeftArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import RightArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";

class AudioEffect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="effect">
                <div className="top-area">
                    <div className="big-circle">
                        <div style={{width: 50}}>
                            <LeftArrowIcon/>
                        </div>
                        <div className="inside-circle">
                            效果模式
                        </div>
                        <div style={{width: 50}}>
                            <RightArrowIcon/>
                        </div>
                    </div>
                </div>

                <div className="center-area">
                    <FloatingActionButton className="fun-button">
                        b
                    </FloatingActionButton>
                    <FloatingActionButton className="fun-button">
                        b
                    </FloatingActionButton>
                    <FloatingActionButton className="fun-button">
                        b
                    </FloatingActionButton>

                </div>

                <div className="bottom-area">
                    <div className="fun-button">
                        <RaisedButton label="D" className="haf-top-button"/>
                        <RaisedButton label="D" className="haf-bottom-button"/>
                    </div>
                    <div className="fun-button">
                        <RaisedButton label="D" style={{width: "5vh", height: "15vh", borderRadius: "50% 50% 0 0 "}}/>
                        <RaisedButton label="D" style={{width: "5vh", height: "15vh"}}/>
                    </div>
                    <div className="fun-button">
                        <RaisedButton label="D" style={{width: "5vh", height: "15vh"}}/>
                        <RaisedButton label="D" style={{width: "5vh", height: "15vh"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioEffect));
