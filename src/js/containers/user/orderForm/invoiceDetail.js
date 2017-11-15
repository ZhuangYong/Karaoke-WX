/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";

import {reqHeader, toRem} from "../../../utils/comUtils";
import {getInvoiceDetail} from "../../../actions/userActions";
import $ from 'jquery';
import {findDOMNode} from "react-dom";
import cropper from 'cropper';
import '../../../../css/cropper.css';
import defaultImg from "../../../../img/login.png";

const style = {
    orderings: {
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
};

const imgMax = {
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH: document.documentElement.clientHeight || document.body.clientHeight,
    scaleRate: 1
};

let options = {
    autoCrop: false,
    viewMode: 0,
    background: false,
    dragMode: 'move',
    zoomable: true,
    cropBoxResizable: false,
    cropBoxMovable: false,
    aspectRatio: 1 / 1,
    minCropBoxWidth: imgMax.screenW * imgMax.scaleRate,
    minCropBoxHeight: imgMax.screenW * imgMax.scaleRate,
    minCanvasWidth: imgMax.screenW,
    ready: function () {
        $(this).cropper('scale', imgMax.scaleRate, imgMax.scaleRate);
    }
};

class InvoiceDetail extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("开票详情");

        this.state = {
           isShow: false
        };
    }

    get preview() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.preview);
    }

    componentDidMount() {
        const param = {
            id: this.props.match.params.id
        };

        this.props.getInvoiceDetailAction(param, reqHeader(param), null);
    }

    render() {
        const {url} = this.props.orderForm.invoiceDetailData || {url: ""};

        return (
            <div style={{position: "relative"}}>
                <img
                    ref="preview"
                    style={{
                        paddingTop: toRem(25),
                        paddingRight: toRem(20),
                        paddingLeft: toRem(20),
                        width: '100%'}}
                    src={url}
                    onClick={() => {
                        this.setState({isShow: true});
                        $(this.preview).cropper(options);
                    }}
                />

                <div style={{
                    display: this.state.isShow ? "block" : "none",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: imgMax.screenW,
                    height: imgMax.screenH,
                    background: "#000"}}
                    onClick={() => {
                        this.setState({isShow: false});
                    }}>
                    <img
                        ref="preview"
                        style={{width: '100%'}}
                        src={url}
                    />
                </div>

            </div>
        );
    }

}

InvoiceDetail.defaultProps = {};

InvoiceDetail.propTypes = {};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderForm: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInvoiceDetailAction: bindActionCreators(getInvoiceDetail, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail));
