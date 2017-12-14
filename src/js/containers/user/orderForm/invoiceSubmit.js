/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";

import RaisedButton from 'material-ui/RaisedButton';
import {linkTo, reqHeader, toRem} from "../../../utils/comUtils";
import {submitInvoice} from "../../../actions/userActions";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import {setGlobAlert} from "../../../actions/common/actions";
import intl from 'react-intl-universal';

// 样式表
let styles = {
    submitBtn: {
        display: "block",
        borderRadius: "50px",
        margin: "0 auto",
        width: "240px",
        height: "50px"
    },
    singleItem: {
        paddingLeft: toRem(20),
        paddingRight: toRem(20),
        width: "100%"
    },
    input: {
        width: "100%",
        height: toRem(110),
        textIndent: "10px",
        fontSize: toRem(36),
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#f0f3f5",
        color: "#222"
    },
    tab: {
        display: "inline-block",
        marginRight: toRem(20),
        width: toRem(120),
        height: toRem(60),
        border: "1px solid",
        borderRadius: "5px",
        color: "#222",
        textAlign: "center",
        lineHeight: toRem(60),
        borderColor: "#dadada"
    },
    tabActive: {
        display: "inline-block",
        marginRight: toRem(20),
        width: toRem(120),
        height: toRem(60),
        border: "1px solid",
        borderRadius: "5px",
        textAlign: "center",
        lineHeight: toRem(60),
        color: "#ff6832",
        borderColor: "#ff6832"
    }
};

class InvoiceSubmit extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.invoice"));

        this.state = {

            // 总金额数，从url参数中获取
            totalMoney: this.props.match.params.totalMoney.replace("-", "."),

            // 对话框状态
            openDialog: false,

            /**
             * 提交电子发票开票信息
             * 传入参数：
             * ids:订单id，多个逗号隔开
             * gflx: 发票抬头种类01企业、02机关事业单位、03个人、04其它
             * gfmc: 发票抬头
             * gfsh: 发票纳税人识别号
             * gfsj: 开票人电话
             * gfyx: 开票人邮箱
             */
            submitParams: {
                ids: this.props.match.params.ids.replace("-", ","),
                gflx: "01",
                gfmc: "",
                gfsh: "",
                gfsj: "",
                gfyx: ""
            }
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const totalMoney = this.state.totalMoney;
        const submitParams = this.state.submitParams;
        const actions = [
            <FlatButton
                className="cancel-button"
                label={intl.get("button.cancel")}
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="sure-button"
                label={intl.get("button.sure.submit")}
                primary={true}
                onClick={this.handleAction}
            />,
        ];

        return (
            <div style={{
                fontSize: toRem(36),
                lineHeight: toRem(110),
                color: "#999"
            }}>

                <section style={styles.singleItem}>
                    <span>{intl.get("invoice.type")}: </span>
                    <span style={{color: "#222"}}>{intl.get("invoice.vat")}</span>
                </section>

                <section style={Object.assign({}, styles.singleItem, {
                    borderTop: "1px solid #d7d7d7"
                })}>
                    <header>*{intl.get("invoice.title")}</header>
                    <div>
                        <span style={submitParams.gflx === "01" ? styles.tabActive : styles.tab}
                              onClick={() => {
                                  submitParams.gflx = "01";
                                  this.setState({
                                      submitParams: submitParams
                                  });
                              }}>{intl.get("invoice.co")}</span>
                        <span style={submitParams.gflx === "03" ? styles.tabActive : styles.tab}
                              onClick={() => {
                                  submitParams.gflx = "03";
                                  this.setState({
                                      submitParams: submitParams
                                  });
                              }}>{intl.get("invoice.personal")}</span>
                    </div>
                    <input style={styles.input}
                           onChange={(e) => {
                               submitParams.gfmc = e.target.value;
                               this.setState({
                                   submitParams: submitParams
                               });
                           }}
                           placeholder="请输入发票抬头"
                           type="text"/>
                </section>

                <section style={Object.assign({}, styles.singleItem, {
                    paddingBottom: toRem(20),
                    borderBottom: "1px solid #d7d7d7"
                })}>
                    <header>*纳税人识别号</header>
                    <input style={styles.input}
                           onChange={(e) => {
                               submitParams.gfsh = e.target.value;
                               this.setState({
                                   submitParams: submitParams
                               });
                           }}
                           placeholder="请输入纳税人识别号"
                           type="text"/>
                </section>

                <section style={styles.singleItem}>
                    <span>发票金额: </span>
                    <span style={{color: "#222"}}>&yen;{totalMoney}</span>
                </section>

                <section style={styles.singleItem}>
                    <span>*收票人手机: </span>
                    <input style={styles.input}
                           onChange={(e) => {
                               submitParams.gfsj = e.target.value;
                               this.setState({
                                   submitParams: submitParams
                               });
                           }}
                           placeholder="请输入收票手机号码"
                           type="text"/>
                </section>

                <section style={styles.singleItem}>
                    <span>*收票人邮箱: </span>
                    <input style={styles.input}
                           onChange={(e) => {
                               submitParams.gfyx = e.target.value;
                               this.setState({
                                   submitParams: submitParams
                               });
                           }}
                           placeholder="请输入收票人邮箱"
                           type="text"/>
                </section>

                <div style={{width: "100%", height: "80px"}} />

                <section
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "#fff",
                        padding: "10px 10px"
                    }}>
                    <RaisedButton
                        backgroundColor="#ff8632"
                        disabledBackgroundColor="#ccc"
                        disabled={false}
                        label="提交"
                        style={styles.submitBtn}
                        buttonStyle={styles.submitBtn}
                        labelStyle={{lineHeight: "50px", fontSize: "18px", color: "#fff"}}
                        onClick={() => {

                            if (submitParams.gfmc.length <= 0) {
                                this.props.action_setGlobAlert(intl.get("msg.input.invoice.title"));
                                return;
                            }

                            if (!(/^([A-Z\d]{15}|[A-Z\d]{18}|[A-Z\d]{20})$/).test(submitParams.gfsh)) {
                                this.props.action_setGlobAlert(intl.get("msg.input.correct.taxpayer.identification.number"));
                                return;
                            }

                            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(submitParams.gfsj))) {
                                this.props.action_setGlobAlert(intl.get("msg.input.correct.phone.number"));
                                return;
                            }

                            if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(submitParams.gfyx))) {
                                this.props.action_setGlobAlert(intl.get("msg.input.correct.email"));
                                return;
                            }

                            this.setState({openDialog: true});
                        }}
                    />
                </section>

                <Dialog
                    className="dialog-panel dialog-orderSubmit"
                    actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                    contentStyle={{textAlign: 'left'}}
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}>

                    <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        color: "#999",
                        lineHeight: toRem(45)
                    }}>
                        <li>{intl.get("invoice.title.type")}: <span style={{color: "#212121"}}>{submitParams.gflx === "03" ? "个人" : "公司"}</span></li>
                        <li>{intl.get("invoice.type")}: <span style={{color: "#212121"}}>{intl.get("invoice.vat")}</span></li>
                        <li>{intl.get("invoice.title")}: <span style={{color: "#212121"}}>{submitParams.gfmc}</span></li>
                        <li>{intl.get("invoice.taxpayer.identification.number")}: <span style={{color: "#212121"}}>{submitParams.gfsh}</span></li>
                        <li>{intl.get("phone")}: <span style={{color: "#212121"}}>{submitParams.gfsj}</span></li>
                        <li>{intl.get("email")}: <span style={{color: "#212121"}}>{submitParams.gfyx}</span></li>
                        <li style={{fontSize: `${toRem(14)} !important`}}>*{intl.get("msg.after.submit.can.show.in.history")}</li>
                    </ul>
                </Dialog>
            </div>
        );
    }

    handleAction() {
        const params = this.state.submitParams;
        console.log(params);
        this.props.submitInvoiceAction(params, reqHeader(params), (res) => {

            const {status} = res;
            if (parseInt(status, 10) === 1) {
                this.setState({
                    openDialog: false
                });
                linkTo(`user/invoiceSubmitSuccess`, false, null);
            } else {
                this.setState({
                    openDialog: false
                });
                this.props.action_setGlobAlert(intl.get("msg.network.die"));
            }
        });
    }

    handleClose() {
        this.setState({openDialog: false});
    }
}

InvoiceSubmit.defaultProps = {

};

InvoiceSubmit.propTypes = {

};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        submitInvoiceAction: bindActionCreators(submitInvoice, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceSubmit));
