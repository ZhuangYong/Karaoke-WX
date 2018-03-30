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
import {dynaPush, reqHeader} from "../../utils/comUtils";
import bindActionCreators from "redux/es/bindActionCreators";
import {push, pushLocal} from "../../actions/audioActons";
import ToneIconAdd from "../../../img/controller/tone_add.png";
import ToneIconSmooth from "../../../img/controller/tone_smooth.png";
import ToneIconReduce from "../../../img/controller/tone_reduce.png";
import BaseComponent from "../../components/common/BaseComponent";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import MBottomNavigation from "../../components/common/MBottomNavigation";
import {CircularProgress} from "material-ui";
import HBackgroundImg from "../../../img/controller/h_background.png";
import VBackgroundImg from "../../../img/controller/v_background.png";
import PlusImg from "../../../img/controller/plus.png";
import ReduceImg from "../../../img/controller/reduce.png";
import intl from 'react-intl-universal';
import Const from "../../utils/const";

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
        super.title(intl.get("title.sound.control"));
        this.state = {
            controllerIng: {}
        };
        this.sendEffect = this.sendEffect.bind(this);
    }

    render() {
        const {data} = this.props.userInfo.userInfoData || {data: {}};
        let isNstManual = false; //
        // if ((data.channel === 'nst_sk_a3' || data.channel === 'sk_stb')) {
        if (Const.EFFECT_NST_CHANNEL_LIST.indexOf(data.channel) >= 0) {
            // if (data.appVersion >= Const.EFFECT_NST_MIN_OTT_VERSION && data.romData.version >= Const.EFFECT_MIN_OTT_ROM_VERSION) {
            if (data.appVersion >= Const.EFFECT_NST_MIN_OTT_VERSION) {
                isNstManual = true;
            }
        }
        return (
            !isNstManual ? <div className="effect" style={{position: 'absolute', top: '-1rem', width: '100%', height: '100%', backgroundColor: '#1b1a1f'}}>
                {
                    this.renderNstCenter()
                }
                {
                    this.renderNstBottom()
                }
                <MBottomNavigation selectedIndex={-1}/>
            </div> : <div className="effect">
                {
                    this.renderTopCircle()
                }
                {
                    this.renderCenter()
                }
                {
                    this.renderBottom()
                }
                <MBottomNavigation selectedIndex={-1}/>
            </div>
        );
    }

    renderTopCircle() {
        const {w, h} = this.props.common;
        const revert = w > h;
        return <div className="top-area" style={revert ? {paddingTop: '.2rem'} : {}}>
            <div className="big-circle">
                <div className="left-choose">
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MODE_ADD] === true ? <CircularProgress
                            style={{
                                position: 'absolute',
                                right: '.9rem',
                                top: '.9rem',
                                transform: 'rotate(-45deg)'
                            }}
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <LeftArrowIcon style={{
                            position: 'absolute',
                            right: '.9rem',
                            top: '.9rem',
                            transform: 'rotate(-45deg)'
                        }} color="#f96d32" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_MODE_ADD);
                        }}/>
                    }
                </div>
                <div className="right-choose">
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MODE_REDUCE] === true ? <CircularProgress
                            style={{
                                position: 'absolute',
                                left: '.9rem',
                                bottom: '.9rem',
                                transform: 'rotate(-45deg)'
                            }}
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <RightArrowIcon style={{
                            position: 'absolute',
                            left: '.9rem',
                            bottom: '.9rem',
                            transform: 'rotate(-45deg)'
                        }} color="#f96d32" onClick={() => {
                            this.sendEffect(AUDIO_EFFECT_MODE_REDUCE);
                        }}/>
                    }
                </div>
                <div className="inside-circle">
                    {intl.get("effect.mode")}
                </div>
            </div>
        </div>;
    }

    renderCenter() {
        const {w, h} = this.props.common;
        const revert = w > h;
        return <div className="center-area" style={revert ? {paddingTop: '.2rem'} : {}}>
                <div className="fun-button">
                <div className="button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_TONE_REDUCE);
                }}>
                {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_REDUCE] === true ? <CircularProgress
                        size={20}
                        thickness={2}
                        color="#ff6832"/> : <img src={ToneIconReduce} style={{height: '.4rem'}}/>
                }
            </div>
            <p className="label">{intl.get("effect.falling")}</p>
            </div>
            <div className="fun-button">
                <div className="button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_SMOOTH] !== true && this.sendEffect(AUDIO_EFFECT_TONE_SMOOTH);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_TONE_SMOOTH] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <img src={ToneIconSmooth} style={{height: '.4rem'}}/>
                    }
                </div>
                <p className="label">{intl.get("effect.stable")}</p>
            </div>
            <div className="fun-button">
                <div className="button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_ADD] !== true && this.sendEffect(AUDIO_EFFECT_TONE_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_TONE_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <img src={ToneIconAdd} style={{height: '.4rem'}}/>
                    }
                </div>
                <p className="label">{intl.get("effect.rising")}</p>
            </div>
        </div>;
    }

    renderBottom() {
        const {w, h} = this.props.common;
        const revert = w > h;
        return <div className="bottom-area" style={revert ? {marginTop: '.2rem'} : {}}>
            <div className="fun-button">
                <div className="haf-top-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_MUSIC_ADD] !== true && this.sendEffect(AUDIO_EFFECT_MUSIC_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MUSIC_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <AddIcon color="#f96d32"/>
                    }
                </div>
                <div className="haf-bottom-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_MUSIC_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_MUSIC_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MUSIC_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <ReduceIcon color="#f96d32"/>
                    }
                </div>
                <p className="label">{intl.get("effect.music")}</p>
            </div>
            <div className="fun-button">
                <div className="haf-top-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_PHONE_ADD] !== true && this.sendEffect(AUDIO_EFFECT_PHONE_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_PHONE_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <AddIcon color="#f96d32"/>
                    }
                </div>
                <div className="haf-bottom-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_PHONE_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_PHONE_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_PHONE_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <ReduceIcon color="#f96d32"/>
                    }
                </div>
                <p className="label">{intl.get("effect.microphone")}</p>
            </div>
            <div className="fun-button">
                <div className="haf-top-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_EFFECT_ADD] !== true && this.sendEffect(AUDIO_EFFECT_EFFECT_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_EFFECT_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <AddIcon color="#f96d32"/>
                    }
                </div>
                <div className="haf-bottom-button" onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_EFFECT_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_EFFECT_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_EFFECT_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="#ff6832"/> : <ReduceIcon color="#f96d32"/>
                    }
                </div>
                <p className="label">{intl.get("effect.effect")}</p>
            </div>
        </div>;
    }

    renderNstCenter() {
        const {w, h} = this.props.common;
        const revert = w > h;
        return <div className="center-area" style={{backgroundImage: `url(${HBackgroundImg})`, backgroundSize: 'auto 1.7rem', backgroundRepeat: 'no-repeat', paddingTop: 0, marginBottom: '1.6rem', backgroundPosition: 'center .1rem'}}>
            <div className="fun-button" style={{width: revert ? '16%' : '33.333%'}}>
                <div className="button white" style={{border: 'none', paddingTop: '.3rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_TONE_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_TONE_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white"/> : <img src={ReduceImg} style={{width: '.4rem'}}/>
                    }
                </div>
                <p className="label" style={{color: 'white', fontSize: '.46rem', paddingTop: '1rem'}}>{intl.get("effect.falling")}</p>
            </div>
            <div className="fun-button" style={{width: revert ? '16%' : '33.333%'}}>
                <div className="button white" style={{border: 'none', paddingTop: '.3rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_TONE_ADD] !== true && this.sendEffect(AUDIO_EFFECT_TONE_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_TONE_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white"/> : <img src={PlusImg} style={{height: '.4rem'}}/>
                    }
                </div>
                <p className="label" style={{color: 'white', fontSize: '.46rem', paddingTop: '1rem'}}>{intl.get("effect.rising")}</p>
            </div>
        </div>;
    }

    renderNstBottom() {
        const {w, h} = this.props.common;
        const revert = w > h;
        return <div className="bottom-area" style={revert ? {marginTop: '.2rem'} : {}}>
            <div className="fun-button" style={{backgroundImage: `url(${VBackgroundImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto 4.2rem', backgroundPosition: 'center top'}}>
                <div className="haf-top-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_EFFECT_ADD] !== true && this.sendEffect(AUDIO_EFFECT_EFFECT_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_EFFECT_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={PlusImg} style={{height: '.4rem'}}/>
                    }
                </div>
                <div className="haf-bottom-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_EFFECT_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_EFFECT_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_EFFECT_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={ReduceImg} style={{width: '.4rem'}}/>
                    }
                </div>
                <p className="label" style={{color: 'white', fontSize: '.46rem', paddingTop: '1rem'}}>{intl.get("effect.effect")}</p>
            </div>
            <div className="fun-button" style={{backgroundImage: `url(${VBackgroundImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto 4.2rem', backgroundPosition: 'center top'}}>
                <div className="haf-top-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_MUSIC_ADD] !== true && this.sendEffect(AUDIO_EFFECT_MUSIC_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MUSIC_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={PlusImg} style={{height: '.4rem'}}/>
                    }
                </div>
                <div className="haf-bottom-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_MUSIC_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_MUSIC_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_MUSIC_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={ReduceImg} style={{width: '.4rem'}}/>
                    }
                </div>
                <p className="label" style={{color: 'white', fontSize: '.46rem', paddingTop: '1rem'}}>{intl.get("effect.music")}</p>
            </div>
            <div className="fun-button" style={{backgroundImage: `url(${VBackgroundImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto 4.2rem', backgroundPosition: 'center top'}}>
                <div className="haf-top-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_PHONE_ADD] !== true && this.sendEffect(AUDIO_EFFECT_PHONE_ADD);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_PHONE_ADD] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={PlusImg} style={{height: '.4rem'}}/>
                    }
                </div>
                <div className="haf-bottom-button white" style={{border: 'none', height: '2.1rem'}} onClick={() => {
                    this.state.controllerIng[AUDIO_EFFECT_PHONE_REDUCE] !== true && this.sendEffect(AUDIO_EFFECT_PHONE_REDUCE);
                }}>
                    {
                        this.state.controllerIng[AUDIO_EFFECT_PHONE_REDUCE] === true ? <CircularProgress
                            size={20}
                            thickness={2}
                            color="white" style={{width: '.4rem'}}/> : <img src={ReduceImg} style={{width: '.4rem'}}/>
                    }
                </div>
                <p className="label" style={{color: 'white', fontSize: '.46rem', paddingTop: '1rem'}}>{intl.get("effect.microphone")}</p>
            </div>
        </div>;
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
        if (super.validUserDeviceOnline(this.props.ottInfo, this.props.action_setGlobAlert) !== true) return;
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
                    msgID: msgId,
                    data: data
                }
            })
        };
        let {controllerIng} = this.state;
        controllerIng[type] = true;
        this.setState({
            controllerIng: controllerIng,
        });
        const success = () => {
            setTimeout(() => {
                controllerIng[type] = false;
                this.setState({
                    inputImage: "",
                    inputValue: "",
                    controllerIng: controllerIng,
                    sendBarrageIng: false,
                    barrageSendToast: true,
                    barrageToastMsg: intl.get("msg.send.success")
                });
            }, 1500);
        };
        const fail = (msg) => {
            setTimeout(() => {
                controllerIng[type] = false;
                this.setState({
                    sendBarrageIng: false,
                    controllerIng: controllerIng,
                    barrageSendToast: true,
                    barrageToastMsg: msg
                });
            }, 1500);
        };
        dynaPush({
            ottInfo: this.props.ottInfo,
            userInfo: this.props.userInfo,
            param: param,
            localNetIsWork: this.props.localNetIsWork,
            action_pushLocal: this.props.action_pushLocal,
            action_setLocalNet: this.props.action_setLocalNet,
            action_push: this.props.action_push,
            action_setGlobAlert: this.props.action_setGlobAlert,
            success: success,
            fail: fail
        });

        // this.props.action_push(param, reqHeader(param), () => {
        //     this.setState({
        //         inputImage: "",
        //         inputValue: "",
        //         sendBarrageIng: false,
        //         barrageSendToast: true,
        //         barrageToastMsg: "发送成功"
        //     });
        // }, (msg) => {
        //     this.setState({
        //         sendBarrageIng: false,
        //         barrageSendToast: true,
        //         barrageToastMsg: msg
        //     });
        // });
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfoData: state.app.user.userInfo.userInfoData,
        userInfo: state.app.user.userInfo,
        ottInfo: state.app.device.ottInfo,
        common: state.app.common,
        localNetIsWork: state.app.common.localNetIsWork
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        action_pushLocal: bindActionCreators(pushLocal, dispatch),
        action_setLocalNet: bindActionCreators(setLocalNet, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioEffect));
