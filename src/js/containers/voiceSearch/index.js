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

const styles = {
    btn: {
        position: "absolute",
        top: "120px",
        left: "50%",
        marginLeft: "-42.5px",
        width: "85px",
        height: "85px"
    },
    headerDesc: {
        color: "#7e7e7e",
        fontSize: "14px"
    }
};

class VoiceSearch extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            isRecordStart: false,
            // 页面状态 0(正常未开始录音)/1(录音中)/2(断网)/3(无法识别)
            pageState: 0,
            stopRecordTimer: null,
            btnDisabled: false
        };
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
                }}>
                    <header style={{
                        marginTop: "90px",
                        textAlign: "center",
                        color: "#ff8226",
                        fontSize: "18px"
                    }}>{isRecordStart ? "点击停止" : "点击说话"}</header>
                    <FloatingActionButton
                        backgroundColor="#ff6c00"
                        disabledColor="#ff6c00"
                        disabled={this.state.btnDisabled}
                        style={styles.btn}
                        iconStyle={{width: "100%", height: "100%"}}
                        onClick={() => {
                            const {isWeixin} = window.sysInfo;
                            if (!isWeixin) {
                                alert("请在微信客户端打开");
                                return;
                            }

                            this.setState({
                                btnDisabled: true,
                                pageState: 1,
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
                        {!isRecordStart ? (<img src={BtnIcon} style={{width: "auto", height: "50px"}} alt="录音"/>) : (<div className="voiceSearchScaleBox">
                            <div className="voiceSearchScaleLong">
                            </div>
                            <div className="voiceSearchScaleShort">
                            </div>
                            <div className="voiceSearchScaleLong">
                            </div>
                        </div>)}
                    </FloatingActionButton>

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
        const _this = this;
        let stopRecordTimer = this.state.stopRecordTimer;
        if (stopRecordTimer !== null) {
            clearTimeout(stopRecordTimer);
        }
        if (isRecordStart) {
            window.wx.startRecord({
                success: function () {
                    stopRecordTimer = setTimeout(() => {
                        _this.voiceRecognite(false);
                    }, 30000);
                },
                fail: function () {
                    console.log('无法调用开始开始录音API');
                }
            });
        } else {
            window.wx.stopRecord({
                success: function (res) {
                    // alert(res.localId);
                    window.wx.translateVoice({
                        localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (resl) {
                            const res = resl.translateResult;
                            alert(res);
                            if (typeof res !== "undefined") {
                                linkTo(`song/search/${encodeURIComponent(stripScript(res))}`, false, null);
                            } else {
                                _this.setState({
                                    isRecordStart: false,
                                    pageState: 3
                                });
                            }
                        },
                        fail: function () {
                            console.log('调用识别录音API失败或网络不正常');
                        }
                    });
                },
                fail: function () {
                    console.log('调用停止录音API失败');
                }
            });
        }
    }
}

VoiceSearch.defaultProps = {
    result: {}
};

VoiceSearch.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {

    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceSearch));


