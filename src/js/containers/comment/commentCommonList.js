import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import {Paper} from "material-ui";
import {bindActionCreators} from "redux";
import {reqHeader} from "../../utils/comUtils";
import Const from "../../utils/const";
import ScrollToTopIcon from "material-ui/svg-icons/editor/vertical-align-top";
import {setGlobAlert} from "../../actions/common/actions";
import NoResult from "../../components/common/NoResult";
import NoWifi from "../../components/common/NoWifi";
import intl from 'react-intl-universal';
import SwipeItem from "../../components/common/SwipeItem";
import {getComments, saveComments} from "../../actions/commentActons";

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
        const {shareId, title} = this.props.match.params || {};
        super.title(title);
        this.state = {
            type: COMMENT_TYPE_COMMENT,
            pageSize: 20,
            pageData: [],
            loading: false,
            currentPage: 0,
            lastPage: false,
            shareId: shareId,
            cacheData: {},
            dataLoaded: false,
        };
        this.onScroll = this.onScroll.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.comment.commentListStamp !== this.props.comment.commentListStamp) {
            const data = this.props.comment.commentList;
            const {result, lastPage} = data;
            const pageData = [...this.state.pageData, ...(result || [])];
            const cacheData = {
                id: this.state.id,
                pageData: pageData,
                lastPage: lastPage,
                currentPage: this.state.currentPage,
            };
            this.setState({
                pageData: pageData,
                lastPage: lastPage,
                loading: false,
                cacheData: cacheData,
                dataLoaded: true,
                offLine: false
            });
        }
    }

    componentDidMount() {
        if (this.state.currentPage === 0) this.loadMoreAction();
    }

    render() {
        const {lastPage, loading, offLine, currentPage, pageData, dataLoaded} = this.state;
        const showNoWifi = (offLine && currentPage !== 0 && pageData.length === 0);
        let scrollTopStyle = {};
        if (!this.state.needScrollToTop) {
            scrollTopStyle = {
                opacity: 0
            };
        }
        return (

            <Paper zDepth={0}>
                <div
                    ref="commSingerList"
                    className='common-singer-list'
                    onScroll={this.onScroll.bind(this)}>

                    {
                        showNoWifi ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                    }

                    {
                        (dataLoaded && currentPage >= 1 && pageData.length === 0) ? <NoResult style={{position: 'absolute', top: '-1rem'}}/> : <div>
                            <div className="single-list" style={{padding: '2.4rem 0px 8px'}}>
                                <div>
                                    {
                                        this.props.comment && this.props.comment.commentList && this.props.comment.commentList.result.map(c => <SwipeItem key={c.uuid} data={c}/>)
                                    }
                                </div>
                            </div>
                            <div className="loading-bottom">
                                <div>
                                    <svg className="rotate" viewBox="0 0 40 40" style={{opacity: loading ? 1 : 0, ...style.loadingRotate}}>
                                        <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={style.loadingRotate.loadingCircle}/>
                                    </svg>
                                    <span>
                                        {
                                            loading ? intl.get("song.loading") : ""
                                        }
                                        {
                                            (!offLine && lastPage) ? intl.get("song.list.end") : ""
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

                {
                    <div className="scroll-to-top-button" style={scrollTopStyle} onTouchTap={() => {
                        this.scrollTo(0);
                    }}>
                        <ScrollToTopIcon color="white"/>
                    </div>
                }
            </Paper>
        );
    }

    onScroll(e) {
        if (e.target.classList && e.target.classList.contains("common-singer-list")) {
            this.state.scrollTarget = e.target;
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            this.state.scrollTop = e.target.scrollTop;
            if (this.state.loading && betweenBottom < 50) {
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
        const param = Object.assign({currentPage: currentPage, pageSize: pageSize}, this.props.match.params);
        this.props.getCommentsAction(param, reqHeader(param), null, (msg, err) => {});
        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    refreshPage() {
        this.setState({
            pageData: []
        });
        this.state.currentPage = 0;
        this.state.loading = false;
        this.state.lastPage = false;
        this.loadMoreAction();
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        comment: state.app.comment
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getCommentsAction: bindActionCreators(getComments, dispatch),
        saveCommentsAction: bindActionCreators(saveComments, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList));
