/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {feedbackSubmit, getFeedbackQuestionList, uploadImgWeiXin} from "../../../actions/userActions";
import {getEncryptHeader, reqHeader} from "../../../utils/comUtils";

import {GridList, GridTile} from "material-ui/GridList";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from "material-ui/svg-icons/content/clear";
import InputBox from "../../../components/photoAlbum";
import SubmitSuccessIcon from "../../../../img/submit_success.png";
import navUtils from "../../../utils/navUtils";
import ButtonPage from "../../../components/common/ButtonPage";
import {setGlobAlert} from "../../../actions/common/actions";
import ActionTypes from "../../../actions/actionTypes";
import intl from 'react-intl-universal';

const styles = {
    sectionHeader: {
        paddingLeft: "10px",
        width: "100%",
        height: "50px",
        lineHeight: "50px",
        fontSize: "18px"
    },
    questionsTile: {
        boxSizing: "border-box",
        padding: "5px"
    },
    questionsContent: {
        width: "100%",
        height: "100%",
        backgroundColor: "#bcbcbc",
        // backgroundColor: "#ff8632",
        lineHeight: "30px",
        textAlign: "center",
        borderRadius: "4px",
        color: "#080808",
        fontSize: "14px"
    },
    questionsContentActive: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ff8632",
        lineHeight: "30px",
        textAlign: "center",
        borderRadius: "4px",
        color: "#fff",
        fontSize: "14px"
    },
    questionDesc: {
        paddingTop: "5px",
        paddingRight: "10px",
        paddingLeft: "10px",
        width: "100%",
        height: "120px",
        color: "#040404",
        fontSize: "14px",
        border: "none",
        // borderTop: "1px #ccc solid",
        resize: "none",
        boxSizing: "border-box"
    },
    questionDescTip: {
        paddingRight: "10px",
        width: "100%",
        height: "30px",
        lineHeight: "30px",
        backgroundColor: "#fff",
        marginTop: "-5px",
        fontSize: "14px",
        textAlign: "right",
        color: "#808080"
    },
    submitBtn: {
        display: "block",
        borderRadius: "50px",
        margin: "0 auto",
        width: "240px",
        height: "50px"
    }
};

const addBtn = {
    isShowAddBtn: true,
    id: "addBtn"
};


class Feedback extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.feedback"));

        this.state = {
            matchParams: this.props.match.params,
            questionList: [],
            imgList: [addBtn],
            submitParams: {
                questionIds: null,
                content: "",
                imgIds: null,
                tel: null
            },
            showAlert: false,
            globAlert: "toast"
        };

        this.addBtnClick = this.addBtnClick.bind(this);
        this.submit = this.submit.bind(this);
        this.closePage = this.closePage.bind(this);
    }

    componentDidUpdate(preProps) {

        const matchParams = this.props.match.params;
        if (preProps.match.params.state !== matchParams.state) {
            this.setState({
                matchParams: matchParams
            });
        }
    }

    componentDidMount() {
        const questionListParams = {};
        this.props.getFeedbackQuestionListAction(questionListParams, reqHeader(questionListParams));
    }

    render() {
        const {data} = this.props.questionList.questionListData || {data: {}};
        const {result} = data || {};
        const questionList = result || [];
        let submitParams = this.state.submitParams;

        if (submitParams.questionIds === null && questionList[0]) {
            submitParams.questionIds = questionList[0].id;
        }

        return (
            <div>
                {this.matchPages() ? (<div>
                    <section
                        style={{backgroundColor: "#eee"}}
                    >
                        <header>
                            <div
                                style={styles.sectionHeader}
                            >{intl.get("feedback.problem.type")}</div>
                        </header>

                        <GridList
                            cellHeight={40}
                            cols={3}
                            padding={0}
                            style={{paddingLeft: "5px", paddingRight: "5px"}}
                        >
                            {questionList.map((item) => (<GridTile
                                key={item.id}
                                style={styles.questionsTile}
                                onTouchTap={() => {

                                    submitParams.questionIds = item.id;
                                    this.setState({
                                        submitParams: submitParams
                                    });
                                }}
                            >
                                <div style={submitParams.questionIds === item.id ? styles.questionsContentActive : styles.questionsContent}>{item.questionName}</div>
                            </GridTile>))}
                        </GridList>

                    </section>
                    <section
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            backgroundColor: "#eee"
                        }}>
                        <header>
                            <div
                                style={styles.sectionHeader}
                            >问题描述</div>
                        </header>
                        <textarea
                            style={styles.questionDesc}
                            placeholder={intl.get("feedback.write.down.your.suggest")}
                            onChange={(e) => {
                                let content = e.target.value;

                                if (content.length >= 200) {
                                    e.target.value = content.slice(0, 200);
                                    this.setState({
                                        showAlert: true,
                                        globAlert: intl.get("feedback.too.much.word")
                                    });
                                }

                                submitParams.content = content.slice(0, 200);
                                this.setState({
                                    submitParams: submitParams
                                });
                            }}
                        />
                        <div>
                            <div style={styles.questionDescTip}>
                                {this.state.submitParams.content.length <= 0 ? intl.get("feedback.word.waring") : `${this.state.submitParams.content.length}/200`}
                            </div>
                        </div>
                        <Snackbar
                            open={this.state.showAlert}
                            message={this.state.globAlert}
                            autoHideDuration={2000}
                            onRequestClose={() => {
                                this.setState({
                                    showAlert: false
                                });
                            }}
                            style={{
                                position: "absolute"
                            }}
                        />
                    </section>
                    <section
                        style={{backgroundColor: "#eee"}}
                    >
                        <header>
                    <span
                        style={styles.sectionHeader}
                    >{intl.get("feedback.upload.photo")}</span>
                            <span style={{marginLeft: "5px", fontSize: "12px", color: "#808080"}}>{intl.get("feedback.most.photo", {number: 5})}</span>
                        </header>

                        <InputBox
                            cols={5}
                            badgeBackgroundColor="#ce0000"
                            itemStyle={{padding: "3px"}}
                            badgeContent={<ClearIcon
                                style={{width: "20px", height: "20px"}}
                                color="#fff"
                                onClick={(e) => {
                                    const deleteId = e.target.parentNode.parentNode.dataset.id;
                                    let imgList = this.state.imgList.filter((tile) => {
                                        if (parseInt(tile.id, 10) !== parseInt(deleteId, 10)) {
                                            return tile;
                                        }
                                    });
                                    if (imgList.length >= 4 && imgList[imgList.length - 1].isShowBadge) {
                                        imgList.push(addBtn);
                                    }
                                    this.setState({
                                        imgList: imgList
                                    });
                                }}
                            />}
                            badgeStyle={{width: "20px", height: "20px"}}
                            data={this.state.imgList}
                            addBtnTouchTap={this.addBtnClick}
                        />
                    </section>
                    <section
                        style={{backgroundColor: "#eee"}}
                    >
                        <header>
                            <div
                                style={styles.sectionHeader}
                            >{intl.get("feedback.contact")}</div>
                        </header>
                        <div
                            style={{paddingLeft: "10px", paddingRight: "10px"}}
                        >
                            <input
                                type="text"
                                placeholder={intl.get("feedback.mobile.QQ.mail")}
                                style={{width: "100%", height: "50px", backgroundColor: "#fff", border: "none", fontSize: "18px", textIndent: "10px", borderRadius: "4px"}}
                                maxLength={30}
                                onChange={(e) => {
                                    submitParams.tel = e.target.value;
                                    this.setState({
                                        submitParams: submitParams
                                    });
                                }}
                            />
                        </div>
                    </section>
                    <section
                        style={{backgroundColor: "#eee", padding: "20px 10px"}}
                    >
                        <RaisedButton
                            backgroundColor="#ff8632"
                            disabledBackgroundColor="#ccc"
                            disabled={this.state.submitParams.questionIds === null || this.state.submitParams.content.length < 10}
                            label={intl.get("button.submit")}
                            style={styles.submitBtn}
                            buttonStyle={styles.submitBtn}
                            labelStyle={{lineHeight: "50px", fontSize: "18px", color: "#fff"}}
                            onClick={this.submit}
                        />
                    </section>
                </div>) : (<ButtonPage
                    src={SubmitSuccessIcon}
                    content={<div>
                        <p style={{
                            textAlign: "center",
                            color: "#ff8632",
                            fontSize: "16px"
                        }}>{intl.get("feedback.submit.success")}</p>
                        <p style={{
                            textAlign: "center",
                            color: "#807f7e",
                            fontSize: "14px"
                        }}>{intl.get("feedback.thanks.feedback")}</p>
                    </div>}
                    imgStyle={{width: "100px"}}
                    buttonLabel={intl.get("button.close")}
                    touchTap={this.closePage}
                />)}
            </div>
        );
    }

    closePage() {
        const matchParams = this.state.matchParams;
        if (matchParams.deviceId !== "undefined") {
            window.WeixinJSBridge.call('closeWindow');
        } else {
            window.history.back();
        }
    }

    // 页面状态识别
    matchPages() {
        let res = null;
        const matchParams = this.props.match.params;
        switch (matchParams.state) {
            case "home":
                res = true;
                break;
            case "success":
                res = false;
                break;
            default:
                navUtils.replace("/*");
                break;
        }
        return res;
    }

    // 提交
    submit() {
        let header = null;

        const actionGlobAlert = this.props.action_setGlobAlert;
        const submitParams = this.state.submitParams;
        const {isWeixin} = window.sysInfo;
        if (!isWeixin) {
            actionGlobAlert(intl.get("user.we.chat.operate"));
            return;
        }
        if (submitParams.questionIds === null) {
            actionGlobAlert(intl.get("feedback.least.one.question"));
            return;
        }

        submitParams.content = submitParams.content.trim();
        if (submitParams.content.length <= 0) {
            actionGlobAlert(intl.get("feedback.word.least"));
            return;
        }

        let imgListIds = [];
        this.state.imgList.forEach((tile, ind) => {
            if (!tile.isShowAddBtn) {
                imgListIds.push(tile.id);
            }
        });

        submitParams.imgIds = imgListIds.join(',');

        const matchParams = this.state.matchParams;
        if (typeof matchParams.deviceId !== "undefined") {
            const encryptHeader = getEncryptHeader({
                deviceId: matchParams.deviceId
            });

            header = reqHeader(submitParams, encryptHeader);
        } else {
            header = reqHeader(submitParams);
        }

        this.props.feedbackSubmitAction(submitParams, header, (res) => {
            const {status, msg} = res;

            if (status === 1) {
                navUtils.replace(`/user/feedback/success/${matchParams.deviceId}`);
            } else {
                actionGlobAlert(intl.get("msg.network.die"));
            }
        });
    }

    // 图片input onChange
    addBtnClick() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            window.wx && window.wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    localIds.map((item) => {
                        window.wx.uploadImage({
                            localId: item, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: (res) => {
                                const params = {
                                    mediaId: res.serverId // 返回图片的服务器端ID
                                };
                                this.props.uploadImgAction(params, reqHeader(params), (res) => {
                                    const {data} = res;
                                    data[0].isShowBadge = true;
                                    let imgList = this.state.imgList;
                                    if (imgList.length >= 5 && imgList[imgList.length - 1].isShowAddBtn) {
                                        imgList.pop();
                                    }

                                    this.setState({
                                        imgList: [data[0], ...imgList]
                                    });
                                });
                            }
                        });
                    });
                },
                fail: () => {
                    this.props.action_setGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        } else {
            this.props.action_setGlobAlert(intl.get("msg.upload.in.we.chat.waring"));
        }
    }

}

Feedback.defaultProps = {
    questionList: {},
    uploadImgData: {}
};

Feedback.propTypes = {
    questionList: PropTypes.object,
    uploadImgData: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        questionList: state.app.user.feedback,
        uploadImgData: state.app.user.uploadImg
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFeedbackQuestionListAction: bindActionCreators(getFeedbackQuestionList, dispatch),
        uploadImgAction: bindActionCreators(uploadImgWeiXin, dispatch),
        feedbackSubmitAction: bindActionCreators(feedbackSubmit, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));
