/**
 * Created by Zed on 2017/7/31.
 */

import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {GridList, GridTile} from "material-ui/GridList";
import * as recordsListAction from '../../../actions/recordsListAction';
import {reqHeader} from "../../../utils/comUtils";
import defaultImg from "../../../../img/common/tile_default.jpg";

import sysConfig from '../../../utils/sysConfig';
import navUtils from '../../../utils/navUtils';
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
        this.linkTo = this.linkTo.bind(this);
    }

    componentWillMount() {
        let params = {
            pageSize: 20,
            currentPage: 1
        };
        this.props.actions.getRecordsList(params, reqHeader(params));
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
                            onClick={() => {
                                this.linkTo(`s/p/${tile.uid}`, false, null);
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

    /**
     * 前往指定的页面
     * @param  {[type]} link         页面path
     * @param  {[type]} requireLogin 是否需要登录
     * @return {[type]}              [description]
     */
    linkTo(link, requireLogin, info) {
        let fullLink;
        if (link.indexOf('http') === 0) {
            fullLink = link;
            location.href = link;
            return;
        } else {
            fullLink = sysConfig.contextPath + link;
        }

        if (requireLogin) {
            navUtils.forward(sysConfig.contextPath + '/login');
        } else {
            navUtils.forward(fullLink);
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
        actions: bindActionCreators(recordsListAction, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Records));
