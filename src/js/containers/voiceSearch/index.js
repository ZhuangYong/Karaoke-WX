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
import {linkTo, stripScript} from "../../utils/comUtils";
import {setGlobAlert} from "../../actions/common/actions";
import ActionTypes from "../../actions/actionTypes";

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
        super.title("语音搜索");

        this.state = {
            isRecordStart: false,
            // 页面状态 0(正常未开始录音)/1(录音中)/2(断网)/3(无法识别)
            pageState: 0,
            stopRecordTimer: null,
            startX: null,
            startY: null,
            btnDisabled: false
        };
    }

    componentDidMount() {
        document.addEventListener("touchend", (e) => {
            if (!this.state.isRecordStart) return;

            this.setState({
                isRecordStart: false,
                pageState: 0
            });
            this.voiceRecognite(false);
        });
    }

    componentWillUnmount() {
        if (this.state.isRecordStart) {
            this.stopRecord(0);
        }

        const stopRecordTimer = this.state.stopRecordTimer;
        if (stopRecordTimer !== null) {
            clearTimeout(stopRecordTimer);
        }

        document.removeEventListener("touchend");
    }


    render() {
        const isRecordStart = this.state.isRecordStart;
        return (
            <div>
                {this.pageStateRecognite()}
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
                     }}
                >
                    <header style={{
                        marginTop: "90px",
                        textAlign: "center",
                        color: "#ff8226",
                        fontSize: "18px"
                    }}>{isRecordStart ? "点击停止" : "点击说话"}</header>
                   {/* <FloatingActionButton
                        backgroundColor="#ff6c00"
                        disabledColor="#ff6c00"
                        disabled={this.state.btnDisabled}
                        style={styles.btn}
                        iconStyle={{width: "100%", height: "100%"}}
                        onClick={() => {
                            const {isWeixin} = window.sysInfo;
                            if (!isWeixin) {
                                this.props.action_setGlobAlert("请在微信客户端操作");
                                return;
                            }

                            this.setState({
                                btnDisabled: true,
                                pageState: this.state.pageState !== 0 ? 0 : 1,
                                isRecordStart: !isRecordStart
                            });
                            setTimeout(() => {
                                this.setState({
                                    btnDisabled: false
                                });
                            }, 1000);
                            this.voiceRecognite(!isRecordStart);
                        }}
                    >
                        {!isRecordStart ? (<img src={BtnIcon} style={{width: "auto", height: "35px"}} alt="录音"/>) : (<div className="voiceSearchScaleBox">
                            <div className="voiceSearchScaleLong">
                            </div>
                            <div className="voiceSearchScaleShort">
                            </div>
                            <div className="voiceSearchScaleLong">
                            </div>
                        </div>)}
                    </FloatingActionButton>*/}

                    <div
                        style={styles.btn}
                        onTouchStart={(e) => {
                            e.preventDefault();
                            const {isWeixin} = window.sysInfo;
                            if (!isWeixin) {
                                this.props.action_setGlobAlert("请在微信客户端操作");
                                return;
                            }
                            const touch = e.targetTouches[0];
                            this.setState({
                                startX: touch.pageX,
                                startY: touch.pageY,
                                pageState: 1,
                                isRecordStart: true
                            });
                            this.voiceRecognite(true);
                        }}
                        onTouchMove={(e) => {
                            e.preventDefault();

                            const startX = this.state.startX;
                            const startY = this.state.startY;

                            const touch = e.targetTouches[0];
                            const moveX = touch.pageX;
                            const moveY = touch.pageY;

                            if (Math.abs(moveX - startX) > 80 || Math.abs(moveY - startY) > 80) this.stopRecord();

                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                        }}/>

                    {isRecordStart && (<div>
                        <div className="btnBfAnimationA" style={styles.btn}>
                        </div>
                        <div className="btnBfAnimationB" style={styles.btn}>
                        </div>
                    </div>)}

                </section>
            </div>
        );
    }

    // 页面状态识别
    pageStateRecognite() {
        const pageState = this.state.pageState;

        let content = {
          title: "",
          textA: "",
          textB: ""
        };

        switch (pageState) {
            case 0:
                content.title = "你可以这样说";
                content.textA = "三生三世";
                content.textB = "";
                break;
            case 1:
                content.title = "正在听......";
                content.textA = "贴近手机话筒说话";
                content.textB = "保证声音更清晰哟";
                break;
            case 2:
                content.title = "网络开小差咯";
                content.textA = "检查一下网络吧";
                content.textB = "";
                break;
            case 3:
                content.title = "无法识别";
                content.textA = "再说清楚一点";
                content.textB = "才能帮你找到歌曲哟";
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

    // 语音识别
    voiceRecognite(isRecordStart) {
        // const isRecordStart = this.state.isRecordStart;
        if (!window.navigator.onLine) {
            this.setState({
                isRecordStart: false,
                pageState: 2
            });
            return;
        }

        const actionGlobAlert = this.props.action_setGlobAlert;
        let stopRecordTimer = this.state.stopRecordTimer;
        if (stopRecordTimer !== null) {
            clearTimeout(stopRecordTimer);
        }
        if (isRecordStart) {
            window.wx && window.wx.startRecord({
                success: () => {
                    stopRecordTimer = setTimeout(() => {
                        this.voiceRecognite(false);
                    }, 30000);
                },
                fail: () => {
                    this.setState({
                        pageState: 0,
                        isRecordStart: !isRecordStart
                    });

                    actionGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        } else {
            window.wx && window.wx.stopRecord({
                success: (res) => {
                    // alert(res.localId);
                    window.wx.translateVoice({
                        localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: (resl) => {
                            if (window.location.pathname !== "/voiceSearch") return;
                            const res = resl.translateResult;
                            if (typeof res !== "undefined") {
                                linkTo(`song/search/${encodeURIComponent(stripScript(res))}`, false, null);
                            } else {
                                this.setState({
                                    isRecordStart: false,
                                    pageState: 3
                                });
                            }
                        },
                        fail: () => {
                            this.setState({
                                pageState: 3,
                                isRecordStart: isRecordStart
                            });
                            // actionGlobAlert('语音识别失败');
                        }
                    });
                },
                fail: () => {
                    this.setState({
                        pageState: 3,
                        isRecordStart: isRecordStart
                    });
                }
            });
        }
    }

    stopRecord(times) {
        window.wx && window.wx.stopRecord({
            fail: () => {

                /*if (times >= 3) return;
                let timer = 1000;
                if (times > 0) timer = 2000;
                setTimeout(() => {
                    // this.props.action_setGlobAlert(times.toString());
                    times++;
                    this.stopRecord(times);
                }, timer);*/

                this.setState({
                    pageState: 0,
                    isRecordStart: false
                });
            }
        });
    }
}

VoiceSearch.defaultProps = {
    result: {}
};

VoiceSearch.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceSearch));


