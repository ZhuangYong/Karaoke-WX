/**
 * Created by walljack@163.com on 2017/8/10.
 */
import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CircularProgress, List, ListItem, Snackbar, Tab, Tabs, TextField} from "material-ui";
import SwipeableViews from "react-swipeable-views";
import barrageImg from "../../../img/barrage/barrage.png";
import barrageOnImg from "../../../img/barrage/barrage_on.png";
import emotionImg from "../../../img/barrage/emotion.png";
import emotionOnImg from "../../../img/barrage/emotion_on.png";
import albumImg from "../../../img/barrage/album.png";
import {push, pushLocal} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import { chkDevice, dynaPush, linkTo, reqHeader } from '../../utils/comUtils';

import bindActionCreators from "redux/es/bindActionCreators";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import * as ReactDOM from "react-dom";
import Const from "../../utils/const";
import intl from 'react-intl-universal';
import ActionTypes from '../../actions/actionTypes';
import { ossUploadWxPic } from '../../actions/userActions';
import SubmitLoading from '../../components/common/SubmitLoading';

let fastWords = [];
for (let i = 1; i < 21; i++) {
    fastWords.push({value: intl.get("barrage." + i)});
}
const emotionIcons = [
    {id: 1, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/5ff4726f5eed439f119a39920af02f65.png"},
    {id: 2, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/10.png"},
    {id: 3, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/184aa5baa96efcb430ede9c4dd2f23c0.png"},
    {id: 4, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/1314.png"},
    {id: 6, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/23123.png"},
    {id: 7, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/31231.png"},
    {id: 8, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/34234-342-.png"},
    {id: 9, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/87931e5bdb.png"},
    {id: 10, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/312321.png"},
    {id: 11, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/324324.png"},
    {id: 12, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/334344.png"},
    {id: 13, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/3131231.png"},
    {id: 14, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/123123131.png"},
    {id: 15, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/WechatIMG6722.png"},
    {id: 16, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/WechatIMG6724.png"},
    {id: 17, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/WechatIMG6726.png"},
    {id: 18, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/帅.png"},
    {id: 19, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/喜欢.png"},
    {id: 20, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/赞.png"},
    {id: 21, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/组-1.png"},
    {id: 22, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/组-2.png"},
    {id: 23, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/组-3.png"},
    {id: 24, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/组-4.png"}
];

const style = {
    tabs: {
        tab: {
            label: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: '.4rem',
                img: {
                    marginRight: '.32rem',
                    width: '.587rem'
                }
            }
        }
    },
    dots: {
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        dot: {
            width: 10,
            height: 10,
            border: "1px solid",
            margin: 5,
            borderRadius: 5
        }
    },
    bottomPanel: {
        position: "fixed",
        width: "100%",
        height: '1.6rem',
        bottom: 0,
        boxShadow: "0px -2px 3px 0px rgba(128, 128, 128, 0.48)",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        submitButton: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#999999",
            backgroundColor: "#d7d7d7",
            width: '5.333rem',
            height: '1.067rem',
            fontSize: '.45rem',
            borderRadius: '1.067rem'
        },
        submitButtonOn: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '5.333rem',
            height: '1.067rem',
            fontSize: '.45rem',
            color: "#ffffff",
            borderRadius: '1.067rem'
        }
    }
};

//一页显示的表情个数
const ROW_NUMBER = 6;

class Barrage extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.barrage"));
        this.state = {
            tabIndex: 0,
            inputIng: false,
            emotionPage: 0,
            inputValue: "",
            inputImage: "",
            sendBarrageIng: false,
            barrageSendToast: false,
            barrageToastMsg: intl.get("msg.send.success"),
            uploadImgLoading: false,
        };
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.getSendButton = this.getSendButton.bind(this);
        this.chooseEmotion = this.chooseEmotion.bind(this);
        this.chooseFastWord = this.chooseFastWord.bind(this);
        this.handelChangeTab = this.handelChangeTab.bind(this);
        this.sendBarrage = this.sendBarrage.bind(this);
        this.handelChangeEmotionPage = this.handelChangeEmotionPage.bind(this);
        this.blurSearchInput = this.blurSearchInput.bind(this);
        this.handelResize = this.handelResize.bind(this);
        this.handelInputBlur = this.handelInputBlur.bind(this);
    }

    componentDidMount() {
        document.addEventListener("touchstart", this.handelInputBlur);
        window.addEventListener("resize", this.handelResize);

        // const albumFormDataStr = window.sessionStorage.getItem(Const.ALBUM_SESSION_KEY);
        // if (albumFormDataStr !== null) {
        //     const {barrage} = JSON.parse(albumFormDataStr);
        //     this.chooseEmotion(barrage[0].imgUrl);
        // }
    }

    componentWillUnmount() {
        document.removeEventListener("touchstart", this.handelInputBlur);
        window.removeEventListener("resize", this.handelResize);
        // window.sessionStorage.removeItem(Const.ALBUM_SESSION_KEY);
    }

    render() {
        const {inputValue, inputImage} = this.state;
        const {w, h, r} = this.props.common;
        const {isAndroid} = chkDevice();
        let tabBackgroundColor = ["#d7d7d7", "#d7d7d7"];
        tabBackgroundColor[this.state.tabIndex] = "#ff6833";
        let tabIcon = [barrageImg, emotionImg, albumImg];
        let tabOnIcon = [barrageOnImg, emotionOnImg];
        tabIcon[this.state.tabIndex] = tabOnIcon[this.state.tabIndex];
        const showTabContainer = window.sysInfo.isAndroid ? !this.state.inputIng : true ;
        const showInputAreaHeight = h * 0.3;
        const inputAreaHeight = h * 0.7 - 1.6 * r - 1.2 * r;

        return (
            <div>
                <div style={{position: 'relative', backgroundColor: 'white', textAlign: "center", height: showInputAreaHeight, overflow: "hidden"}} onTouchTap={() => {
                    inputImage && this.setState({
                        inputImage: ""
                    });
                }}>
                    {
                        inputImage ? <img src={inputImage} alt="" style={{height: "90%", maxWidth: "100%"}} /> : <TextField
                            className={"barrage-input"}
                            ref="input"
                            hintText={intl.get("barrage.say.something")}
                            hintStyle={{top: 0, padding: '.3rem .6rem'}}
                            textareaStyle={{width: '94%'}}
                            multiLine={true}
                            rows={10}
                            rowsMax={10}
                            fullWidth={true}
                            value={inputValue}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.handelChange.bind(this)}
                        />
                    }
                    <Snackbar
                        style={{position: 'absolute'}}
                        bodyStyle={{height: 'auto', minHeight: 48, lineHeight: '.7rem', display: 'flex', alignItems: 'center'}}
                        open={this.state.barrageSendToast}
                        message={this.state.barrageToastMsg}
                        autoHideDuration={Const.TOAST_BOTTOM_SHOW_TIME}
                        onRequestClose={() => {
                            this.setState({
                                barrageSendToast: false
                            });
                        }}
                    />
                </div>
                <Tabs
                    value={this.state.tabIndex}
                    tabItemContainerStyle={{display: "flex !important", height: '1.2rem', backgroundColor: "#d7d7d7"}}
                    contentContainerStyle={{
                        position: (isAndroid && this.state.inputIng) ? "" : "absolute",
                        bottom: (isAndroid && this.state.inputIng) ? 0 : '1.6rem',
                        height: inputAreaHeight,
                        width: '100%',
                        overflow: "auto",
                        zIndex: -1
                    }}>
                    <Tab
                        value={0}
                        className={this.state.tabIndex === 0 ? "main-background-color" : ""}
                        buttonStyle={{flexDirection: "row", height: '1.2rem'}}
                        onActive={() => {
                            this.handelChangeTab(0);
                        }}
                        label={
                            <div style={{
                                ...style.tabs.tab.label,
                                color: this.state.tabIndex === 0 ? "white" : "#9a9a9a"
                            }}>
                                <img src={tabIcon[0]} style={style.tabs.tab.label.img}/>{intl.get("barrage.quick")}
                            </div>
                        }>
                        {
                            this.getFastWord()
                        }
                    </Tab>
                    <Tab
                        value={1}
                        className={this.state.tabIndex === 1 ? "main-background-color" : ""}
                        buttonStyle={{flexDirection: "row", height: '1.2rem'}}
                        onActive={() => {
                            this.handelChangeTab(1);
                        }}
                        label={
                            <div style={{
                                ...style.tabs.tab.label,
                                color: this.state.tabIndex === 1 ? "white" : "#9a9a9a"
                            }}>
                                <img src={tabIcon[1]}
                                     style={style.tabs.tab.label.img}/>{intl.get("barrage.sticker")}
                            </div>
                        }>
                        <SwipeableViews onChangeIndex={(index) => {
                            this.handelChangeEmotionPage(index);
                        }}>
                            {
                                this.getEmotion()
                            }
                        </SwipeableViews>
                        {
                            this.getEmotionDots()
                        }
                    </Tab>
                    <Tab
                        value={2}
                        buttonStyle={{flexDirection: "row", height: '1.2rem'}}
                        onActive={() => {
                            // linkTo(`user/photoAlbum/barrage/1`, false, null);
                            this.handelChangeTab(this.state.tabIndex);
                            this.albumClick();
                        }}
                        label={
                            <div style={{
                                ...style.tabs.tab.label,
                                color: this.state.tabIndex === 2 ? "white" : "#9a9a9a"
                            }}>
                                <img src={tabIcon[2]}
                                     style={style.tabs.tab.label.img}/>{intl.get("title.photoAlbum")}
                            </div>
                        }
                    />
                </Tabs>

                {((!this.state.inputIng && isAndroid) || !isAndroid) ? <div style={style.bottomPanel}>
                    {
                        this.getSendButton()
                    }
                </div> : ""}

                <SubmitLoading hide={!this.state.uploadImgLoading} />
            </div>
        );
    }

    /**
     * 相册点击事件
     */
    albumClick() {
        this.setState({uploadImgLoading: true});
        const {globAlertAction} = this.props;
        const {isWeixin} = window.sysInfo;
        isWeixin && this.uploadWxImgGetter().then(res => {
            const {msg, result} = res;
            this.chooseEmotion(result[0].url);
            this.setState({uploadImgLoading: false});
            globAlertAction(msg);
        }).catch(err => {
            this.setState({uploadImgLoading: false});
            globAlertAction(err.msg);
        });
    }

    /**
     * 上传已存储到微信服务器的图片（自建后台）
     * @returns {Promise}
     */
    uploadWxImgGetter() {

        return new Promise((resolve, reject) => {
            const {globAlertAction, ossUploadWxPicActions} = this.props;
            window.wx && window.wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    localIds.map((item) => {
                        window.wx.uploadImage({
                            localId: item, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: (res) => {
                                this.setState({
                                    uploadImgLoading: true
                                });
                                let result;
                                const params = {
                                    type: 2,
                                    keys: res.serverId // 返回图片的服务器端ID
                                };
                                ossUploadWxPicActions(params, reqHeader(params), res => {
                                    console.log("======上传成功========");
                                    const {status, data} = res;
                                    if (parseInt(status, 10) === 1) {

                                        result = {...data, msg: intl.get('msg.upload.success')};
                                        resolve(result);
                                    } else {

                                        result = {msg: intl.get('msg.upload.fail')};
                                        reject(result);
                                    }
                                });
                            }
                        });
                    });
                },
                cancel: () => {
                    const result = {msg: intl.get('msg.upload.fail')};
                    reject(result);
                },
                fail: () => {
                    globAlertAction("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        });

    }

    getEmotion() {
        let html = [];
        const {w, h, r} = this.props.common;
        const inputAreaHeight = h * 0.7 - 1.6 * r - 1.2 * r;
        let emotionHeight = inputAreaHeight * 0.4;
        let swipeLength = emotionIcons.length % ROW_NUMBER === 0 ? (emotionIcons.length / ROW_NUMBER) : ((emotionIcons.length - (emotionIcons.length % ROW_NUMBER)) / ROW_NUMBER + 1);
        for (let i = 0; i < swipeLength; i++) {
            html.push(
                <div key={"emotion_group_" + i} style={{display: "flex", flexWrap: "wrap", padding: "8px 4px"}}>
                    {
                        emotionIcons.map((emotion, index) => {
                            const {id, name, url} = emotion;
                            if (index >= i * ROW_NUMBER && index < (i + 1) * ROW_NUMBER) {
                                return <span key={index}
                                             onTouchTap={() => {
                                                 this.chooseEmotion(url);
                                             }}
                                             style={{
                                                 width: "33.33%",
                                                 display: "flex",
                                                 height: emotionHeight,
                                                 overflow: 'hidden',
                                                 justifyContent: 'center',
                                                 alignItems: 'center'
                                             }}>
                                    <img src={url} alt='' style={{maxWidth: "90%", maxHeight: '100%'}}/>
                                </span>;
                            }
                        })
                    }
                </div>
            );
        }
        return html;
    }

    getEmotionDots() {
        let html = [];
        let count = 0;
        const emotionPage = this.state.emotionPage;
        let swipeLength = emotionIcons.length % ROW_NUMBER === 0 ? (emotionIcons.length / ROW_NUMBER) : ((emotionIcons.length - (emotionIcons.length % ROW_NUMBER)) / ROW_NUMBER + 1);
        while (count < swipeLength) {
            html.push(
                <i className={emotionPage === count ? "main-color" : ""} key={count} style={{...style.dots.dot, borderColor: "#d7d7d7"}}/>
            );
            count++;
        }
        return <div style={style.dots}>{html}</div>;
    }

    getFastWord() {
        return <List>
            {
                fastWords.map((word, i) => (
                    <ListItem key={i} innerDivStyle={{padding: '.4rem'}} primaryText={<font style={{fontSize: ".4rem"}}>{word.value}</font>} onTouchTap={() => {
                        this.chooseFastWord(word.value);
                    }}/>
                ))
            }
        </List>;
    }

    getSendButton() {
        const {inputValue, inputImage, sendBarrageIng} = this.state;
        if (inputValue || inputImage) {
            if (sendBarrageIng) {
                return <div className="main-background-color" style={style.bottomPanel.submitButtonOn}>
                    <CircularProgress size={20} thickness={1} color={"white"} style={{right: 6}}/>
                    <font>{intl.get("sending")}</font>
                </div>;
            } else {
                return <div className="main-background-color" style={style.bottomPanel.submitButtonOn} onClick={() => {
                    this.sendBarrage();
                }}>
                    {intl.get("button.send")}
                </div>;
            }
        } else {
            return <div style={style.bottomPanel.submitButton}>
                {intl.get("button.send")}
            </div>;
        }
    }

    chooseEmotion(imgUrl) {
        if (this.state.sendBarrageIng) return;
        this.setState({
            inputImage: imgUrl,
            inputValue: ""
        });
    }

    chooseFastWord(word) {
        if (this.state.sendBarrageIng) return;
        this.setState({
            inputImage: "",
            inputValue: word
        });
    }

    handelChangeTab(index) {
        this.setState({
            tabIndex: index
        });
    }

    handelChangeEmotionPage(index) {
        this.setState({
            emotionPage: index
        });
    }

    sendBarrage() {
        let type = "";
        if (super.validUserBindDevice(this.props.userInfoData, this.props.globAlertAction) !== true) return;
        if (super.validUserDeviceOnline(this.props.ottInfo, this.props.globAlertAction) !== true) return;
        const {inputValue, inputImage} = this.state;
        const {data} = this.props.userInfo.userInfoData || {data: {}};
        if (inputValue) type = "txt";
        if (inputImage) type = "img";
        if (type) {
            const param = {
                type: 14, id: JSON.stringify({
                    model: "danmu",
                    danmu: {
                        type: type,
                        data: {
                            avatar: data.headerImg,
                            content: inputValue || inputImage
                        }
                    }
                })
            };
            this.setState({
                sendBarrageIng: true
            });
            const success = () => {
                this.setState({
                    inputImage: "",
                    inputValue: "",
                    sendBarrageIng: false
                });
                this.props.globAlertAction(intl.get("msg.send.success"), "");
            };
            const fail = (msg) => {
                this.setState({
                    sendBarrageIng: false
                });
                this.props.globAlertAction(msg, "");
            };
            dynaPush({
                ottInfo: this.props.ottInfo,
                userInfo: this.props.userInfo,
                param: param,
                localNetIsWork: this.props.localNetIsWork,
                action_pushLocal: this.props.action_pushLocal,
                action_setLocalNet: this.props.action_setLocalNet,
                action_push: this.props.action_push,
                action_setGlobAlert: this.props.globAlertAction,
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

    handelChange(t, value) {
        value = value.trim() || "";
        // value = value.replace(/[\r\n]/g, "");
        if (value.length >= 50) {
            this.setState({
                barrageSendToast: true,
                barrageToastMsg: intl.get("msg.not.more.than", {number: 50})
            });
            value = value.substr(0, 50);
        }
        this.setState({
            inputValue: value
        });
    }

    onFocus() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.setState({
            focusHeight: h,
            inputIng: true
        });
    }

    onBlur() {
        setTimeout(() => {
            this.setState({
                inputIng: false
            });
        }, 300);
    }

    handelResize() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const {focusHeight} = this.state;
        if (h > focusHeight) {
            this.blurSearchInput();
        }
        this.setState({
            focusHeight: h
        });
    }

    handelInputBlur(e) {
        const input = ReactDOM.findDOMNode(this.refs.input);
        if (input && !input.contains(e.target)) {
            this.blurSearchInput();
        }
    }

    blurSearchInput() {
        this.refs.input.input.refs.input.blur();
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.app.user.userInfo,
        common: state.app.common,
        userInfoData: state.app.user.userInfo.userInfoData,
        ottInfo: state.app.device.ottInfo,
        localNetIsWork: state.app.common.localNetIsWork,
        result: state.app.user.photoAlbum
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        action_pushLocal: bindActionCreators(pushLocal, dispatch),
        ossUploadWxPicActions: bindActionCreators(ossUploadWxPic, dispatch),
        action_setLocalNet: bindActionCreators(setLocalNet, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Barrage));
