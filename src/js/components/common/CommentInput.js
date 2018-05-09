/**
 * Created by walljack@163.com on 2017/9/7.
 */
import React from "react";
import {RaisedButton, Subheader, TextField} from "material-ui";
import PropTypes from "prop-types";

const styles = {
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
export default class CommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            canFocus: false,
            commentFocus: false,
            commentShow: false,
            firstInput: false,
            value: this.props.value,
            temp: ""
        };
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelShowComment = this.handelShowComment.bind(this);
        this.handelCloseComment = this.handelCloseComment.bind(this);
    }

    render() {
        const {isAndroid} = window.sysInfo;
        if (isAndroid) {
            return this.bottomInput({max: 6});
        } else return <div>
            {
                this.state.commentFocus ? <section className="more-comment-top">
                    <Subheader className="comment-container">
                        <TextField
                            floatingLabelText=""
                            multiLine={true}
                            rows={this.state.commentShow ? 8 : 22}
                            rowsMax={8}
                            ref="input"
                            className="comment-input"
                            hintText={
                                <div>
                                    <font color="#bbbbbb">{this.props.placeholder}</font>
                                </div>
                            }
                            hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                            value={this.state.value}
                            onChange={this.handelChange}
                            // style={{position: 'absolute', bottom: 0}}
                            // style={!this.state.commentShow ? {position: 'absolute', bottom: 0} : {}}
                        />
                        {
                            this.state.commentShow ? <div>
                                <RaisedButton className="comment-submit-button" labelColor="white" backgroundColor="#ff6832" label={this.state.loading ? this.getLoading() : "提交"} disabled={this.state.loading || !this.state.value} onClick={this.handelSubmit}/>
                                <RaisedButton className="comment-submit-button" backgroundColor="#d8d8d8" label="取消" onClick={this.handelCloseComment}/>
                            </div> : ""
                        }
                    </Subheader>
                </section> : ""
            }
            {
                !this.state.commentFocus ? this.bottomInput({max: 1}) : ""
            }
        </div>;
    }

    bottomInput() {
        return <section className={`more-comment-bottom ${this.state.commentFocus && this.state.commentShow ? "focus" : "not-focus"}`}>
            <Subheader className="comment-container">
                <TextField
                    onTouchTap={this.handelShowComment}
                    onFocus={() => this.state.commentFocus && this.handelShowComment()}
                    onBlur={this.handelCloseComment}
                    floatingLabelText=""
                    multiLine={true}
                    rows={this.state.commentFocus && this.state.commentShow ? 4 : 1}
                    rowsMax={4}
                    className={`comment-input ${this.state.commentFocus && this.state.commentShow ? "" : "not-focus"}`}
                    hintText={
                        <div>
                            <font color="#bbbbbb">{this.props.placeholder}</font>
                        </div>
                    }
                    hintStyle={{color: "white", textAlign: "center", width: "100%"}}
                    value={this.state.value}
                    onChange={this.handelChange}
                />
                <RaisedButton className="comment-submit-button" backgroundColor="#ff6832" labelColor="white" label={this.state.loading ? this.getLoading() : "提交"} disabled={this.state.loading || !this.state.value} onTouchTap={this.handelSubmit}/>
                <RaisedButton className="comment-submit-button cancel-button" backgroundColor="#d8d8d8" label="取消" onClick={this.handelCloseComment}/>
            </Subheader>
        </section>;
    }

    getLoading() {
        return <svg className="rotate" viewBox="0 0 40 40" style={styles.loadingRotate}>
            <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={styles.loadingRotate.loadingCircle}/>
        </svg>;
    }

    handelShowComment() {
        this.setState({commentFocus: true});
        setTimeout(() => {
            this.setState({commentShow: true, firstInput: true});
        }, 100);
    }

    handelCloseComment() {
        setTimeout(() => {
            this.setState({commentFocus: false, firstInput: false});
        }, 100);
        this.setState({
            commentShow: false
        });
    }

    handelSubmit() {
        this.setState({loading: true});
        this.props.submitComment(this.state.value, () => {
            this.setState({value: "", loading: false});
            this.handelCloseComment();
        }, () => {
            this.setState({loading: false});
        });
    }

    handelChange(v, a) {
        this.props.onChange(a);
        this.setState({value: a.substr(0, this.props.max), temp: a + ":" + this.state.temp});
    }
}

CommentInput.defaultProps = {
    max: 200,
    value: "",
    onChange: f => f,
    submitComment: f => f,
    placeholder: "评论录音",
};

CommentInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    max: PropTypes.number,
    submitComment: PropTypes.func,
    placeholder: PropTypes.string,
};
