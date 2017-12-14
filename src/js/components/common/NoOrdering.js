/**
 * Created by walljack@163.com on 2017/9/7.
 */
import React from "react";
import NoOrderingImg from "../../../img/common/bg_no_ordering.png";
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
export default class NoOrdering extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const extStyle = this.props.style || {};
        return (
            <div style={{...style.noResult, ...extStyle}}>
                <img src={NoOrderingImg} style={{maxWidth: "7rem"}}/>
                <p style={{color: "#7e7e7e", margin: 0, fontSize: '.4rem'}}>{this.props.message || intl.get("no.order")}</p>
            </div>
        );
    }
}
