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

const style = {
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
    }
};
class Records extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let params = {
            pageSize: 20,
            currentPage: 1
        };
        this.props.getRecordsListActions(params, reqHeader(params));
    }

    render() {
        const {status, data, msg} = this.props.list.recordsListData || {};
        const {result} = data || {result: []};

        return (
            <div className='records'>

                <GridList
                    cellHeight={100}
                    style={{margin: "6px"}}
                    cols={3}
                >
                    {result.map((tile) => (
                        <GridTile
                            key={tile.musicTime}
                            title={tile.nameNorm}
                            titleStyle={{textAlign: "center", marginRight: "16px", marginTop: "20%", color: "black"}}
                            titleBackground="transparent"
                            onTouchTap={() => {
                                linkTo(`s/p/${tile.uid}`, false, null);
                            }}
                        >
                            <div style={style.tile}>
                                <img src={tile.image} style={style.tileImg} onError={function (e) {
                                    e.target.src = defaultImg;
                                }}/>
                            </div>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
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
