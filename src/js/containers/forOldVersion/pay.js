import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import {getQueryString, linkTo} from "../../utils/comUtils";

class Pay extends BaseComponent {
    constructor(props) {
        super(props);
        const bondDeviceId = getQueryString("bondDeviceId");
        const {state, pollingId, deviceId, openid} = this.props.match.params;
        const link = `pay?state=${state || ""}&pollingId=${pollingId || ""}&deviceId=${deviceId || ""}&openid=${openid || ""}`;
        this.props.history.replace("/" + link);
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Pay));
