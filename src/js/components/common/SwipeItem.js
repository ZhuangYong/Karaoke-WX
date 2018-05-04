/**
 * Created by walljack@163.com on 2017/9/7.
 */
import React from "react";
import ReactGesture from 'react-gesture';
import PropTypes from "prop-types";
import blankImg from "../../../img/common/blank.png";
import {deleteCommentOrReply} from "../../actions/commentActons";
import {reqHeader} from "../../utils/comUtils";

const RIGHT_MOVE_DIST = 75;
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
export default class SwipeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moveDownX: 0,
            moveX: 0,
            currentX: 0,
            preCurrentX: 0,
            forceX: 0,
            moveIng: false,
            loading: false
        };
        this.getMoveDist = this.getMoveDist.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.touchCancel = this.touchCancel.bind(this);
        this.getItem = this.getItem.bind(this);
        this.handelDel = this.handelDel.bind(this);
        this.reSet = this.reSet.bind(this);
    }

    componentDidMount() {
        window.addEventListener('swipeItemTouch', e => {
            if (e.swipeItem !== this) this.reSet();
        });
    }
    render() {
        if (this.props.canDel) return <ReactGesture onTouchStart={this.touchStart} onTouchMove={this.touchMove}
                                                    onTouchEnd={this.touchEnd} onTouchCancel={this.touchCancel}>
            {
                this.getItem()
            }
        </ReactGesture>;
        return this.getItem();

    }

    getItem() {
        let moveDist = !this.state.moveIng ? this.state.forceX : this.getMoveDist();
        return <div className="list-item">
            <span className="list-item-outer-pan">
                <div className="list-item-swipe-pan" style={{marginLeft: moveDist + "px"}} onClick={() => {
                    this.props.handelSelect(this.props.data);
                }}>
                    <div className="list-item-inner-pan">
                        <img src={this.props.data.headerImg || blankImg} className="avatar"/>
                        <div className="nickname">{this.props.data.nickName}</div>
                        <span>
                            <p className="content">
                                {this.props.data.content}
                            </p>
                            <p className="footer">
                            {this.props.data.createTime} {this.props.data.sensitiveFilter}
                            </p>
                        </span>
                    </div>
                 </div>
                {
                    this.props.canDel ? <div className="operator-pan">
                        <p className="del-button" onClick={this.handelDel}>
                            {this.state.loading ? this.getLoading() : "删除"}
                        </p>
                    </div> : ""
                }

                <p className="content-space">
                    {this.props.data.content}
                </p>
            </span>
        </div>;
    }

    getMoveDist() {
        let moveDist = this.state.moveX - this.state.moveDownX + this.state.preCurrentX;
        moveDist = moveDist > RIGHT_MOVE_DIST ? RIGHT_MOVE_DIST : moveDist;
        moveDist = moveDist < -RIGHT_MOVE_DIST ? -RIGHT_MOVE_DIST : moveDist;
        return moveDist;
    }

    touchStart(e) {
        this.setState({
            moveIng: true,
            moveDownX: e.touches[0].pageX,
            moveX: e.touches[0].pageX,
            preCurrentX: this.getMoveDist(e)
        });
        let ev = new Event('swipeItemTouch');
        ev.swipeItem = this;
        window.dispatchEvent(ev);
    }
    touchMove(e) {
        if (!this.state.moveIng) return;
        this.setState({
            moveIng: true,
            moveX: e.touches[0].pageX
        });
    }
    touchEnd(e) {
        let forceX = 0;
        if (this.getMoveDist() > -60) {
            forceX = 0;
        } else {
            forceX = -RIGHT_MOVE_DIST;
        }
        this.setState({
            moveDownX: e.changedTouches[0].pageX,
            moveX: e.changedTouches[0].pageX,
            preCurrentX: forceX,
            forceX: forceX,
            moveIng: false
        });
    }

    reSet() {
        this.setState({
            moveDownX: 0,
            moveX: 0,
            preCurrentX: 0,
            forceX: 0,
            moveIng: false
        });
    }

    touchCancel(e) {
        this.setState({
            moveX: e.touches[0].pageX,
            moveIng: false
        });
    }

    handelDel() {
        const params = {
            type: this.props.type,
            uuid: this.props.data.uuid
        };
        this.setState({loading: true});
        this.props.handelDelete(params, reqHeader(params), res => {
            this.setState({loading: false});
            this.props.handelDeleteSuccess();
        }, err => this.setState({loading: false}));
    }

    getLoading() {
        return <svg className="rotate" viewBox="0 0 40 40" style={styles.loadingRotate}>
            <circle cx="20" cy="20" r="18.25" fill="none" strokeWidth="3.5" strokeMiterlimit="20" style={styles.loadingRotate.loadingCircle}/>
        </svg>;
    }
}

SwipeItem.propTypes = {
    type: PropTypes.number,
    handelDelete: PropTypes.func,
    handelDeleteSuccess: PropTypes.func,
    data: PropTypes.object,
    canDel: PropTypes.bool,
    handelSelect: PropTypes.func,
};

SwipeItem.defaultProps = {
    type: 1,
    handelDelete: f => f,
    handelDeleteSuccess: f => f,
    data: {},
    canDel: true,
    handelSelect: f => f,
};
