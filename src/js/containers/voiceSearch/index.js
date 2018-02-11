/**
 * Created by Zed on 2017/8/17.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import BtnIcon from '../../../img/voice_search.png';
import "../../../sass/voiceSearch.scss";
import { linkTo, reqHeader, stripScript, wxConfig } from '../../utils/comUtils';
import { setGlobAlert, setWeixinConfigFinished } from '../../actions/common/actions';
import ActionTypes from "../../actions/actionTypes";
import intl from "react-intl-universal";
import { getUserConfig } from '../../actions/userActions';

const styles = {
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `#ff6c00 url(${BtnIcon}) no-repeat center`,
        backgroundSize: "auto 35px",
        position: "absolute",
        top: "120px",
        left: "50%",
        marginLeft: "-42.5px",
        width: "80px",
        height: "80px",
        borderRadius: "80px"
    },
    headerDesc: {
        color: "#7e7e7e",
        fontSize: "14px"
    }
};

class VoiceSearch extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.voice.search"));

        this.state = {
            // 录音是否已经开始
            isRecordStart: false,
            // 页面状态 0(正常未开始录音)/1(录音中)/2(断网)/3(无法识别)
            pageState: 0,
            stopRecordTimer: null,
            startX: null,
            startY: null,
            btnDisabled: false
        };
    }

    componentWillMount() {
        this.configWeiXin();
    }

    componentWillUnmount() {
        const { stopRecordTimer, isRecordStart } = this.state;
        if (isRecordStart) this.stopRecord();

        if (stopRecordTimer !== null) clearTimeout(stopRecordTimer);

    }


    render() {
        const { isRecordStart } = this.state;
        return (
            <div>
                {this.pageStateMatch()}
                <section style={{
                        position: "absolute",
                        width: "100%",
                        height: "300px",
                        bottom: 0,
                        left: 0,
                        overflow: "hidden"
                     }}
                     onTouchStart={(e) => {
                         e.preventDefault();
                     }}
                     onTouchMove={(e) => {
                         e.preventDefault();
                     }}
                     onTouchEnd={(e) => {
                         e.preventDefault();
                     }}>

                    <header style={{
                        marginTop: "90px",
                        textAlign: "center",
                        color: "#ff8226",
                        fontSize: "18px"
                    }}>{isRecordStart ? intl.get("release.will.stop") : intl.get("press.and.say")}</header>

                    <div style={styles.btn}
                        onTouchStart={e => {
                            e.preventDefault();
                            this.recordTouchStart(e);
                        }}
                        onTouchMove={(e) => {
                            e.preventDefault();
                            const { startX, startY } = this.state;
                            const { pageX, pageY } = e.targetTouches[0];
                            if (
                                Math.abs(pageX - startX) > 80 ||
                                Math.abs(pageY - startY) > 80
                            ) this.stopRecord()
                                .then(res => this.setState({
                                    isRecordStart: false,
                                    pageState: 0
                                }))
                                .catch(err => this.setState({
                                    isRecordStart: false,
                                    pageState: 0
                                }));
                        }}
                        onTouchEnd={e => {
                            e.preventDefault();
                            if (isRecordStart) this.voiceRecognition();
                        }}
                    />

                    {isRecordStart && (<div>
                        <div className="btnBfAnimationA" style={styles.btn} />
                        <div className="btnBfAnimationB" style={styles.btn} />
                    </div>)}

                </section>
            </div>
        );
    }

    // 页面状态识别
    pageStateMatch() {
        const pageState = this.state.pageState;

        let content = {
          title: "",
          textA: "",
          textB: ""
        };

        switch (pageState) {
            case 0:
                content.title = intl.get("search.say.like");
                content.textA = intl.get("search.sample");
                content.textB = "";
                break;
            case 1:
                content.title = intl.get("search.listening");
                content.textA = intl.get("search.close.microphone.speak");
                content.textB = intl.get("search.make.sure.sound.clear");
                break;
            case 2:
                content.title = intl.get("search.network.die");
                content.textA = intl.get("search.check.network");
                content.textB = "";
                break;
            case 3:
                content.title = intl.get("search.unrecognized");
                content.textA = intl.get("search.be.clear");
                content.textB = intl.get("search.to.help.you.find.song");
                break;
            default:
                break;
        }

        return (<section style={{
            padding: "40px 40px"
        }}>
            <header style={{
                color: "#252525",
                fontSize: "18px"
            }}>{content.title}</header>

            <p style={styles.headerDesc}>{content.textA}</p>
            <p style={styles.headerDesc}>{content.textB}</p>

        </section>);
    }

    /**
     * touchStart recording
     * @param e
     */
    recordTouchStart(e) {
        if (this.isNoNet()) return;

        const {actionGlobAlert} = this.props;
        const {isWeixin} = window.sysInfo;
        if (!isWeixin) {
            actionGlobAlert(intl.get("msg.operate.in.we.chat"));
            return;
        }

        const { isRecordStart } = this.state;

        if (isRecordStart) {
            this.stopRecord()
                .then(() => this.startRecord())
                .catch(err => this.setState({
                    isRecordStart: false,
                    pageState: 0
                }));
        } else this.startRecord();

        const { pageX, pageY } = e.targetTouches[0];
        this.setState({
            startX: pageX,
            startY: pageY,
            pageState: 1,
            isRecordStart: true,
        });

    }

    /**
     * 停止录音并识别录音转为文字
     */
    voiceRecognition() {
        this.stopRecord()
            .then(this.translateVoice)
            .then(res => {
                if (window.location.pathname !== "/voiceSearch") return;

                const { translateResult } = res;
                linkTo(`song/search/${encodeURIComponent(stripScript(translateResult))}`, false, null);
            })
            .catch(err => {
                // this.props.actionGlobAlert(err.errMsg);
                this.setState({
                    isRecordStart: false,
                    pageState: 3
                });
            });
    }

    /**
     * 调用接口前判断是否处于无网络状态
     * @returns {boolean}
     */
    isNoNet() {
        if (!window.navigator.onLine) {
            this.setState({
                isRecordStart: false,
                pageState: 2
            });

            return true;
        }

        return false;
    }

    /**
     * 调用微信API开始录音
     */
    startRecord() {
        const { actionGlobAlert } = this.props;

        window.wx.startRecord({
            success: () => {
                const timer = setTimeout(() => this.voiceRecognition(), 30 * 1000);
                this.setState({
                    stopRecordTimer: timer,
                });
            },
            fail: () => {
                this.setState({
                    pageState: 0,
                    isRecordStart: false
                });

                actionGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
            }
        });
    }

    /**
     * 调用微信API识别本地音频
     * @param localId 需要识别的音频的本地Id，由录音相关接口获得
     */
    translateVoice(localId) {
        return new Promise((resolve, reject) => {
            window.wx && window.wx.translateVoice({
                localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (result) => {
                    const { translateResult } = result;
                    const data = {
                        translateResult: translateResult,
                        errMsg: '识别音频成功',
                    };

                    if (typeof translateResult === "undefined") {
                        data.errMsg = '识别音频失败';
                        reject(data);
                    }

                    resolve(data);
                },
                fail: err => {
                    reject(err);
                }
            });
        });
    }

    /**
     * 调用微信API停止录音
     */
    stopRecord() {
        return new Promise((resolve, reject) => {
            let { stopRecordTimer } = this.state;
            if (stopRecordTimer !== null) {
                clearTimeout(stopRecordTimer);
            }

            window.wx && window.wx.stopRecord({
                success: (res) => {
                    // alert(res.localId);
                    const { localId } = res;
                    if (typeof localId === 'undefined') {
                        const data = { errMsg: '录音id不存在' };
                        reject(data);
                    }

                    resolve(localId);
                },
                fail: err => {
                    reject(err);
                }
            });
        });

    }

    /**
     * 微信api验证授权
     */
    configWeiXin() {
        const { actionSetWeixinConfigFinished, actionGetUserConfig } = this.props;
        let param = {url: location.href.split('#')[0]};
        actionGetUserConfig(param, reqHeader(param), (json) => {
            const {data} = json;
            setTimeout(() => {
                actionSetWeixinConfigFinished(false);
                wxConfig(data);
                window.wx && window.wx.ready(() => {
                    actionSetWeixinConfigFinished(true);
                });
            }, 500);
        });
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        actionGetUserConfig: bindActionCreators(getUserConfig, dispatch),
        actionSetWeixinConfigFinished: bindActionCreators(setWeixinConfigFinished, dispatch),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceSearch));


