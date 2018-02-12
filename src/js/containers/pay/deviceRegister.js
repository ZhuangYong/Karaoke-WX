/**
 * Created by Zed on 2018/1/16.
 */

import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import intl from 'react-intl-universal';
import ButtonPage from '../../components/common/ButtonPage';
import DeviceRegisterIcon from "../../../img/device_register.png";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import { reqHeader } from '../../utils/comUtils';
import { deviceRegister } from '../../actions/payAction';
import bindActionCreators from "redux/es/bindActionCreators";
import { setGlobAlert } from '../../actions/common/actions';
import { getUserInfo } from '../../actions/userActions';

class DeviceRegister extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.payment"));

        this.state = {
            openDialog: false
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {

        const actions = [
            <FlatButton
                className="cancel-button"
                label={intl.get("msg.not.now")}
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="sure-button"
                label={intl.get("msg.join.immediately")}
                primary={true}
                onClick={this.handleAction}
            />,
        ];

        return <div ref="protocol">
            <ButtonPage
                src={DeviceRegisterIcon}
                imgStyle={{width: "162.5px"}}
                content={intl.get("msg.congratulations.vip.experience")}
                contentStyle={{color: "#c48848"}}
                buttonLabel={intl.get("msg.experience.now")}
                touchTap={() => {
                    this.setState({openDialog: true});
                }}/>

            <Dialog
                className="dialog-panel"
                actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                contentStyle={{textAlign: 'center'}}
                actions={actions}
                modal={false}
                open={this.state.openDialog}
                onRequestClose={this.handleClose}>

                {intl.get("msg.sure.join.vip")}
            </Dialog>
        </div>;
    }


    handleAction() {
        const {actionSetGlobAlert, getUserInfoAction, deviceRegisterAction} = this.props;
        this.setState({openDialog: false});
        const params = {};
        deviceRegisterAction(params, reqHeader(params), (res) => {
            const {status} = res;
            if (status === 1) {
                actionSetGlobAlert(intl.get("msg.join.success"));

                getUserInfoAction({}, reqHeader({}));
            } else {
                actionSetGlobAlert(intl.get("msg.join.fail"));
            }
            window.history.back();
        });
    }

    handleClose() {
        this.setState({openDialog: false});
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deviceRegisterAction: bindActionCreators(deviceRegister, dispatch),
        actionSetGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviceRegister));
