/**
 * Created by Zed on 2017/8/8.
 */

import React from 'react';
import BaseComponent from "../../../components/common/BaseComponent";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {linkTo, reqHeader} from "../../../utils/comUtils";
import {getPhotoAlbumList} from "../../../actions/userActions";

const style = {
    container: {
      width: document.documentElement.clientWidth || document.body.clientWidth,
      height: document.documentElement.clientHeight || document.body.clientHeight,
      background: '#000'
    },
    img: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80%',
        height: 'auto'
    }
};

class Preview extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            imgId: this.props.match.params.imgId,
            data: []
        };

        this.updateList = this.updateList.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.result.photoAlbumListStamp !== this.props.result.photoAlbumListStamp) {
            this.updateList();
        }
    }

    componentDidMount() {
        const params = {};
        this.props.actions(params, reqHeader(params));
    }

    render() {
        const imgItem = this.state.data.filter((item) => {
            if (parseInt(item.id, 10) === parseInt(this.state.imgId, 10)) {
                return item;
            }
        });
        const {imgUrl} = imgItem[0] || {imgUrl: ''};

        return (
            <div
                style={style.container}
                onTouchTap={() => {
                    // 在这里需要返回上一级导航，而不是前进
                    linkTo('user/photoAlbum', false, null);
                    // navUtils.goBack();
                }}
            >
                <img src={imgUrl} style={style.img} alt=""/>
            </div>
        );
    }

    updateList() {
        const {data} = this.props.result.photoAlbumList || {data: []};
        this.setState({
            data: data
        });
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
