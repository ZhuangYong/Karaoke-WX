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
import {dynaPush, reqHeader} from "../../utils/comUtils";

import bindActionCreators from "redux/es/bindActionCreators";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";

const fastWords = [
    {value: "哇塞!唱得太好听了"},
    {value: "偶像，请收下我的膝盖！"},
    {value: "歌神！请给我签个名吧"},
    {value: "我只是路过打酱油的~~"},
    {value: "来来来，唱完这一首还有三首~"},
    {value: "简直帅到无法形容"},
    {value: "美女美女我爱你，就像老鼠爱大米"},
    {value: "来，让我们嗨唱到天亮"},
    {value: "这音只应天上有,唱到迷人无处求"},
    {value: "帅锅，来来，陪我再唱一曲"}
];
const emotionIcons = [
    {id: 1, name: "表情名字", url: "http://image.jmake.cp57.ott.cibntv.net/fk/9E29D511D9051A00.jpg"},
    {id: 2, name: "表情名字", url: "http://image.jmake.cp57.ott.cibntv.net/fk/C3DA48D6BBEECF98.jpg"},
    {id: 3, name: "表情名字", url: "http://image.jmake.cp57.ott.cibntv.net/fk/3C8D2171B0B5A2ED.jpg"},
    {
        id: 10,
        name: "表情名字",
        url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=127721107,2495760160&fm=117&gp=0.jpg"
    },
    {
        id: 11,
        name: "表情名字",
        url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=53750650,2324233921&fm=26&gp=0.jpg"
    },
    {
        id: 12,
        name: "表情名字",
        url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3166025927,1572735166&fm=117&gp=0.jpg"
    },
    {
        id: 13,
        name: "表情名字",
        url: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1960126973,2266380470&fm=26&gp=0.jpg"
    }
];

const style = {
    tabs: {
        tab: {
            label: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                img: {
                    marginRight: 12,
                    width: 22
                }
            }
        }
    },
    dots: {
        position: "absolute",
        bottom: -20,
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
        height: 60,
        bottom: 0,
        textAlign: "center",
        boxShadow: "0px -2px 3px 0px rgba(128, 128, 128, 0.48)",
        backgroundColor: "white",
        submitButton: {
            display: "block",
            width: 200,
            height: 40,
            fontSize: "18px",
            padding: "10px",
            margin: "10px auto",
            color: "#999999",
            backgroundColor: "#d7d7d7",
            borderRadius: 20
        },
        submitButtonOn: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 40,
            fontSize: "18px",
            margin: "10px auto",
            color: "#ffffff",
            backgroundColor: "#ff6832",
            borderRadius: 20
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
    }

    render() {
        const {inputValue, inputImage} = this.state;
        const fastWordPanelHeight = document.documentElement.clientHeight - (5.336 + 1.2) * (document.documentElement.clientWidth / 10) - 60;
        let tabBackgroundColor = ["#d7d7d7", "#d7d7d7"];
        tabBackgroundColor[this.state.tabIndex] = "#ff6833";
        let tabIcon = [barrageImg, emotionImg];
        let tabOnIcon = [barrageOnImg, emotionOnImg];
        tabIcon[this.state.tabIndex] = tabOnIcon[this.state.tabIndex];
        const showTabContainer = window.sysInfo.isAndroid ? !this.state.inputIng : true ;
        return (
            <div>
                <div style={{textAlign: "center", height: '5.336rem', overflow: "hidden"}} onTouchTap={() => {
                    inputImage && this.setState({
                        inputImage: ""
                    });
                }}>
                    {
                        inputImage ? <img src={inputImage} alt="" style={{height: "90%", maxWidth: "100%"}} /> : <TextField
                            hintText="说点儿什么..."
                            hintStyle={{top: 0, padding: 12}}
                            textareaStyle={{paddingLeft: 12}}
                            multiLine={true}
                            rows={10}
                            maxLength={50}
                            rowsMax={10}
                            fullWidth={true}
                            value={inputValue}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChange={this.handelChange.bind(this)}
                        />
                    }
                </div>
                <Tabs
                    tabItemContainerStyle={{backgroundColor: "#d7d7d7"}}
                    contentContainerStyle={{
                        position: "absolute",
                        bottom: 60,
                        height: fastWordPanelHeight || 200,
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
                            (showTabContainer && this.getFastWord()) || <div/>
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
                                (showTabContainer && this.getEmotion()) || <div/>
                            }
                        </SwipeableViews>
                        {
                            showTabContainer && this.getEmotionDots()
                        }
                    </Tab>
                </Tabs>

                <div style={style.bottomPanel}>
                    {
                        this.getSendButton()
                    }
                </div>

                <Snackbar
                    open={this.state.barrageSendToast}
                    message={this.state.barrageToastMsg}
                    autoHideDuration={500}
                    onRequestClose={() => {
                        this.setState({
                            barrageSendToast: false
                        });
                    }}
                />
            </div>
        );
    }

    getEmotion() {
        let html = [];
        const swipeLength = (emotionIcons.length - (emotionIcons.length % ROW_NUMBER)) / ROW_NUMBER + 1;
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
                                                 height: '3.334rem',
                                                 overflow: 'hidden',
                                                 padding: 6,
                                                 fontSize: 12,
                                                 textAlign: "center"
                                             }}>
                                    <img src={url} alt='' style={{maxWidth: "100%"}}/>
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
        const swipeLength = (emotionIcons.length - (emotionIcons.length % ROW_NUMBER)) / ROW_NUMBER + 1;
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
                    <ListItem key={i} primaryText={word.value} onTouchTap={() => {
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
                    sendBarrageIng: false,
                    barrageSendToast: true,
                    barrageToastMsg: "发送成功"
                });
            };
            const fail = (msg) => {
                this.setState({
                    sendBarrageIng: false,
                    barrageSendToast: true,
                    barrageToastMsg: msg
                });
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
        value = value.replace(/[\r\n]/g, "");
        this.setState({
            inputValue: value
        });
    }

    onFocus() {
        this.setState({
            inputIng: true
        });
    }

    onBlur() {
        this.setState({
            inputIng: false
        });
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
