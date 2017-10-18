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
import Input from "../../components/common/Input";
import {push, pushLocal} from "../../actions/audioActons";
import BaseComponent from "../../components/common/BaseComponent";
import {chkDevice, dynaPush, reqHeader} from "../../utils/comUtils";

import bindActionCreators from "redux/es/bindActionCreators";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import * as ReactDOM from "react-dom";
import Const from "../../utils/const";

const fastWords = [
    {value: "女神，唱得太好了，请收下我的飞吻！"},
    {value: "秋名山上路人稀，常有麦霸较高低"},
    {value: "好冷，能给点激情吗？"},
    {value: "帅锅，我想做你的菜~~"},
    {value: "妹子，可否邀你共唱一曲...嘿嘿嘿"},
    {value: "女神女神我爱你，就像老鼠爱大米"},
    {value: "简直帅到无法形容。"},
    {value: "来，让我们嗨唱到天亮"},
    {value: "此音只应天上有，唱到迷人无处求。"},
    {value: "666~~~"},
    {value: "男神~唱得太好啦！我想和你一起唱"},
    {value: "一白遮百丑，一首顶两首。"},
    {value: "狮吼功重现江湖~快闪开"},
    {value: "欧巴~欧巴 请收下我的膝盖"},
    {value: "来来来，唱完这首还有三首。"},
    {value: "我的王妃，我要霸占你的美！"},
    {value: "女神再来一首，今天不醉不归"},
    {value: "老司机，带带我，带我卖萌带我飞。"},
    {value: "哇塞！唱得太好听了"},
    {value: "有麦必抢，唱成歌王。"}
];
const emotionIcons = [
    {id: 1, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/5ff4726f5eed439f119a39920af02f65.png"},
    {id: 2, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/10.png"},
    {id: 3, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/184aa5baa96efcb430ede9c4dd2f23c0.png"},
    {id: 4, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/1314.png"},
    /*{id: 5, name: "表情名字", url: "http://file.jmake.cp57.ott.cibntv.net/pic/3213.png"},*/
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
            backgroundColor: "#ff6832",
            borderRadius: '1.067rem'
        }
    }
};

//一页显示的表情个数
const ROW_NUMBER = 6;

class Barrage extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("弹幕");
        this.state = {
            tabIndex: 0,
            inputIng: false,
            emotionPage: 0,
            inputValue: "",
            inputImage: "",
            sendBarrageIng: false,
            barrageSendToast: false,
            barrageToastMsg: "发送成功"
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
    }

    componentWillUnmount() {
        document.removeEventListener("touchstart", this.handelInputBlur);
        window.removeEventListener("resize", this.handelResize);
    }

    render() {
        const {inputValue, inputImage} = this.state;
        const {w, h, r} = this.props.common;
        const {isAndroid} = chkDevice();
        let tabBackgroundColor = ["#d7d7d7", "#d7d7d7"];
        tabBackgroundColor[this.state.tabIndex] = "#ff6833";
        let tabIcon = [barrageImg, emotionImg];
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
                            hintText={`说点儿什么...`}
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
                        buttonStyle={{flexDirection: "row", height: '1.2rem', backgroundColor: tabBackgroundColor[0]}}
                        onActive={() => {
                            this.handelChangeTab(0);
                        }}
                        label={
                            <div style={{
                                ...style.tabs.tab.label,
                                color: this.state.tabIndex === 0 ? "white" : "#9a9a9a"
                            }}>
                                <img src={tabIcon[0]} style={style.tabs.tab.label.img}/>快速弹幕
                            </div>
                        }>
                        {
                            this.getFastWord()
                        }
                    </Tab>
                    <Tab
                        buttonStyle={{flexDirection: "row", height: '1.2rem', backgroundColor: tabBackgroundColor[1]}}
                        onActive={() => {
                            this.handelChangeTab(1);
                        }}
                        label={
                            <div style={{
                                ...style.tabs.tab.label,
                                color: this.state.tabIndex === 1 ? "white" : "#9a9a9a"
                            }}>
                                <img src={tabIcon[1]}
                                     style={style.tabs.tab.label.img}/>表情
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
                </Tabs>

                {((!this.state.inputIng && isAndroid) || !isAndroid) ? <div style={style.bottomPanel}>
                    {
                        this.getSendButton()
                    }
                </div> : ""}
            </div>
        );
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
                <i key={count} style={{...style.dots.dot, borderColor: emotionPage === count ? "#ff6833" : "#d7d7d7"}}/>
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
                return <div style={style.bottomPanel.submitButtonOn}>
                    <CircularProgress size={20} thickness={1} color={"white"} style={{right: 6}}/>
                    <font>发送中</font>
                </div>;
            } else {
                return <div style={style.bottomPanel.submitButtonOn} onClick={() => {
                    this.sendBarrage();
                }}>
                    发送
                </div>;
            }
        } else {
            return <div style={style.bottomPanel.submitButton}>
                发送
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
        if (super.validUserBindDevice(this.props.userInfoData, this.props.action_setGlobAlert) !== true) return;
        if (super.validUserDeviceOnline(this.props.ottInfo, this.props.action_setGlobAlert) !== true) return;
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
                this.props.action_setGlobAlert("发送成功", "");
            };
            const fail = (msg) => {
                this.setState({
                    sendBarrageIng: false
                });
                this.props.action_setGlobAlert(msg, "");
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

    handelChange(t, value) {
        value = value.trim() || "";
        // value = value.replace(/[\r\n]/g, "");
        if (value.length >= 50) {
            this.setState({
                barrageSendToast: true,
                barrageToastMsg: "最多只能输入50个字符"
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
)(Barrage));
