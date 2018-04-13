/**
 * Created by Zed on 2018/4/13.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import intl from 'react-intl-universal';
import { getQueryString, linkTo, reqHeader, toRem } from '../../utils/comUtils';
import MyButton from '../../components/common/MyButton';
import '../../../sass/recharge.scss';
import bindActionCreators from 'redux/es/bindActionCreators';
import { rechargeSubmit } from '../../actions/payAction';
import VIPIcon from '../../../img/payment/vip-icon.png';
import { setGlobAlert } from '../../actions/common/actions';
import { getUserInfo } from '../../actions/userActions';
import SubmitLoading from '../../components/common/SubmitLoading';

// 样式表
let styles = {
    singleItem: {
        paddingLeft: toRem(20),
        paddingRight: toRem(20),
        width: "100%"
    },
    input: {
        width: "100%",
        // height: toRem(110),
        // textIndent: "10px",
        fontSize: toRem(36),
        lineHeight: toRem(80),
        border: "none",
        borderBottom: '1px solid #7f7f7f',
        // borderRadius: "4px",
        backgroundColor: "#212121",
        color: "#fff",
    },
    itemLabel: {
        color: '#fff',
        fontSize: toRem(24),
        lineHeight: toRem(65),
    },
};

class Recharge extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.payment"));

        this.state = {
            deviceUuid: this.props.match.params.deviceUuid,
            cardNo: '',
            password: '',
            submitLoading: true,
        };

        this.submit = this.submit.bind(this);
    }

    render() {
        const inputs = [
            {label: '请输入充值卡卡号', state: 'cardNo'},
            {label: '请输入充值卡密码', state: 'password'},
        ];

        const {cardNo, password} = this.state;

        return <section style={{
            padding: toRem(20),
            paddingBottom: toRem(130),
        }}>
            <main style={{
                position: 'relative',
                padding: toRem(20),
                width: '100%',
                border: `${toRem(10)} solid #e4cc8b`,
                borderRadius: toRem(8),
                background: '#212121',
            }}>
                <img style={{
                    position: 'absolute',
                    top: toRem(-10),
                    right: toRem(-10),
                    padding: `${toRem(10)} ${toRem(20)}`,
                    width: toRem(140),
                    height: toRem(65),
                    background: '#e4cc8b',
                    borderBottomLeftRadius: toRem(20),
                }} src={VIPIcon} alt=""/>
                {
                    inputs.map((input, index) => <section key={index} style={styles.singleItem}>
                        <header style={styles.itemLabel}>{input.label}</header>
                        <input style={styles.input}
                               className='recharge-input'
                               onChange={(e) => {
                                   this.setState({
                                       [input.state]: e.target.value,
                                   });
                               }}
                               placeholder=''
                               type="text"/>
                    </section>)
                }
            </main>

            <footer style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                left: 0,
                height: toRem(130),
                borderTop: `1px solid #ddd`,
            }}>
                <MyButton
                    style={{
                        position: "absolute",
                        left: '50%',
                        marginTop: toRem(25),
                        marginLeft: toRem(-200),
                        width: toRem(400),
                        height: toRem(80),
                        lineHeight: toRem(80),
                        borderRadius: toRem(80),
                        fontSize: toRem(36),
                        zIndex: 9999,
                    }}
                    label={intl.get("button.sure")}
                    disabled={cardNo === '' || password === ''}
                    onClick={this.submit}
                />
            </footer>

            <SubmitLoading hide={this.state.submitLoading} />
        </section>;
    }

    submit() {
        this.setState({
            submitLoading: false,
        });
        const {cardNo, password, deviceUuid} = this.state;
        const { rechargeSubmitAction, globAlertAction, getUserInfoAction } = this.props;

        if (cardNo.length !== 14) {
            globAlertAction('请输入14位充值卡账号');
            return;
        }

        if (password.length !== 8) {
            globAlertAction('请输入8位充值卡密码');
            return;
        }
        rechargeSubmitAction(this.state, reqHeader(this.state), res => {
            this.setState({
                submitLoading: true,
            });
            const {status} = res;

            switch (parseInt(status, 10)) {
                case 1:
                    globAlertAction('卡号不存在');
                    break;
                case 2:
                    globAlertAction('卡号和密码不匹配，请重新输入');
                    break;
                case 3:
                    globAlertAction('当前时间不在充值卡可使用的有效期内');
                    break;
                case 4:
                    globAlertAction('该充值卡已使用');
                    break;
                case 5:
                    {
                        globAlertAction('充值成功');
                        const getUserInfoParams = {
                            url: location.href.split('#')[0],
                        };
                        getUserInfoAction(getUserInfoParams, reqHeader(getUserInfoParams));

                        setTimeout(() => {
                            getQueryString('language') !== null ? window.WeixinJSBridge.call('closeWindow') : window.history.go(-2);
                        }, 800);
                    }
                    break;
                default:
            }
            this.setState({
                password: '',
            });
        });
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.pay,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        rechargeSubmitAction: bindActionCreators(rechargeSubmit, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recharge));
