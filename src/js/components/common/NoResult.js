/**
 * Created by walljack@163.com on 2017/9/7.
 */
import React from "react";
import NoResultImg from "../../../img/common/bg_no_result.png";
import intl from "react-intl-universal";

const style = {
    noResult: {
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
};
export default class NoResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const extStyle = this.props.style || {};
        return (
            <div style={{...style.noResult, ...extStyle}}>
                <img src={NoResultImg} style={{maxWidth: "7rem"}}/>
                <p style={{color: "#7e7e7e", margin: 0, fontSize: '.4rem'}}>{this.props.message || intl.get("no.any.thing")}</p>
            </div>
        );
    }
}
