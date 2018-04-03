/**
 * Created by Zed on 2018/4/2.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";

import LoginIcon from "../../../img/logo.png";
import { OTTLogout } from '../../actions/userActions';
import { getQueryString, reqHeader } from '../../utils/comUtils';
import ButtonPage from "../../components/common/ButtonPage";
import {setGlobAlert} from "../../actions/common/actions";
import intl from 'react-intl-universal';


class Logout extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.login"));
    }

    render() {

        return (<ButtonPage
            src={LoginIcon}
            disabled={false}
            content={'退出登录'}
            imgStyle={{width: "100px"}}
            buttonLabel={intl.get('button.make.sure')}
            touchTap={() => {

                const {ottLogoutAction, globAlertAction} = this.props;
                const {isWeixin} = window.sysInfo;
                if (!isWeixin) {
                    globAlertAction(intl.get("msg.operate.in.we.chat"));
                    return;
                }

                const params = {
                    deviceUuid: getQueryString('deviceUuid'),
                };
                ottLogoutAction(params, reqHeader(params), res => {
                    const {status} = res;
                    globAlertAction(parseInt(status, 10) === 1 ? '退出成功' : intl.get('msg.network.die'));
                    setTimeout(() => {
                        parseInt(status, 10) === 1 && window.WeixinJSBridge.call('closeWindow');
                    }, 500);
                });
            }}
        />);
    }
}


Logout.defaultProps = {
    result: {}
};

Logout.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.user.ottLogin
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ottLogoutAction: bindActionCreators(OTTLogout, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
