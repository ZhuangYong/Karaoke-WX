/**
 * Created by walljack@163.com on 2017/8/10.
 */

import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "../../../sass/effect.scss";
import LeftArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import RightArrowIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import AddIcon from "material-ui/svg-icons/content/add";
import ReduceIcon from "material-ui/svg-icons/content/remove";
import {reqHeader} from "../../utils/comUtils";
import bindActionCreators from "redux/es/bindActionCreators";
import {push} from "../../actions/audioActons";
import ToneIconAdd from "../../../img/controller/tone_add.png";
import ToneIconSmooth from "../../../img/controller/tone_smooth.png";
import ToneIconReduce from "../../../img/controller/tone_reduce.png";
import BaseComponent from "../../components/common/BaseComponent";
import {setGlobAlert} from "../../actions/common/actions";

//模式
const AUDIO_EFFECT_MODE_ADD = 1;
const AUDIO_EFFECT_MODE_REDUCE = AUDIO_EFFECT_MODE_ADD + 1;
//升调 平调 降调
const AUDIO_EFFECT_TONE_ADD = AUDIO_EFFECT_MODE_REDUCE + 1;
const AUDIO_EFFECT_TONE_SMOOTH = AUDIO_EFFECT_TONE_ADD + 1;
const AUDIO_EFFECT_TONE_REDUCE = AUDIO_EFFECT_TONE_SMOOTH + 1;
//音乐
const AUDIO_EFFECT_MUSIC_ADD = AUDIO_EFFECT_TONE_REDUCE + 1;
const AUDIO_EFFECT_MUSIC_REDUCE = AUDIO_EFFECT_MUSIC_ADD + 1;
//话筒
const AUDIO_EFFECT_PHONE_ADD = AUDIO_EFFECT_MUSIC_REDUCE + 1;
const AUDIO_EFFECT_PHONE_REDUCE = AUDIO_EFFECT_PHONE_ADD + 1;
//效果
const AUDIO_EFFECT_EFFECT_ADD = AUDIO_EFFECT_PHONE_REDUCE + 1;
const AUDIO_EFFECT_EFFECT_REDUCE = AUDIO_EFFECT_EFFECT_ADD + 1;

class AudioEffect extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("音效控制");
        this.sendEffect = this.sendEffect.bind(this);
    }

    render() {
        return (
            <div className="effect">
                <div className="top-area">
                    <div className="big-circle">
                        <div className="left-choose">
                            <LeftArrowIcon style={{
                                position: 'absolute',
                                right: '.9rem',
                                top: '.9rem',
                                transform: 'rotate(-45deg)'
                            }} color="#f96d32" onClick={() => {
                                this.sendEffect(AUDIO_EFFECT_MODE_ADD);
                            }}/>
                        </div>
                        <div className="right-choose">
                            <RightArrowIcon style={{
                                position: 'absolute',
                                left: '.9rem',
                                bottom: '.9rem',
                                transform: 'rotate(-45deg)'
                            }} color="#f96d32" onClick={() => {
                                this.sendEffect(AUDIO_EFFECT_MODE_REDUCE);
                            }}/>
                        </div>
                        <div className="inside-circle">
                            效果模式
                        </div>
                    </div>
                </div>

                <div className="center-area">
                    <div className="fun-button">
                        <div className="button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_TONE_REDUCE);
                        }}>
                            <img src={ToneIconReduce} style={{height: '.4rem'}}/>
                        </div>
                        <p className="label">降调</p>
                    </div>
                    <div className="fun-button">
                        <div className="button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_TONE_SMOOTH);
                        }}>
                            <img src={ToneIconSmooth} style={{height: '.4rem'}}/>
                        </div>
                        <p className="label">平调</p>
                    </div>
                    <div className="fun-button">
                        <div className="button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_TONE_ADD);
                        }}>
                            <img src={ToneIconAdd} style={{height: '.4rem'}}/>
                        </div>
                        <p className="label">升调</p>
                    </div>
                </div>

                <div className="bottom-area">
                    <div className="fun-button">
                        <div className="haf-top-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_MUSIC_ADD);
                        }}>
                            <AddIcon color="#f96d32"/>
                        </div>
                        <div className="haf-bottom-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_MUSIC_REDUCE);
                        }}>
                            <ReduceIcon color="#f96d32"/>
                        </div>
                        <p className="label">音乐</p>
                    </div>
                    <div className="fun-button">
                        <div className="haf-top-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_PHONE_ADD);
                        }}>
                            <AddIcon color="#f96d32"/>
                        </div>
                        <div className="haf-bottom-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_PHONE_REDUCE);
                        }}>
                            <ReduceIcon color="#f96d32"/>
                        </div>
                        <p className="label">话筒</p>
                    </div>
                    <div className="fun-button">
                        <div className="haf-top-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_EFFECT_ADD);
                        }}>
                            <AddIcon color="#f96d32"/>
                        </div>
                        <div className="haf-bottom-button" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_EFFECT_REDUCE);
                        }}>
                            <ReduceIcon color="#f96d32"/>
                        </div>
                        <p className="label">效果</p>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * 音效控制串口协议（修改）
     * 音   乐：msgID: 0x0100  data: oxf7(加) oxf8(减)
     * 话   筒：msgID: 0x0101  data: oxf7(加) oxf8(减)
     * 效   果：msgID: 0x0102  data: oxf7(加) oxf8(减)
     * 效果模式：msgID: 0x0103  data: oxf7(加) oxf8(减)
     * 音乐变调：msgID: 0x0104  data: oxf7(#升调) oxf8(b降调) 0xf6(平调)
     * @param type
     */
    sendEffect(type) {
        if (super.validUserBindDevice(this.props.userInfoData, this.props.action_setGlobAlert) !== true) return;
        let msgId = "";
        let data = "";
        switch (type) {
            // 效果模式 +
            case AUDIO_EFFECT_MODE_ADD :
                msgId = "0103";
                data = "f7";
                break;
            // 效果模式-
            case AUDIO_EFFECT_MODE_REDUCE :
                msgId = "0103";
                data = "f8";
                break;
            // 音乐变调 - 降调
            case AUDIO_EFFECT_TONE_REDUCE :
                msgId = "0104";
                data = "f8";
                break;
            // 音乐变调 - 平调
            case AUDIO_EFFECT_TONE_SMOOTH :
                msgId = "0104";
                data = "f6";
                break;
            // 音乐变调 - 升调
            case AUDIO_EFFECT_TONE_ADD :
                msgId = "0104";
                data = "f7";
                break;
            // 音乐 +
            case AUDIO_EFFECT_MUSIC_ADD :
                msgId = "0100";
                data = "f7";
                break;
            // 音乐 -
            case AUDIO_EFFECT_MUSIC_REDUCE :
                msgId = "0100";
                data = "f8";
                break;
            // 话筒 +
            case AUDIO_EFFECT_PHONE_ADD :
                msgId = "0101";
                data = "f7";
                break;
            // 话筒 -
            case AUDIO_EFFECT_PHONE_REDUCE :
                msgId = "0101";
                data = "f8";
                break;
            // 效果 +
            case AUDIO_EFFECT_EFFECT_ADD :
                msgId = "0102";
                data = "f7";
                break;
            // 效果 -
            case AUDIO_EFFECT_EFFECT_REDUCE :
                msgId = "0102";
                data = "f8";
                break;
            default:
                break;
        }
        const param = {
            type: 14, id: JSON.stringify({
                model: "serialport",
                serialport: {
                    msgID: type,
                    data: data
                }
            })
        };
        this.props.action_push(param, reqHeader(param), () => {
            this.setState({
                inputImage: "",
                inputValue: "",
                sendBarrageIng: false,
                barrageSendToast: true,
                barrageToastMsg: "发送成功"
            });
        }, (msg) => {
            this.setState({
                sendBarrageIng: false,
                barrageSendToast: true,
                barrageToastMsg: msg
            });
        });
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfoData: state.app.user.userInfo.userInfoData
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioEffect));
