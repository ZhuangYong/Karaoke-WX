import React from "react";
import CommentCommonList from "../../components/common/commentCommonList";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class CommentList extends BaseComponent {
    constructor(props) {
        super(props);
        const {shareId, title} = this.props.match.params || {};
        super.title(title || "");
        this.state = {
            selectComment: null,
            shareId: parseInt(shareId, 10)
        };
        this.handelSelectComment = this.handelSelectComment.bind(this);
        this.handelReplyClose = this.handelReplyClose.bind(this);
    }

    render() {
        return <div>
            <CommentCommonList shareId={this.state.shareId} type={1} handelSelect={this.handelSelectComment}/>
            {
                this.state.selectComment ? <div className="comment-reply-container" style={{width: '100%', height: '100%', position: 'fixed', top: 0, overflowY: 'auto', backgroundColor: 'white', zIndex: 9999}}>
                    <CommentCommonList shareId={this.state.selectComment.uuid} selectComment={this.state.selectComment} type={2} handelClose={this.handelReplyClose}/>
                </div> : ""
            }
        </div>;
    }

    handelSelectComment(data) {
        this.setState({
            selectComment: data
        });
    }
    handelReplyClose() {
        this.setState({
            selectComment: null
        });
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
