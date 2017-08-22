/**
 * Created by Zed on 2017/7/31.
 */

import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {GridList, GridTile} from "material-ui/GridList";
import {getRecordsList} from '../../../actions/userActions';
import {linkTo, reqHeader} from "../../../utils/comUtils";
import defaultImg from "../../../../img/common/tile_default.jpg";

import BaseComponent from "../../../components/common/BaseComponent";
import RefreshIndicator from "material-ui/RefreshIndicator";

const style = {
    recordings: {
        position: "absolute",
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    tile: {
        width: "90%",
        height: "80%",
        margin: "auto",
        overflow: "hidden"
    },
    tileImg: {
        height: "100%",
        margin: "auto",
        display: "inherit"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: 50,
        fontSize: "14px",
        // marginBottom: 88,
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

        this.state = {
            recordingList: [],
            pageSize: 20,
            currentPage: 0,
            loading: false,
            lastPage: false
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.list.recordsListStamp !== this.props.list.recordsListStamp) {
            const {data} = this.props.list.recordsListData || {data: {result: [], islastpage: false}};
            const {result, islastpage} = data;
            this.setState({
                recordingList: [...this.state.recordingList, ...(result || [])],
                lastPage: islastpage,
                loading: false
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
                <GridList
                    cellHeight={100}
                    style={{margin: "6px"}}
                    cols={3}
                >
                    {recordingList.map((tile) => (
                        <GridTile
                            key={tile.musicTime}
                            title={tile.nameNorm}
                            titleStyle={{textAlign: "center", marginRight: "16px", marginTop: "20%", color: "black"}}
                            titleBackground="transparent"
                            onTouchTap={() => {
                                linkTo(`user/recordings/play/${tile.uid}`, false, null);
                            }}
                        >
                            <div style={style.tile}>
                                <img src={defaultImg} style={style.tileImg} onError={function (e) {
                                    e.target.src = defaultImg;
                                }}/>
                            </div>
                        </GridTile>
                    ))}
                </GridList>

                <div style={style.loading}>
                    {this.state.loading ? (<RefreshIndicator
                        size={30}
                        left={70}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={style.loadingBar}
                    />) : ""}

                    <span>{this.state.lastPage ? "亲爱滴，已经到底了" : "正在加载"}</span>
                </div>
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
    loadMoreAction(resolve, reject) {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const pageSize = this.state.pageSize;
        let param = {currentPage: currentPage, pageSize: pageSize};
        //个性化推荐
        this.props.getRecordsListActions(param, reqHeader(param), resolve);
        this.setState({
            currentPage: currentPage,
            loading: true
        });
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
        getRecordsListActions: bindActionCreators(getRecordsList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
