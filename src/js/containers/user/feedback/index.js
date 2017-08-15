/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getFeedbackQuestionList, uploadImg64} from "../../../actions/userActions";
import {reqHeader} from "../../../utils/comUtils";

import {GridList, GridTile} from "material-ui/GridList";
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from "material-ui/svg-icons/content/clear";
import InputBox from "../../../components/photoAlbum";

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

        this.state = {
            questionList: [],
            imgList: [addBtn],
            submitParams: {
                questionId: null,
                questionDesc: "",
                imgId: null,
                contact: null
            }
        };

        this.inputChange = this.inputChange.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.questionList.questionListStamp !== this.props.questionList.questionListStamp) {
            this.updateQuestionList();
        }
        if (preProps.uploadImgData.uploadImgStamp !== this.props.uploadImgData.uploadImgStamp) {
            this.updateUploadImg();
        }
    }

    componentDidMount() {
        const questionListParams = {};
        this.props.getFeedbackQuestionListAction(questionListParams, reqHeader(questionListParams));
    }

    render() {
        const questionList = this.state.questionList;
        let QuestionList = [];
        questionList.forEach((item, ind) => {
            QuestionList.push(<GridTile
                key={item.id}
                style={styles.questionsTile}
                onTouchTap={() => {
                    const newList = questionList.filter((tile) => {
                       if (tile.id === item.id) {
                           tile.isSelected = true;
                           return tile;
                       }
                       tile.isSelected = false;
                       return tile;
                    });
                    let submitParams = this.state.submitParams;
                    submitParams.questionId = item.id;
                    this.setState({
                        submitParams: submitParams,
                        questionList: newList
                    });
                }}
            >
                <div style={questionList[ind].isSelected ? styles.questionsContentActive : styles.questionsContent}>{item.questionName}</div>
            </GridTile>);
        });

        return (
            <div>
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
                        {QuestionList}
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
                        maxLength="200"
                        onChange={(e) => {
                            let submitParams = this.state.submitParams;
                            submitParams.questionDesc = e.target.value;
                            this.setState({
                                submitParams: submitParams
                            });
                        }}
                    >
                    </textarea>
                    <div>
                        <div style={styles.questionDescTip}>
                            {this.state.submitParams.questionDesc.length <= 0 ? "至少10个字，最多200字，不然宝宝要生气!" : `${this.state.submitParams.questionDesc.length}/200`}
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
                        cellHeight={70}
                        cols={5}
                        badgeBackgroundColor="#ce0000"
                        badgeContent={<ClearIcon color="#fff"/>}
                        badgeStyle={{top: "-5px", right: "-5px"}}
                        data={this.state.imgList}
                        inputChange={this.inputChange}
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
                        />
                    </div>
                </section>
                <section
                    style={{backgroundColor: "#eee", padding: "20px 10px"}}
                >
                    <RaisedButton
                        backgroundColor="#ff8632"
                        disabledBackgroundColor="#ccc"
                        disabled={this.state.submitParams.questionId === null || this.state.submitParams.questionDesc.length < 10}
                        label="提交"
                        style={styles.submitBtn}
                        buttonStyle={styles.submitBtn}
                        labelStyle={{lineHeight: "50px", fontSize: "18px", color: "#fff"}}
                    />
                </section>
            </div>
        );
    }

    // 图片input onChange
    inputChange(dataUrl) {
        const params = {
            imgBase: dataUrl,
            imgSuffix: "png"
        };
        this.props.uploadImgAction(params, reqHeader(params));
    }

    // 上传图片后数据更新
    updateUploadImg() {
        const {data} = this.props.uploadImgData;
    }

    // 问题类型数据更新
    updateQuestionList() {
        const {data} = this.props.questionList.questionListData || {data: {}};
        const {result} = data || {result: []};
        result[0].isSelected = true;

        let submitParams = this.state.submitParams;
        submitParams.questionId = result[0].id;
        this.setState({
            submitParams: submitParams
        });

        this.setState({
            questionList: result.filter((item) => {
                if (!item.isSelected) item.isSelected = false;
                return item;
            })
        });
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
        uploadImgAction: bindActionCreators(uploadImg64, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));
