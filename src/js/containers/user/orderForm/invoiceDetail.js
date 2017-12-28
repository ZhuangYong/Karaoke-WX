/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import {SvgIcon} from "material-ui";

import { reqHeader, parseTime, toRem, linkTo } from '../../../utils/comUtils';
import {getInvoiceDetail} from "../../../actions/userActions";
import intl from 'react-intl-universal';
import {btoa as encoding} from "Base64";


const RightIcon = (props) => (<SvgIcon
    style={props.style}>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"/>
</SvgIcon>);
const styles = {
    orderCard: {
        listStyle: "none",
        padding: toRem(20),
        margin: 0,
        fontSize: toRem(28),
        color: "#999",
        lineHeight: toRem(60),
        backgroundColor: '#f0f3f5'
    },
    rightIcon: {
        float: "right",
        marginTop: toRem(15),
        marginLeft: toRem(10),
        width: toRem(16.5),
        height: toRem(24),
        color: "#212121"
    }
};

class InvoiceDetail extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.invoice.detail"));

    }

    componentDidMount() {
        const param = {
            id: this.props.match.params.id
        };

        this.props.getInvoiceDetailAction(param, reqHeader(param), null);
    }

    render() {
        const {data} = this.props.orderForm.invoiceDetailData || {};
        const {time, orderNum, startTime, endTime, id, imgurl} = data || {};

        return (
            <div style={{
                padding: toRem(20)
            }}>

                <ul style={styles.orderCard} onClick={() => {
                    linkTo(`user/InvoiceImage/${encodeURIComponent(encoding(imgurl))}`, false, null);
                }}>
                    <li>
                        <span style={{color: "#212121"}}>查看电子发票</span>

                        <RightIcon style={styles.rightIcon}/>
                    </li>
                    <li>{time}</li>
                </ul>

                <ul style={{
                    ...styles.orderCard,
                    marginTop: toRem(20),
                    backgroundColor: '#f0f3f5'
                }} onClick={() => {
                    linkTo(`user/InvoiceOrderForDetail/${id}`, false, null);
                }}>
                    <li>
                        <span style={{color: "#212121"}}>包含{orderNum}个订单</span>

                        <RightIcon style={styles.rightIcon}/>
                    </li>
                    <li>{parseTime(startTime)}{endTime && ' - ' + parseTime(endTime)}</li>
                </ul>
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
