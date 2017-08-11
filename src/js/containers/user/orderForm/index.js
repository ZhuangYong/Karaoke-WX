/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getOrderForm} from "../../../actions/userActions";

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Card from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import defaultImg from "../../../../img/common/tile_default.jpg";
import {reqHeader} from "../../../utils/comUtils";

class OrderForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.result.orderFormStamp !== this.props.result.orderFormStamp) {
            this.updateResult();
        }
    }

    componentDidMount() {
        const param = {};
        this.props.getOrderFormAction(param, reqHeader(param));
    }

    render() {
        const result = this.state.result;
        return (
            <Paper>
                <AppBar
                    title="全部订单"
                    showMenuIconButton={false}
                />

                {result.map((item) => (<Card
                    key={item.orderId}
                    style={{marginTop: "10px"}}
                >
                    <List>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar src={item.avatar}/>
                            }
                            primaryText={item.nickName}
                        />
                    </List>
                    <Divider/>
                    <List>
                        <ListItem
                            disabled={true}
                            primaryText={`设备号: ${item.deviceNumber}`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付金额: ${item.money}`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付时间: ${item.payTime}`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付套餐: ${item.orderType}`}
                        />
                    </List>

                </Card>))}
            </Paper>
        );
    }

    updateResult() {
        const {data} = this.props.result.orderFormData || {data: []};
        this.setState({
            result: data
        });
    }
}

OrderForm.defaultProps = {
    result: {}
};

OrderForm.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getOrderFormAction: bindActionCreators(getOrderForm, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderForm));
