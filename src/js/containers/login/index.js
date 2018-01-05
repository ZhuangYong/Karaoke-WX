import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";

import LoginIcon from "../../../img/logo.png";
import navUtils from "../../utils/navUtils";
import {OTTLogin} from "../../actions/userActions";
import {reqHeader} from "../../utils/comUtils";
import ButtonPage from "../../components/common/ButtonPage";
import {setGlobAlert} from "../../actions/common/actions";
import intl from 'react-intl-universal';


class Login extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.login"));
        this.state = {
            matchParams: this.props.match.params
        };

    }

    componentDidUpdate(preProps) {
        const matchParams = this.props.match.params;
        if (preProps.match.params.state !== matchParams.state) {
            this.setState({
                matchParams: matchParams
            });
        }
    }

    render() {
        return (<ButtonPage
            src={LoginIcon}
            disabled={typeof this.state.matchParams.uuid === "undefined"}
            content={this.matchPages()}
            imgStyle={{width: "100px"}}
            buttonLabel={intl.get("login.sure.login")}
            hideButton={this.state.matchParams.state !== "home"}
            touchTap={() => {

                const {isWeixin} = window.sysInfo;
                if (!isWeixin) {
                    this.props.action_setGlobAlert(intl.get("msg.operate.in.we.chat"));
                    return;
                }

                const uuid = this.state.matchParams.uuid;
                if (typeof uuid !== "undefined") {
                    const params = {
                        uuid: uuid
                    };
                    this.props.ottLoginAction(params, reqHeader(params), (res) => {
                        const {status, data, msg} = res;

                        if (parseInt(status, 10) === 302) {
                            window.location.href = data;
                        } else if (parseInt(status, 10) === 1) {
                            navUtils.replace(`/login/success`);
                        }
                    });
                }
            }}
        />);
    }

    matchPages() {
        const params = this.state.matchParams;
        let text = "";
        switch (params.state) {
            case "home":
                text = intl.get("msg.we.chat.authorization.j-make.login.confirmation");
                break;
            case "success":
                text = intl.get("msg.congratulations.login.successfully");
                break;
            case "failed":
                text = intl.get("msg.login.error");
                break;
            case "invalid":
                text = intl.get("msg.scan.qr.code.expired");
                break;
            default:
                navUtils.replace("/*");
                break;
        }
        return text;
    }
}


Login.defaultProps = {
    result: {}
};

Login.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.user.ottLogin
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ottLoginAction: bindActionCreators(OTTLogin, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
