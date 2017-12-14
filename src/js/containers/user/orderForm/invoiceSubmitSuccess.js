/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ButtonPage from "../../../components/common/ButtonPage";
import SubmitSuccessIcon from "../../../../img/submit_success.png";
import intl from 'react-intl-universal';


class InvoiceSubmitSuccess extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.invoice"));

    }

    render() {

        return (
            <div>
                <ButtonPage
                    src={SubmitSuccessIcon}
                    content={<div>
                        <p style={{
                            textAlign: "center",
                            color: "#ff8632",
                            fontSize: "16px"
                        }}>{intl.get("feedback.submit.success")}</p>
                        <p style={{
                            textAlign: "center",
                            color: "#807f7e",
                            fontSize: "14px"
                        }}>{intl.get("invoice.we.will.handel.first.time")}</p>
                    </div>}
                    imgStyle={{width: "100px"}}
                    buttonLabel={intl.get("button.close")}
                    touchTap={this.closePage}
                />
            </div>
        );
    }

    closePage() {
        window.history.go(-2);
    }

}

InvoiceSubmitSuccess.defaultProps = {

};

InvoiceSubmitSuccess.propTypes = {

};

const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceSubmitSuccess));
