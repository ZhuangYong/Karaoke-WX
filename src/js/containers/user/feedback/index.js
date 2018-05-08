/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {
    deleteImg, feedbackSubmit, getFeedbackQuestionList, OSSAccessToken, ossUploadWxPic,
    uploadImg
} from '../../../actions/userActions';
import { getEncryptHeader, getWxinfoFromSession, reqHeader, toRem } from '../../../utils/comUtils';

import {GridList, GridTile} from "material-ui/GridList";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from "material-ui/svg-icons/content/clear";
import InputBox from "../../../components/photoAlbum";
import SubmitSuccessIcon from "../../../../img/submit_success.png";
import NotWXIcon from "../../../../img/pay_failed.png";
import navUtils from "../../../utils/navUtils";
import ButtonPage from "../../../components/common/ButtonPage";
import {setGlobAlert} from "../../../actions/common/actions";
import ActionTypes from "../../../actions/actionTypes";
import intl from 'react-intl-universal';
import OSS from "../../../../css/aliyun-oss-sdk-4.4.4.min";
import UUID from "short-uuid/dist/short-uuid";
import SubmitLoading from '../../../components/common/SubmitLoading';

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


class Feedback extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.feedback"));

        this.state = {
            matchParams: this.props.match.params,
            questionList: [],
            imgList: [],
            submitParams: {
                questionIds: null,
                content: "",
                imgIds: null,
                tel: null
            },
            showAlert: false,
            globAlert: "toast",
            client: null,
            deleteLoading: false,
            uploadImgLoading: false
        };

        this.submit = this.submit.bind(this);
        this.closePage = this.closePage.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.uploadImgGetter = this.uploadImgGetter.bind(this);
        this.deleteImgGetter = this.deleteImgGetter.bind(this);
        this.addBtnTouchTap = this.addBtnTouchTap.bind(this);
    }

    componentDidUpdate(preProps) {
        const {isWeixin} = window.sysInfo;

        /**
         * 页面内容处理
         */
        const matchParams = this.props.match.params;
        if (preProps.match.params.state !== matchParams.state) {
            this.setState({
                matchParams: matchParams
            });
        }

        /**
         * 生成OSS实例对象
         */
        if (!isWeixin) {
            const data = this.props.result.OSSTokenData;
            if (typeof data !== 'undefined' && data !== {} && this.state.client === null) {

                this.state.client = new OSS.Wrapper({
                    accessKeyId: data.accessKeyId,
                    accessKeySecret: data.accessKeySecret,
                    stsToken: data.securityToken,
                    endpoint: data.endpoint,
                    bucket: data.bucketName
                });
            }
        }
    }

    componentDidMount() {
        const {isWeixin} = window.sysInfo;

        /**
         * 获取问题类型列表
         * @type {{}}
         */
        const questionListParams = {};
        this.props.getFeedbackQuestionListAction(questionListParams, reqHeader(questionListParams));

        /**
         * 获取OSS对象参数
         */
        !isWeixin && this.props.OSSTokenActions({}, reqHeader({}));
    }

    render() {
        const {isWeixin} = window.sysInfo;

        const data = this.props.questionList.questionListData;
        const {result} = data || {};
        const imgList = this.state.imgList;
        const questionList = result || [];
        let submitParams = this.state.submitParams;

        if (submitParams.questionIds === null && questionList[0]) {
            submitParams.questionIds = questionList[0].id;
        }

        return (
            <div>
                {isWeixin ? (this.matchPages() ? (<div>
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
                            >{intl.get("feedback.problem.desc")}</div>
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
                            bodyStyle={{height: 'auto', minHeight: 48, lineHeight: '.7rem', display: 'flex', alignItems: 'center'}}
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
                            ref="getInputBox"
                            cols={5}
                            stopInput={isWeixin}
                            addBtnTouchTap={this.addBtnTouchTap}
                            isShowAddBtn={imgList.length < 5}
                            itemStyle={{
                                margin: 0,
                                padding: `0 ${toRem(5)}`,
                                width: toRem(140),
                                height: toRem(140)
                            }}
                            badgeBackgroundColor="#ce0000"
                            badgeContent={<ClearIcon
                                style={{
                                    width: "20px",
                                    height: "20px"
                                }}
                                color="#fff"
                            />}
                            badgeContentClick={this.deleteImgGetter}
                            badgeStyle={{
                                top: `-${toRem(5)}`,
                                right: `-${toRem(2)}`,
                                width: "20px",
                                height: "20px"
                            }}
                            data={imgList}
                            inputChange={this.inputChange}
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
                />)) : <ButtonPage
                    src={NotWXIcon}
                    content={intl.get("msg.operate.in.we.chat")}
                    imgStyle={{width: "100px"}}
                    hideButton={true}
                />}

                <SubmitLoading hide={!(this.state.uploadImgLoading || this.state.deleteLoading)} />
            </div>
        );
    }

    closePage() {
        const matchParams = this.state.matchParams;
        if (matchParams.deviceId === 'webHome') {
            window.history.back();
            return;
        }

        window.WeixinJSBridge.call('closeWindow');
    }

    // 页面状态识别
    matchPages() {
        let res = null;
        const matchParams = this.props.match.params;
        switch (matchParams.state) {
            case "home":
                res = true;
                break;
            case "webHome":
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

        const actionGlobAlert = this.props.globAlertAction;
        const submitParams = this.state.submitParams;
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
        this.state.imgList.map(tile => {
            imgListIds.push(tile.id);
        });

        submitParams.imgIds = imgListIds.join(',');

        const matchParams = this.state.matchParams;
        if (typeof matchParams.deviceId !== "undefined") {

            const nodeEnv = process.env.NODE_ENV;
            if (nodeEnv === 'expand' || nodeEnv === 'expandTest' || nodeEnv === 'master') {
                submitParams.deviceUuid = matchParams.deviceId;
                header = reqHeader(submitParams);
            } else {

                const encryptHeader = getEncryptHeader({
                    deviceId: matchParams.deviceId
                });

                header = reqHeader(submitParams, encryptHeader);
            }
        } else {
            header = reqHeader(submitParams);
        }

        this.props.feedbackSubmitAction(submitParams, header, (res) => {
            navUtils.replace(`/user/feedback/success/${matchParams.state}`);
        });
    }


    /**
     * 添加按钮点击事件
     */
    addBtnTouchTap() {

        const globAlert = this.props.globAlertAction;
        const {isWeixin} = window.sysInfo;
        isWeixin && this.uploadWxImgGetter().then(res => {

            const {msg, result} = res;

            let imgList = this.state.imgList;

            result.map(item => {
                const imgObj = {
                    id: item.id,
                    imgUrl: item.url,
                    isShowBadge: true
                };
                imgList.push(imgObj);
            });

            this.setState({
                uploadImgLoading: false,
                imgList: imgList
            });

            globAlert(msg);
        }).catch(err => {

            this.setState({
                uploadImgLoading: false
            });

            globAlert(err.msg);
        });
    }

    /**
     * 删除图片
     * @param id 删除图片id[]
     */
    deleteImgGetter(id) {

        this.setState({
            deleteLoading: true
        });
        const globAlert = this.props.globAlertAction;

        const params = {
            uid: id
        };
        this.props.deleteImgActions(params, reqHeader(params), res => {
            let imgList = this.state.imgList.filter(tile => {
                if (parseInt(tile.id, 10) !== parseInt(id, 10))
                    return tile;
            });
            this.setState({
                imgList: imgList,
                deleteLoading: false
            });
            globAlert(intl.get("msg.delete.success"));
        }, err => {
            globAlert(intl.get("msg.delete.fail"));
            this.setState({
                deleteLoading: false
            });
        });
    }

    /**
     * 监听添加图片时的input[file] onchange事件
     * @param file 图片文件file[0]
     */
    inputChange(file) {
        // console.log(file);
        this.setState({
           uploadImgLoading: true
        });

        const globAlert = this.props.globAlertAction;
        const name = 'feedback/' + UUID().new() + '.' + file.type.split('/')[1];

        console.log(name);

        this.uploadImgGetter(file, name).then(res => {

            const {msg, id, url} = res;

            let imgList = this.state.imgList;
            const imgObj = {
                id: id,
                imgUrl: url,
                isShowBadge: true
            };

            this.setState({
                uploadImgLoading: false,
                imgList: [...imgList, imgObj]
            });

            globAlert(msg);
        }).catch(err => {

            this.setState({
                uploadImgLoading: false
            });

            globAlert(err.msg);
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
                                    result = {...res, msg: intl.get('msg.upload.success')};
                                    resolve(result);
                                }, err => {
                                    result = {msg: intl.get('msg.upload.fail')};
                                    reject(err);
                                });
                            }
                        });
                    });
                },
                fail: () => {
                    globAlertAction("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        });

    }

    /**
     * 上传图片到OSS，然后发文件路径传给服务器
     * @param file 图片文件 required file/Buffer/String
     * @param name 图片名字 string
     */
    uploadImgGetter(file, name) {
        // console.log(file);
        return new Promise((resolve, reject) => {
            const userInfo = getWxinfoFromSession();
            let result = {};
            if (userInfo) {
                const storeAs = userInfo.uuid + '/' + name;
                this.state.client.multipartUpload(storeAs, file).then(result => {
                    console.log(result);
                    const param = {
                        type: 2,
                        key: result.name
                    };

                    this.props.uploadImgActions(param, reqHeader(param), res => {
                        result = {
                            data: res,
                            msg: "上传成功"
                        };
                        resolve(result);
                    }, err => {
                        result = {msg: "上传服务器失败"};
                        reject(result);
                    });
                }).catch(function (err) {
                    console.log(err);
                    result = {msg: "上传OSS失败"};
                    reject(result);
                });

            } else {
                result = {msg: intl.get("get.user.info.fail.try.again")};
                reject(result);
            }
        });

    }

}

Feedback.defaultProps = {
    questionList: {},
    result: {}
};

Feedback.propTypes = {
    questionList: PropTypes.object,
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        questionList: state.app.user.feedback,
        result: state.app.user.photoAlbum
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        OSSTokenActions: bindActionCreators(OSSAccessToken, dispatch),
        getFeedbackQuestionListAction: bindActionCreators(getFeedbackQuestionList, dispatch),
        uploadImgActions: bindActionCreators(uploadImg, dispatch),
        ossUploadWxPicActions: bindActionCreators(ossUploadWxPic, dispatch),
        deleteImgActions: bindActionCreators(deleteImg, dispatch),
        feedbackSubmitAction: bindActionCreators(feedbackSubmit, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));
