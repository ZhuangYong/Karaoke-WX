import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {IconButton, Paper, RaisedButton, Subheader, TextField} from "material-ui";
import {bindActionCreators} from "redux";
import {getEncryptHeader, getQueryString, reqHeader, wxShare} from "../../utils/comUtils";
import Const from "../../utils/const";
import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import {setGlobAlert} from "../../actions/common/actions";
import NoWifi from "../../components/common/NoWifi";
import intl from 'react-intl-universal';
import SwipeItem from "../../components/common/SwipeItem";
import {deleteCommentOrReply, getCommentReplys, getComments, saveComments} from "../../actions/commentActons";
import PropTypes from "prop-types";
import {getUserInfo} from "../../actions/userActions";
import CommentInput from "./CommentInput";
import {getShareAudio} from "../../actions/audioActons";

const style = {
    loadingRotate: {
        width: '.42rem',
        height: '.42rem',
        marginRight: '.2rem',
        position: 'relative',
        loadingCircle: {
            stroke: '#FF9800',
            strokeLinecap: 'round',
            transition: 'all 850ms ease-in-out 0ms',
            strokeDasharray: '80, 114',
            strokeDashoffset: '-403.668'
        }
    },
};

const COMMENT_TYPE_COMMENT = 1;
const COMMENT_TYPE_COMMENT_REPLY = 2;

class CommentList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            pageSize: 20,
            pageData: [],
            loading: false,
            currentPage: 0,
            lastPage: false,
            shareId: this.props.shareId,
            cacheData: {},
            dataLoaded: false,
            showComment: false,
            commentFocus: false
        };
        this.onScroll = this.onScroll.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.loadAudioGetter = this.loadAudioGetter.bind(this);
    }

    componentDidUpdate(preProps) {
        if (this.state.type === COMMENT_TYPE_COMMENT && preProps.comment.commentListStamp !== this.props.comment.commentListStamp) {
            const data = this.props.comment.commentList;
            const {result, lastPage} = data;
            const pageData = [...this.state.pageData, ...(result || [])];
            this.setState({
                pageData: pageData,
                lastPage: lastPage,
                loading: false,
                dataLoaded: true,
                offLine: false
            });
        }
        if (this.state.type === COMMENT_TYPE_COMMENT_REPLY && preProps.comment.commentReplyListStamp !== this.props.comment.commentReplyListStamp) {
            const data = this.props.comment.commentReplyList;
            const {result, lastPage} = data;
            const pageData = [...this.state.pageData, ...(result || [])];
            this.setState({
                pageData: pageData,
                lastPage: lastPage,
                loading: false,
                dataLoaded: true,
                offLine: false
            });
        }

    }

    componentDidMount() {
        this.loadAudioGetter();
    }

    render() {
        let dataLsit = null;
        if (this.state.type === COMMENT_TYPE_COMMENT) dataLsit = this.props.comment && this.props.comment.commentList && this.props.comment.commentList.result;
        if (this.state.type === COMMENT_TYPE_COMMENT_REPLY) dataLsit = this.props.comment && this.props.comment.commentReplyList && this.props.comment.commentReplyList.result;

        const {lastPage, loading, offLine, currentPage, pageData, dataLoaded} = this.state;
        const showNoWifi = (offLine && currentPage !== 0 && pageData.length === 0);
        let scrollTopStyle = {};
        if (!this.state.needScrollToTop) {
            scrollTopStyle = {
                opacity: 0
            };
        }
        const audioUUID = (this.props.audio.audioInfo || {}).uuid;
        let myUUID = null;
        if (pageData.length) {
            myUUID = this.props.comment.commentList.unionId;
        }
        return (
            <Paper zDepth={0}>
                <div
                    ref="commentList"
                    className='common-comment-list'
                    onScroll={this.onScroll.bind(this)}>
                    {
                        this.state.type === COMMENT_TYPE_COMMENT_REPLY ? <div style={{borderBottom: "7px solid #f1f1f1"}}>
                            <div className="comment-reply-header">
                                {intl.get("reply.to.comments")}
                                <IconButton><NavigationClose onClick={this.props.handelClose}/></IconButton>
                            </div>
                            <div style={{marginTop: '1.6rem'}}/>
                            <SwipeItem key={this.props.shareId} data={this.props.selectComment} canDel={false}/>
                        </div> : ""
                    }
                    {
                        showNoWifi ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                    }
                    {
                        (!loading && dataLoaded && currentPage >= 1 && pageData.length === 0) ? <p style={{textAlign: 'center', color: 'gray'}}>{this.state.type === COMMENT_TYPE_COMMENT_REPLY ? intl.get("comments.no.reply") : intl.get("comments.no.comment")}</p> : <div>
                            <div className="comment-list" style={{marginBottom: 0}}>
                                <div>
                                    {
                                        pageData.map(c => <SwipeItem type={this.state.type} canDel={myUUID === audioUUID || myUUID === c.unionid} key={c.uuid} data={c} handelSelect={this.props.handelSelect} handelDelete={this.props.deleteCommentOrReplyAction} handelDeleteSuccess={() => {
                                            this.props.globAlertAction(intl.get("msg.delete.success"));
                                            this.refreshPage();
                                        }}/>)
                                    }
                                </div>
                            </div>
                            <div className="loading-bottom">
                                <div>
                                    {
                                        loading ? this.getLoading() : ""
                                    }
                                    <span>
                                        {
                                            loading ? intl.get("song.loading") : ""
                                        }
                                        {
                                            (!offLine && lastPage && !loading) ? intl.get("song.list.end") : ""
                                        }
                                        {
                                            (offLine && !showNoWifi && !loading) ? intl.get("msg.network.die") : ""
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/*{
                    this.state.showComment ? <section className={`more-comment-bottom ${this.state.canFocus && this.state.commentFocus ? "focus" : ""}`}>
                        <Subheader className="comment-container" style={{padding: "0 16px"}}>
                            <TextField
                                onClick={() => this.state.canFocus = true}
                                onFocus={() => this.setState({commentFocus: true})}
                                onBlur={() => this.setState({commentFocus: false})}
                                floatingLabelText=""
                                multiLine={true}
                                rowsMax={4}
                                ref="input"
                                className="comment-input"
                                hintText={
                                    <div>
                                        <font color="gray">{this.state.type === COMMENT_TYPE_COMMENT_REPLY ? "回复 " + this.props.selectComment.nickName : "评论录音"}</font>
                                    </div>
                                }
                                hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                                value={this.state.commentContent}
                                onChange={(v, a) => {
                                    this.checkUserInfo();
                                    this.setState({commentContent: a.substr(0, 200)});
                                }}
                            />
                            <RaisedButton className="comment-submit-button" primary={true} label={this.state.loading["comment"] ? this.getLoading() : "提交"} disabled={this.state.loading["comment"] || !this.state.commentContent} onClick={this.submitComment}/>
                        </Subheader>
                    </section> : ""
                }*/}

                {
                    this.state.showComment ? <CommentInput placeholder={this.state.type === COMMENT_TYPE_COMMENT_REPLY ? intl.get("comments.reply") + ":" + this.props.selectComment.nickName : intl.get("comments.comment.record")} submitComment={this.submitComment}/> : ""
                }

                {
                    <div className="scroll-to-top-button" style={{...scrollTopStyle, bottom: '3rem'}} onTouchTap={() => {
                        this.scrollTo(0);
                    }}>
                        <ScrollToTopIcon color="white"/>
                    </div>
                }
            </Paper>
        );
    }

    onScroll(e) {
        if (e.target.classList && e.target.classList.contains("common-comment-list")) {
            this.state.scrollTarget = e.target;
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            this.state.scrollTop = e.target.scrollTop;
            if (!this.state.loading && betweenBottom < 50) {
                this.loadMoreAction();
            }
            if (e.target.scrollTop > Const.NEED_SCROLL_TOP_HEIGHT) {
                this.setState({
                    needScrollToTop: true
                });
            } else {
                this.setState({
                    needScrollToTop: false
                });
            }
        }
    }

    scrollTo(to) {
        const {scrollTarget} = this.state || {scrollTo: f => f};
        scrollTarget.scrollTop = to;
        setTimeout(() => {
            scrollTarget.scrollTop = to;
        }, 100);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const {pageSize, id} = this.state;
        if (this.state.type === COMMENT_TYPE_COMMENT) {
            const param = Object.assign({currentPage: currentPage, pageSize: pageSize, shareId: this.props.shareId});
            this.props.getCommentsAction(param, reqHeader(param), null, (msg, err) => {});
        } else if (this.state.type === COMMENT_TYPE_COMMENT_REPLY) {
            const param = Object.assign({currentPage: currentPage, pageSize: pageSize, commentUuid: this.props.shareId});
            this.props.getCommentReplysAction(param, reqHeader(param), null, (msg, err) => {});
        }
        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter() {
        if (this.state.type === COMMENT_TYPE_COMMENT) {
            const {uid, shareId, getShareAudioAction} = this.props;
            const params = {};
            params.uid = uid;
            params.shareId = shareId;
            this.setState({loading: true});
            getShareAudioAction(params, reqHeader(params), res => {
                const {musicUrl, nameNorm, shareId, pagePictureUrl} = res;
                this.setState({loading: false});
                if (this.state.currentPage === 0) this.loadMoreAction();
                setTimeout(() => this.setState({showComment: true}), 200);
                window.wx && window.wx.ready(() => {
                    wxShare({
                        title: intl.get("audio.share.title", {name: nameNorm}),
                        desc: intl.get("audio.share.from"),
                        link: `${location.protocol}//${location.host}/recordingPlay/${params.uid}/${shareId}?language=${getQueryString('language')}`,
                        imgUrl: typeof pagePictureUrl !== 'undefined' ? pagePictureUrl : 'http://wechat.j-make.cn/img/logo.png',
                        dataUrl: musicUrl
                    });
                });
            }, err => this.setState({loading: false}));
        } else {
            if (this.state.currentPage === 0) this.loadMoreAction();
            setTimeout(() => this.setState({showComment: true}), 200);
        }
    }

    refreshPage() {
        this.setState({
            pageData: [],
            loading: false,
            lastPage: false,
            currentPage: 0
        });
        this.loadMoreAction();
    }

    submitComment(v, success, fail) {
        this.checkUserInfo();
        if (this.state.loading['comment']) return;
        const params = {
            type: this.state.type === COMMENT_TYPE_COMMENT_REPLY ? 2 : 1,
            uuid: this.state.shareId,
            content: v
        };
        this.setState({loading: true});
        this.props.saveCommentsAction(params, reqHeader(params), res => {
            this.setState({
                loading: false,
                commentContent: ""
            });
            this.props.globAlertAction(intl.get("feedback.submit.success"));
            this.refreshPage();
            if (this.state.type === COMMENT_TYPE_COMMENT_REPLY) {
                this.props.handelReplySuccess();
            }
            success();
        }, err => {
            fail();
            this.state.loading = false;
        });
    }

    getLoading() {
        return <svg className="rotate" viewBox="0 0 40 40" style={style.loadingRotate}>
            <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={style.loadingRotate.loadingCircle}/>
        </svg>;
    }

    checkUserInfo() {
        if (!this.props.userInfo.userInfoData) {
            this.props.actionGetUserInfo({}, reqHeader({}, getEncryptHeader({})));
        }
    }

}

CommentList.defaultProps = {
    selectComment: {},
    type: 1,
    shareId: 0,
    uid: 0,
    handelSelect: f => f,
    handelClose: f => f,
    handelReplySuccess: f => f,
};

CommentList.propTypes = {
    selectComment: PropTypes.any,
    type: PropTypes.number,
    shareId: PropTypes.any,
    uid: PropTypes.any,
    handelSelect: PropTypes.func,
    handelClose: PropTypes.func,
    handelReplySuccess: PropTypes.func
};

const mapStateToProps = (state, ownPorps) => {
    return {
        userInfo: state.app.user.userInfo,
        audio: state.app.audio,
        comment: state.app.comment
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getShareAudioAction: bindActionCreators(getShareAudio, dispatch),
        actionGetUserInfo: bindActionCreators(getUserInfo, dispatch),
        deleteCommentOrReplyAction: bindActionCreators(deleteCommentOrReply, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getCommentsAction: bindActionCreators(getComments, dispatch),
        getCommentReplysAction: bindActionCreators(getCommentReplys, dispatch),
        saveCommentsAction: bindActionCreators(saveComments, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList));
