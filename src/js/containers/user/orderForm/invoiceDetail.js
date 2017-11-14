/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";

import {reqHeader} from "../../../utils/comUtils";
import {getInvoiceDetail} from "../../../actions/userActions";

const style = {
    orderings: {
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
};

class InvoiceDetail extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("开票详情");
    }

    componentDidMount() {
        const param = {
            id: this.props.match.params.id
        };

        this.props.getInvoiceDetailAction(param, reqHeader(param), null);
    }

    render() {
        const {url} = this.props.orderForm.invoiceDetailData || {url: ""};

        return (
            <div style={style.orderings}>
                <img src={url} style={{maxWidth: "7rem"}} />
            </div>
        );
    }

}

InvoiceDetail.defaultProps = {};

InvoiceDetail.propTypes = {};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderForm: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInvoiceDetailAction: bindActionCreators(getInvoiceDetail, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail));
