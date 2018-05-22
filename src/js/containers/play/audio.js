import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../../sass/audio/playAudio.scss";
import {getShareAudio} from "../../actions/audioActons";
import Audio from "../../components/audio";
import {
    getEncryptHeader, getQueryString, linkTo, parseTime, reqHeader, toRem, wxAuthorizedUrl,
    wxShare
} from '../../utils/comUtils';
import sysConfig from "../../utils/sysConfig";

import SwipeAbleViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import PropTypes from "prop-types";
import {FlatButton, RaisedButton, Subheader, TextField} from "material-ui";
import BaseComponent from "../../components/common/BaseComponent";
import SlidePng1 from "../../../img/album/1.png";
import SlideK1Png1 from "../../../img/album/k1/1.png";
import SlideK1Png2 from "../../../img/album/k1/2.png";
import _ from "lodash";
import intl from 'react-intl-universal';
import Avatar from 'material-ui/Avatar';
import defaultAvatar from "../../../img/default_avatar.png";
import {setGlobAlert} from '../../actions/common/actions';
import {
    deleteCommentOrReply, getCommentLikeCount, getComments, saveComments,
    setCommentLikeOrCancel
} from '../../actions/commentActons';
import Const from "../../utils/const";
import {List} from 'material-ui/List';
import SwipeItem from "../../components/common/SwipeItem";
import CommentCommonList from "../../components/common/commentCommonList";
import {getUserInfo} from "../../actions/userActions";
import CommentInput from "../../components/common/CommentInput";

const AutoPlaySwipeAbleViews = autoPlay(SwipeAbleViews);

const styles = {
    left: {
      paddingRight: 16,
      textAlign: "left",
      fontSize: '.4rem',
      lineHeight: '.6rem'
    },
    center: {
        paddingRight: 16,
        textAlign: "center",
        fontSize: '.4rem',
        lineHeight: '.6rem'
    },
    btn: {
        width: toRem(540),
        height: toRem(100),
        borderRadius: toRem(100)
    },
    btnLabelStyle: {
        lineHeight: toRem(100),
        fontSize: toRem(32)
    },
    loadingRotate: {
        width: '.42rem',
        height: '.42rem',
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

const defaultCover = 'http://wechat.j-make.cn/img/logo.png';
const SHOW_COMMENT_OFFSET = 10;
class PlayAudio extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.audio.share"));
        this.state = {
            audio: {},
            params: this.props.match.params,
            percent: 0,
            currentTime: 0,
            wxTimer: -1,
            musicUrl: "",
            imgUrl: "",
            customerSliders: [], // 客户需求轮播图
            customerAd: intl.get("msg.from.j.make"), // 客户需求广告语
            autoPlayEd: false,
            showComment: false,
            scrollTop: 0,
            commentContent: "",
            shareId: "",
            commentCount: 0,
            loading: {},
            userLike: 0,
            selectComment: null,
            canFocus: false,
            commentFocus: false
        };

        this.loadAudioGetter = this.loadAudioGetter.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.getComment = this.getComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.getCommentCount = this.getCommentCount.bind(this);
        this.setCommentLike = this.setCommentLike.bind(this);
        this.handelSelectComment = this.handelSelectComment.bind(this);
        this.handelReplyClose = this.handelReplyClose.bind(this);
        this.checkUserInfo = this.checkUserInfo.bind(this);
    }

    componentDidMount() {
        this.props.history.listen(() => {
            if (location.hash.indexOf("reply") < 0) {
                this.handelReplyClose();
            }
        });
        this.loadAudioGetter();
        setTimeout(() => this.setState({showComment: true}), 200);
    }

    componentDidUpdate() {
        const {autoPlayEd, params} = this.state;
        const {audioInfo: data} = this.props.audio;
        if (data && !autoPlayEd) {
            const {isWeixin} = window.sysInfo;
            if (isWeixin) {
                window.wx && window.wx.ready(() => {
                    this.refs.audio.refs.audio.refs.audio.play();
                    this.state.autoPlayEd = true;
                });
            } else {
                this.refs.audio.refs.audio.refs.audio.play();
                this.setState({
                    autoPlayEd: true
                });
            }

            // k1特性
            const {channel} = data;
            if (Const.CHANNEL_CODE_K1_LIST.indexOf(channel) >= 0) {
                const sliderImgs = [SlideK1Png1, SlideK1Png2];
                if (!_.isEqual(sliderImgs, this.state.customerSliders)) {
                    this.setState({
                        customerAd: intl.get("audio.share.from.k1"),
                        customerSliders: sliderImgs
                    });
                }
            }
        }
    }

    componentWillUnmount() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            window.wx && window.wx.ready(() => {

                wxShare({
                    title: intl.get("audio.we.chat.song"),
                    desc: intl.get("audio.share.from"),
                    link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, location.protocol + "//" + location.host),
                    imgUrl: defaultCover,
                    dataUrl: null
                });
            });
        }

        window.sessionStorage.removeItem('isRecordingEdit');
    }

    render() {
        if (this.refs.audio) window.audio = this.refs.audio.refs.audio.refs.audio;
        const {w, h} = this.props.common;
        const data = this.props.audio.audioInfo;
        const {musicUrl, musicTime, nameNorm, headerImg, nickName, albums, pagePictureId, pagePictureUrl, shareId, channel, uuid} = data || {};
        // const isK1 = Const.CHANNEL_CODE_K1_LIST.indexOf(channel) >= 0;
        let swipePanelStyle = {};
        let topPanelStyle = {};
        if (w > h) {
            swipePanelStyle.height = "5.867rem";
            swipePanelStyle.width = "5.867rem";
            // swipePanelStyle.overflow = "hidden";
            topPanelStyle.marginTop = ".4rem";
        }

        super.title((nameNorm || intl.get("title.audio.share")) + "-" + intl.get("audio.bring.karaoke.home"));

        const ableEdit = window.sessionStorage.getItem('isRecordingEdit') === 'true';
        // const ableEdit = params.edit === false;

        const banners = (albums && albums.length > 0) ? albums : (pagePictureId ? [{picid: pagePictureId, picurl: pagePictureUrl}] : [{picid: 123456789, picurl: SlidePng1}]);

        const { customerSliders, customerAd } = this.state;

        const audioUUID = (this.props.audio.audioInfo || {}).uuid;
        let commentList = null;
        let myUUID = null;
        if (this.props.comment && this.props.comment.commentList && this.props.comment.commentList.result) {
            commentList = this.props.comment.commentList.result;
            myUUID = this.props.comment.commentList.unionId;
        }
        return (
            <div className="audio-play">
                <div className="top-panel" style={topPanelStyle}>
                    <AutoPlaySwipeAbleViews disabled className="swipe-panel" style={{overflow: 'hidden', ...swipePanelStyle}}>
                        {
                            customerSliders.map((imgUrl, index) => {
                                return imgUrl.indexOf("/mall/") >= 0 ? <div key={index + 'slider'} className="img-div" onTouchTap={f => location.href = sysConfig.mallIndex}>
                                    <img src={imgUrl}/>
                                </div> : <div key={index} className="img-div">
                                    <img src={imgUrl}/>
                                </div>;
                            })
                        }
                        {banners.map(item => <div key={item.picid} className="img-div"><img src={item.picurl}/></div>)}
                    </AutoPlaySwipeAbleViews>
                    <Audio ref="audio" source={musicUrl} className="audio-item"/>
                </div>
                <div className="song-label">
                   {/* <font style={{fontSize: '.4rem'}}>{nameNorm || "..."}</font>*/}
                    <Subheader className="song-title">
                        <p>
                            {nameNorm}
                        </p>
                        {
                            !this.state.shareId || this.state.loading["likeCount"] || this.state.loading["like"] ? <div style={{float: 'right'}}>{this.getLoading()}</div> : <span className={`do-like-icon ${this.state.userLike ? "like" : ""}`} onClick={this.setCommentLike}>
                                    <p>
                                        {
                                            this.state.commentCount
                                        }
                                    </p>
                            </span>
                        }
                    </Subheader>
                    <header style={{
                        position: "relative",
                        left: ".4rem",
                        height: toRem(100)
                    }}>

                        <Avatar style={{
                            float: "left",
                            width: toRem(85),
                            height: toRem(85),
                            backgroundColor: "rgba(255, 255, 255)",
                            background: `url(${defaultAvatar}) no-repeat center`,
                            backgroundSize: "cover"
                        }} src={headerImg} alt=""/>

                        <div style={{
                            float: "left",
                            marginLeft: toRem(23)
                        }}>
                            <div style={{
                                textAlign: "left",
                                height: toRem(50),
                                lineHeight: toRem(50),
                                fontSize: toRem(30)
                            }}>{nickName || intl.get("device.anonymous")}</div>
                            <p style={{fontSize: '.32rem', height: '.4rem', margin: 0, color: "#9a9a9b"}}>{musicTime ? parseTime(parseInt(musicTime, 10)) : "..."}</p>
                        </div>
                    </header>


                   {/* <Subheader style={{...styles.left, bottom: '.8rem'}}>
                        <p style={{margin: 0}}>{intl.get("audio.nice.song.to.share", {name: nameNorm || "..."})}</p>
                    </Subheader>*/}
                    <Subheader style={{...styles.left, bottom: '.8rem'}}>
                        <p style={{margin: 0, color: "#ff6832", fontSize: ".32rem"}}>{customerAd}</p>
                    </Subheader>
                </div>

                <section style={{borderTop: `${toRem(20)} solid #f3f3f7`}}>
                    <Subheader className="comment-top">
                        <p>
                            {intl.get("comments.comment")}
                        </p>
                       {/* <span className="comment-pen-icon"/>*/}
                    </Subheader>
                    {
                        (!this.state.loading['comment'] && commentList && commentList.length === 0) ? <p style={{textAlign: 'center', color: 'gray'}}>{intl.get("comments.no.comment")}</p> : ""
                    }
                    <List className="comment-list">
                        {
                            this.state.loading['audio'] || this.state.loading['comment'] ? <p style={{textAlign: 'center', color: 'gray'}}>{this.getLoading()}</p> : ""
                        }
                        {
                            commentList && commentList.map(c => <SwipeItem key={c.uuid} data={c} canDel={myUUID === audioUUID || myUUID === c.unionid} handelSelect={this.handelSelectComment} handelDelete={this.props.deleteCommentOrReplyAction} handelDeleteSuccess={() => {
                                this.props.globAlertAction(intl.get("msg.delete.success"));
                                this.getComment();
                            }}/>)
                        }
                        {
                            this.state.shareId && commentList && commentList.length >= 10 ? <span onClick={() => linkTo(`comment/list/${this.state.params.uid}/${this.state.shareId}`, false, null)} style={{textAlign: 'center', width: '100%', display: 'block', padding: '1em', color: 'gray'}}>
                                    {intl.get("comments.more.comments")}
                            </span> : ""
                        }
                        {
                            this.state.shareId && commentList && commentList.length && commentList.length < 10 ? <p style={{textAlign: 'center', color: 'gray', fontSize: '.34rem'}}>{intl.get("song.list.end")}</p> : ""
                        }
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </List>
                </section>

                {/*{
                    this.state.showComment ? <section className={`more-comment-bottom ${this.state.canFocus && this.state.commentFocus ? "focus" : ""}`}>
                        <Subheader style={styles.center} className="comment-container">
                            <TextField
                                onClick={() => this.setState({canFocus: true})}
                                onFocus={() => this.setState({commentFocus: true})}
                                onBlur={() => this.setState({commentFocus: false})}
                                floatingLabelText=""
                                multiLine={true}
                                rows={8}
                                rowsMax={8}
                                ref="input"
                                className="comment-input"
                                hintText={
                                    <div>
                                        <font color="gray">评论录音{this.state.canFocus + ":" + this.state.commentFocus}</font>
                                    </div>
                                }
                                hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                                value={this.state.commentContent}
                                onChange={(v, a) => {
                                    if (a) this.checkUserInfo();
                                    this.setState({commentContent: a.substr(0, 200)});
                                }}
                            />
                            <RaisedButton className="comment-submit-button" primary={true} label={this.state.loading["comment"] ? this.getLoading() : "提交"} disabled={this.state.loading["comment"] || !this.state.commentContent} onClick={this.submitComment}/>
                        </Subheader>
                    </section> : ""
                }*/}

                {
                    this.state.showComment ? <CommentInput submitComment={this.submitComment}/> : ""
                }

                {
                    this.state.selectComment ? <div className="comment-reply-container" style={{width: '100%', height: '100%', position: 'fixed', top: 0, overflowY: 'auto', backgroundColor: 'white', zIndex: 9999}}>
                        <CommentCommonList shareId={this.state.selectComment.uuid} selectComment={this.state.selectComment} type={2} handelClose={this.handelReplyClose} handelReplySuccess={() => this.state.selectComment.replyNum += 1}/>
                    </div> : ""
                }

                {/*{pagePictureUrl && <img src={pagePictureUrl} style={{display: "none"}} onError={() => {
                    this.setState({
                        imgUrl: 'http://wechat.j-make.cn/img/album/1.png',
                    });
                }}/>}*/}

            </div>
        );
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter() {
        const { globAlertAction, getShareAudioAction } = this.props;
        const {uid, shareId} = this.state.params;
        let params = {};

        if (typeof uid === 'undefined') {
            globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
            return;
        }

        params.uid = uid;

        const {audioInfo} = this.props.audio;

        if (shareId) {
            params.shareId = shareId;
        } else if (audioInfo && audioInfo.shareId) {
            params.shareId = audioInfo.shareId;
        }

        this.state.loading['audio'] = true;
        getShareAudioAction(params, reqHeader(params), res => {
            const {musicUrl, nameNorm, shareId, pagePictureUrl} = res;
            this.state.shareId = shareId;
            this.getComment();
            this.getCommentCount();
            const {isWeixin} = window.sysInfo;
            if (!isWeixin) this.state.loading['audio'] = false;
            window.wx && window.wx.ready(() => {
                this.state.loading['audio'] = false;
                wxShare({
                    title: intl.get("audio.share.title", {name: nameNorm}),
                    desc: intl.get("audio.share.from"),
                    link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, `${location.protocol}//${location.host}/recordingPlay/${params.uid}/${shareId}?language=${getQueryString('language')}`),
                    imgUrl: typeof pagePictureUrl !== 'undefined' ? pagePictureUrl : defaultCover,
                    dataUrl: musicUrl
                });
            });
        }, err => this.state.loading['audio'] = false);
    }

    /**
     * 跳转编辑页面
     * @param uid 录音的uid
     * @param shareId 录音的shareId
     */
    toEdit(shareId) {
        // navUtils.replace(`${this.state.params.uid}/${shareId}?language=${getQueryString('language')}`);
        linkTo(`editRecord/${shareId}`, false, null);
    }

    handlePercentChange(_percent) {
        const audio = this.state.audio;
        audio.currentTime = _percent / 100 * audio.duration;
        this.setState({
            percent: _percent / 100,
            currentTime: audio.currentTime
        });
    }

    onScroll(e) {
        if (e.target.classList && e.target.classList.contains("audio-play")) {
            this.state.scrollTarget = e.target;
            if (e.target.scrollTop > SHOW_COMMENT_OFFSET) {
                this.setState({
                    scrollTop: e.target.scrollTop,
                });
            } else {
                this.setState({
                    scrollTop: e.target.scrollTop,
                });
            }

        }
    }

    getComment() {
        const params = {
            pageSize: 10,
            currentPage: 1,
            shareId: this.state.shareId
        };
        this.props.getCommentsAction(params, reqHeader(params), res => {

        });
    }

    submitComment(v, success, fail) {
        if (this.state.loading['comment']) return;
        const params = {
            type: 1,
            uuid: this.state.shareId,
            content: v
        };
        this.state.loading['comment'] = true;
        this.setState({loading: this.state.loading});
        this.props.saveCommentsAction(params, reqHeader(params), res => {
            this.state.loading['comment'] = false;
            this.setState({
                loading: this.state.loading
            });
            this.props.globAlertAction(intl.get("feedback.submit.success"));
            this.getComment();
            success();
        }, err => {
            this.state.loading['comment'] = false;
            fail();
        });
    }

    getCommentCount() {
        const params = {
            shareId: this.state.shareId
        };
        this.state.loading['likeCount'] = true;
        this.props.getCommentLikeCountAction(params, reqHeader(params), res => {
            this.state.loading['likeCount'] = false;
            this.setState({
                commentCount: res.likeNum,
                userLike: res.userLike,
                loading: this.state.loading
             });
        }, err => this.state.loading['likeCount'] = false);
    }

    setCommentLike() {
        if (this.state.userLike) {
            return;
        }
        const params = {
            shareId: this.state.shareId,
            type: 1
        };
        this.state.loading['like'] = true;
        this.setState({loading: this.state.loading});
        const unload = res => {
            this.state.loading['like'] = false;
            this.setState({loading: this.state.loading});
        };
        this.props.setCommentLikeOrCancelAction(params, reqHeader(params), () => {
            this.setState({
                commentCount: this.state.commentCount + 1,
                userLike: 1
            });
            unload();
        }, unload);
    }

    getLoading() {
        return <svg className="rotate" viewBox="0 0 40 40" style={styles.loadingRotate}>
            <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={styles.loadingRotate.loadingCircle}/>
        </svg>;
    }

    handelSelectComment(data) {
        if (location.hash.indexOf("reply") < 0) {
            location.hash = "reply";
        }
        this.setState({
            selectComment: data
        });
    }
    handelReplyClose() {
        this.setState({
            selectComment: null
        });
        if (location.hash.indexOf("reply") > 0) {
            history.back();
        }
    }

    checkUserInfo() {
        if (!this.props.userInfo.userInfoData) {
            this.props.actionGetUserInfo({}, reqHeader({}, getEncryptHeader({})));
        }
    }
}

const mapStateToProps = (state, ownPorps) => {
    return {
        userInfo: state.app.user.userInfo,
        audio: state.app.audio,
        common: state.app.common,
        comment: state.app.comment
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionGetUserInfo: bindActionCreators(getUserInfo, dispatch),
        getCommentLikeCountAction: bindActionCreators(getCommentLikeCount, dispatch),
        deleteCommentOrReplyAction: bindActionCreators(deleteCommentOrReply, dispatch),
        setCommentLikeOrCancelAction: bindActionCreators(setCommentLikeOrCancel, dispatch),
        getShareAudioAction: bindActionCreators(getShareAudio, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getCommentsAction: bindActionCreators(getComments, dispatch),
        saveCommentsAction: bindActionCreators(saveComments, dispatch),
    };
};

PlayAudio.defaultProps = {
    audio: {
        audioInfo: {}
    }
};

PlayAudio.propTypes = {
    audio: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayAudio));
