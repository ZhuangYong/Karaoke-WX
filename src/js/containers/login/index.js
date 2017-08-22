import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";

import RaisedButton from 'material-ui/RaisedButton';
import LoginIcon from "../../../img/login.png";
import navUtils from "../../utils/navUtils";
import {OTTLogin} from "../../actions/userActions";
import {linkTo, reqHeader} from "../../utils/comUtils";

const styles = {
    submitBtn: {
        display: "block",
        borderRadius: "50px",
        margin: "0 auto",
        width: "240px",
        height: "50px"
    }
};

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
        return (
            <div>
                <img
                    style={{
                        display: "block",
                        margin: "35% auto 0",
                        width: "150px"
                    }}
                    src={LoginIcon}
                    alt="登录"/>
                <p style={{
                    textAlign: "center",
                    color: "#000",
                    fontSize: "18px"
                }}>{this.matchPages()}</p>

                {this.state.matchParams.state.toString() === "home" && (<section
                    style={{position: "absolute", bottom: "10%", left: 0, padding: "20px 10px", width: "100%"}}
                >
                    <RaisedButton
                        disabled={typeof this.state.matchParams.uuid === "undefined"}
                        backgroundColor="#ff8632"
                        disabledBackgroundColor="#ccc"
                        label="确认登录"
                        style={styles.submitBtn}
                        buttonStyle={styles.submitBtn}
                        labelStyle={{lineHeight: "50px", fontSize: "18px", color: "#fff"}}
                        onTouchTap={() => {
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
                    />
                </section>)}
            </div>
        );
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
