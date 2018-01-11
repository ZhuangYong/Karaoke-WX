/**
 * Created by Zed on 2017/7/31.
 */

import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {deleteRecording, getRecordsList} from '../../../actions/userActions';
import {linkTo, reqHeader, toRem} from "../../../utils/comUtils";

import BaseComponent from "../../../components/common/BaseComponent";
import RefreshIndicator from "material-ui/RefreshIndicator";
import RecordingGrid from "../../../components/recordingGrid/index";
import BottomDrawer from "../../../components/recordingGrid/bottomDrawer";
import FlatButton from 'material-ui/FlatButton';
import Const from "../../../utils/const";
import NoWifi from "../../../components/common/NoWifi";
import NoResult from "../../../components/common/NoResult";
import intl from 'react-intl-universal';

const style = {
    recordings: {
        position: "absolute",
        paddingTop: toRem(20),
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: toRem(100),
        fontSize: toRem(28),
        alignItems: "center",
        clear: "both"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};
class Records extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.my.record"));

        this.state = {
            recordingList: [],
            pageSize: 20,
            currentPage: 0,
            loading: false,
            lastPage: false,
            open: false,
            deleteRecordingUid: null,
            offLine: false,
            dataLoaded: false
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.list.recordsListStamp !== this.props.list.recordsListStamp) {
            const {data} = this.props.list.recordsListData || {data: {result: [], islastpage: false}};
            const {result, islastpage} = data;
            let recordingList = result.filter((item) => {
                item.defaultImg = this.randomDefaultImg();
                return item;
            });
            this.setState({
                recordingList: [...this.state.recordingList, ...(recordingList || [])],
                lastPage: islastpage,
                loading: false,
                dataLoaded: true
            });
        }
    }

    componentDidMount() {
        if (this.state.currentPage === 0) {
            this.loadMoreAction();
        }
    }

    render() {
        const recordingList = this.state.recordingList;

        return (
            <div
                className="recordings"
                style={style.recordings}
                onScroll={this.onScroll.bind(this)}
            >
                {
                    (this.state.offLine && this.state.currentPage !== 0 && this.state.pageData.length === 0) ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                }

                {
                    (this.state.dataLoaded && this.state.currentPage >= 1 && recordingList.length === 0) ? (<NoResult style={{position: 'absolute', top: '-1rem'}}/>) : (<div>
                        <RecordingGrid
                            data={recordingList}
                            operateClick={(uid) => {
                                this.setState({
                                    deleteRecordingUid: uid,
                                    open: true
                                });
                            }}
                        />

                        <div style={style.loading}>
                            {this.state.loading ? (<div><RefreshIndicator
                                size={30}
                                left={70}
                                top={0}
                                loadingColor="#FF9800"
                                status="loading"
                                style={style.loadingBar}
                            />
                                <span>{intl.get("song.loading")}</span>
                            </div>) : ""}

                            <span>{this.state.lastPage ? intl.get("song.list.end") : ""}</span>
                            <span>{(!this.state.loading && this.state.offLine && this.state.currentPage !== 0 && recordingList.length !== 0) ? intl.get("msg.network.die") : ""}</span>
                        </div>

                        <BottomDrawer
                            open={this.state.open}
                            onRequestChange={() => {
                                this.setState({
                                    open: false
                                });
                            }}
                            actions={[
                                <button
                                    style={{
                                        width: "80%",
                                        height: "100%",
                                        color: "#ff6832",
                                        fontSize: toRem(38),
                                        background: "#fff",
                                        border: "none"
                                    }}
                                    onClick={() => {
                                        const _this = this;
                                        const uid = this.state.deleteRecordingUid;
                                        const params = {
                                            uid: uid
                                        };
                                        this.props.deleteRecordingAction(params, reqHeader(params), (res) => {
                                            const {status} = res;
                                            if (status === 1) {
                                                const recordingList = _this.state.recordingList;

                                                _this.setState({
                                                    open: false,
                                                    recordingList: recordingList.filter((item) => {
                                                        if (item.uid !== uid) return item;
                                                    })
                                                });
                                            }
                                        });
                                    }}
                                >{intl.get("button.delete")}</button>
                            ]}
                        />
                    </div>)
                }
            </div>
        );
    }

    onScroll(e) {
        if (!this.state.loading && e.target.classList && e.target.classList.contains("recordings")) {
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            if (betweenBottom < 50) {
                this.loadMoreAction();
            }
        }
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const pageSize = this.state.pageSize;
        let param = {currentPage: currentPage, pageSize: pageSize};
        //个性化推荐
        this.props.getRecordsListActions(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    randomDefaultImg() {
        return `../../../../img/album/${parseInt(Math.random() * 3, 10) + 1}.png`;
    }

}


Records.defaultProps = {
    list: {recordsListData: {}}
};

Records.propTypes = {
    list: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        list: state.app.songs
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteRecordingAction: bindActionCreators(deleteRecording, dispatch),
        getRecordsListActions: bindActionCreators(getRecordsList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
