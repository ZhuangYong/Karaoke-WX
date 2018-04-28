/**
 * Created by Zed on 2017/7/31.
 */

import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {deleteRecording, getRecordsList} from '../../../actions/userActions';
import { getWxinfoFromSession, linkTo, reqHeader, toRem } from '../../../utils/comUtils';

import BaseComponent from "../../../components/common/BaseComponent";
import RefreshIndicator from "material-ui/RefreshIndicator";
import RecordingGrid from "../../../components/recordingGrid/index";
import BottomDrawer from "../../../components/recordingGrid/bottomDrawer";
import FlatButton from 'material-ui/FlatButton';
import Const from "../../../utils/const";
import NoWifi from "../../../components/common/NoWifi";
import NoResult from "../../../components/common/NoResult";
import intl from 'react-intl-universal';
import SubmitLoading from '../../../components/common/SubmitLoading';
import { setGlobAlert } from '../../../actions/common/actions';

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
            selectItem: null,
            offLine: false,
            dataLoaded: false,
            submitLoading: false
        };

        this.deleteGetter = this.deleteGetter.bind(this);
        this.changeCoverGetter = this.changeCoverGetter.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.list.recordsListStamp !== this.props.list.recordsListStamp) {
            const data = this.props.list.recordsListData || {result: [], islastpage: false};
            const {result, islastpage} = data;

            this.setState({
                recordingList: [...this.state.recordingList, ...(result || [])],
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
        const {recordingList, offLine, currentPage, dataLoaded, loading, lastPage, open, submitLoading} = this.state;

        return (
            <div
                className="recordings"
                style={style.recordings}
                onScroll={this.onScroll.bind(this)}
            >
                {
                    (offLine && currentPage !== 0 && recordingList.length === 0) ? <NoWifi style={{position: 'absolute', top: '-1rem'}}/> : ""
                }

                {
                    (dataLoaded && currentPage >= 1 && recordingList.length === 0) ? (<NoResult style={{position: 'absolute', top: '-1rem'}}/>) : (<div>
                        <RecordingGrid
                            data={recordingList || []}
                            operateClick={(item) => {
                                this.setState({
                                    selectItem: item,
                                    open: true
                                });
                            }}
                        />

                        <div style={style.loading}>
                            {loading ? (<div><RefreshIndicator
                                size={30}
                                left={70}
                                top={0}
                                loadingColor="#FF9800"
                                status="loading"
                                style={style.loadingBar}
                            />
                                <span>{intl.get("song.loading")}</span>
                            </div>) : ""}

                            <span>{lastPage ? intl.get("song.list.end") : ""}</span>
                            <span>{(!loading && offLine && currentPage !== 0 && recordingList.length !== 0) ? Const.STRING_NO_WIFI : ""}</span>
                        </div>

                        <BottomDrawer
                            open={open}
                            onRequestChange={() => {
                                this.setState({
                                    open: false
                                });
                            }}
                            actions={[{label: intl.get('button.delete'), fun: this.deleteGetter}, {label: intl.get('button.change.cover'), fun: this.changeCoverGetter}]}
                            // actions={[{label: '删除', fun: this.deleteGetter}]}
                        />

                        <SubmitLoading hide={!submitLoading} />
                    </div>)
                }
            </div>
        );
    }


    /**
     * 删除录音
     */
    deleteGetter() {
        this.setState({submitLoading: true});
        const {globAlertAction, deleteRecordingAction} = this.props;
        const {selectItem, recordingList} = this.state;
        const params = {uid: selectItem.uid};
        deleteRecordingAction(params, reqHeader(params), res => {
            const {status} = res;
            parseInt(status, 10) === 1 && this.setState({
                recordingList: recordingList.filter((item) => {
                    return item.uid !== selectItem.uid;
                })
            });
            globAlertAction(parseInt(status, 10) === 1 ? intl.get("msg.delete.success") : intl.get("msg.delete.fail"));
            this.setState({open: false, submitLoading: false});
        });
    }

    /**
     * 更换录音封面
     */
    changeCoverGetter() {
        const {selectItem} = this.state;
        linkTo(`user/photoAlbum/cover/1/${selectItem.shareId}`, false, null);
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

        const userInfoData = getWxinfoFromSession();
        const {openid} = userInfoData;
        if (openid) {
            const currentPage = this.state.currentPage + 1;
            const pageSize = this.state.pageSize;

            const getRecordsListParams = {
                pageSize: pageSize,
                currentPage: currentPage,
                openid: openid
            };
            this.props.getRecordsListActions(getRecordsListParams, reqHeader(getRecordsListParams), null, (msg, err) => {
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
        } else {
            this.props.globAlertAction(intl.get("get.user.info.fail.try.again"));
        }

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
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getRecordsListActions: bindActionCreators(getRecordsList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
