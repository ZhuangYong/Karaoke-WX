import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";

import LoginIcon from "../../../img/login.png";
import navUtils from "../../utils/navUtils";
import {OTTLogin} from "../../actions/userActions";
import {reqHeader} from "../../utils/comUtils";
import ButtonPage from "../../components/common/ButtonPage";

class Login extends BaseComponent {
    constructor(props) {
        super(props);
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
            imgStyle={{width: "180px"}}
            buttonLabel="确认登录"
            hideButton={this.state.matchParams.state !== "home"}
            touchTap={() => {
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
                text = "微信授权金麦客登录确认";
                break;
            case "success":
                text = "恭喜您，登录成功";
                break;
            case "failed":
                text = "您的登录出现了问题";
                break;
            case "invalid":
                text = "扫描二维码已失效";
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
        ottLoginAction: bindActionCreators(OTTLogin, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
