/**
 * Created by Zed on 2017/8/8.
 */

import React from 'react';
import BaseComponent from "../../../components/common/BaseComponent";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {getPhotoAlbumList} from '../../../actions/photoAlbumActions';
import {reqHeader} from "../../../utils/comUtils";

import sysConfig from '../../../utils/sysConfig';
import navUtils from '../../../utils/navUtils';

class Preview extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            index: this.props.match.params.index,
            data: []
        };

        this.updateList = this.updateList.bind(this);
        this.linkTo = this.linkTo.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.result.photoAlbumListStamp !== this.props.result.photoAlbumListStamp) {
            this.updateList();
        }
    }

    componentDidMount() {
        const param = {};
        this.props.actions(param, reqHeader(param));
    }

    render() {
        const {imgUrl} = this.state.data[this.state.index] || {imgUrl: ''};
        return (
            <div
                style={{width: window.screen.width, height: window.screen.height, background: '#000'}}
                onTouchTap={() => {
                    this.linkTo('user/photoAlbum', false, null);
                }}
            >
                <img src={imgUrl} style={{position: 'absolute', top: '20%', left: '10%', width: '80%', height: 'auto'}} alt=""/>
            </div>
        );
    }

    updateList() {
        const {data} = this.props.result.photoAlbumList || {data: []};
        this.setState({
            data: data
        });
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

Preview.defaultProps = {
    result: {}
};

Preview.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.photoAlbum
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(getPhotoAlbumList, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));
