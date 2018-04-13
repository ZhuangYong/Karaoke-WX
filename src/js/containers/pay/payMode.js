/**
 * Created by Zed on 2018/4/13.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import intl from 'react-intl-universal';
import ModeOnline from "../../../img/payment/modeOnline.png";
import ModeRecharge from "../../../img/payment/modeRecharge.png";
import { linkTo, toRem } from '../../utils/comUtils';
import bindActionCreators from 'redux/es/bindActionCreators';
import { getUserInfo } from '../../actions/userActions';

class PayMode extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.payment"));
    }

    render() {
        const {data} = this.props.userInfo.userInfoData || {data: {deviceUuid: ''}};
        const {deviceUuid} = data;
        const payModes = [
            {img: ModeOnline, link: `pay?state=home`},
            {img: ModeRecharge, link: `recharge/${deviceUuid}`},
        ];

        return <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: toRem(20),
        }}>
            {
                payModes.map((payMode, index) => <li
                    style={{
                        marginBottom: toRem(15),
                    }}
                    key={index}
                    onClick={() => {
                        linkTo(payMode.link, false, null);
                    }}>
                    <img style={{
                        width: '100%',
                        height: 'auto',
                    }} src={payMode.img} alt=""/>
                </li>)
            }
        </ul>;
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        userInfo: state.app.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userInfoAction: bindActionCreators(getUserInfo, dispatch),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PayMode));
