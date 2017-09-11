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
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from "material-ui/svg-icons/content/clear";
import InputBox from "../../../components/photoAlbum";
import SubmitSuccessIcon from "../../../../img/submit_success.png";
import navUtils from "../../../utils/navUtils";
import ButtonPage from "../../../components/common/ButtonPage";
import {setGlobAlert} from "../../../actions/common/actions";

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
        super.title("意见反馈");

        this.state = {
            matchParams: this.props.match.params,
            questionList: [],
            imgList: [addBtn],
            submitParams: {
                questionIds: null,
                content: "",
                imgIds: null,
                tel: null
            }
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
                            >问题类型</div>
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
                        style={{backgroundColor: "#eee"}}
                    >
                        <header>
                            <div
                                style={styles.sectionHeader}
                            >问题描述</div>
                        </header>
                        <textarea
                            style={styles.questionDesc}
                            placeholder="亲爱的麦粉，把你遇到的问题或建议写下来吧......"
                            onChange={(e) => {
                                let content = e.target.value;

                                if (content.length >= 200) {
                                    e.target.value = content.slice(0, 200);
                                    this.props.action_setGlobAlert("字太多啦，不准写了");
                                }
                                submitParams.content = content.slice(0, 200);
                                this.setState({
                                    submitParams: submitParams
                                });
                            }}
                        >
                </textarea>
                        <div>
                            <div style={styles.questionDescTip}>
                                {this.state.submitParams.content.length <= 0 ? "至少10个字，最多200字，不然宝宝要生气!" : `${this.state.submitParams.content.length}/200`}
                            </div>
                        </div>
                    </section>
                    <section
                        style={{backgroundColor: "#eee"}}
                    >
                        <header>
                    <span
                        style={styles.sectionHeader}
                    >上传照片</span>
                            <span style={{marginLeft: "5px", fontSize: "12px", color: "#808080"}}>最多5张</span>
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
                            >联系方式</div>
                        </header>
                        <div
                            style={{paddingLeft: "10px", paddingRight: "10px"}}
                        >
                            <input
                                type="text"
                                placeholder="手机、QQ或邮箱"
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
                            label="提交"
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
                        }}>提交成功</p>
                        <p style={{
                            textAlign: "center",
                            color: "#807f7e",
                            fontSize: "14px"
                        }}>我们将会在第一时间处理，感谢您的反馈！</p>
                    </div>}
                    imgStyle={{width: "100px"}}
                    buttonLabel="关闭"
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

        if (submitParams.questionIds === null) {
            actionGlobAlert("至少选择一个问题类型");
            return;
        }

        submitParams.content = submitParams.content.trim();
        if (submitParams.content.length <= 0) {
            actionGlobAlert("认真点！还差几个字");
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
                actionGlobAlert("网络开小差咯");
            }
        });
    }

    // 图片input onChange
    addBtnClick() {
        const _this = this;
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            window.wx && window.wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    localIds.map((item) => {
                        window.wx.uploadImage({
                            localId: item, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                const params = {
                                    mediaId: res.serverId // 返回图片的服务器端ID
                                };
                                _this.props.uploadImgAction(params, reqHeader(params), (res) => {
                                    const {data} = res;
                                    data[0].isShowBadge = true;
                                    let imgList = _this.state.imgList;
                                    if (imgList.length >= 5 && imgList[imgList.length - 1].isShowAddBtn) {
                                        imgList.pop();
                                    }

                                    _this.setState({
                                        imgList: [data[0], ...imgList]
                                    });
                                });
                            }
                        });
                    });
                }
            });
        } else {
            alert("请在微信客户端上传图片");
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
