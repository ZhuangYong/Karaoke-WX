import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import "../../../sass/common/Scroller.scss";
import {getQueryString, linkTo} from "../../utils/comUtils";

class Suggestions extends BaseComponent {
    constructor(props) {
        super(props);
        const bondDeviceId = getQueryString("bondDeviceId");
        linkTo(`user/feedback/home/${bondDeviceId}`, false, null);
    }
    render() {
        return (
            <div>
                gggg
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
)(Suggestions));
