import React from "react";
import CommentCommonList from "../../components/common/commentCommonList";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class CommentList extends BaseComponent {
    constructor(props) {
        super(props);
        const {uid, shareId, title} = this.props.match.params || {};
        super.title(title || "");
        this.state = {
            selectComment: null,
            shareId: parseInt(shareId, 10),
            uid: uid
        };
        this.handelSelectComment = this.handelSelectComment.bind(this);
        this.handelReplyClose = this.handelReplyClose.bind(this);
    }

    componentDidMount() {
        this.props.history.listen(() => {
            if (location.hash.indexOf("reply") < 0) {
                this.handelReplyClose();
            }
        });
    }

    render() {
        return <div>
            <CommentCommonList uid={this.state.uid} shareId={this.state.shareId} type={1} handelSelect={this.handelSelectComment}/>
            {
                this.state.selectComment ? <div className="comment-reply-container" style={{width: '100%', height: '100%', position: 'fixed', top: 0, overflowY: 'auto', backgroundColor: 'white', zIndex: 9999}}>
                    <CommentCommonList uid={this.state.uid} shareId={this.state.selectComment.uuid} selectComment={this.state.selectComment} type={2} handelClose={this.handelReplyClose} handelReplySuccess={() => this.this.state.selectComment.replyNum += 1}/>
                </div> : ""
            }
        </div>;
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
}

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList));
