/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ButtonPage from "../../../components/common/ButtonPage";
import SubmitSuccessIcon from "../../../../img/submit_success.png";


class InvoiceSubmitSuccess extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("开票");

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
                        }}>提交成功</p>
                        <p style={{
                            textAlign: "center",
                            color: "#807f7e",
                            fontSize: "14px"
                        }}>我们将会在第一时间处理您的开票信息！</p>
                    </div>}
                    imgStyle={{width: "100px"}}
                    buttonLabel="关闭"
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
