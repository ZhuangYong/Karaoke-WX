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
import ClearIcon from "material-ui/svg-icons/content/clear";

// 图片预览插件，因为没有添加读取package中css的loader，所以对应css暂时放在src\css下
import Viewer from 'react-viewer-mobile';
import '../../../../css/reactViewer.css';

const styles = {
    close: {
        position: "absolute",
        top: toRem(15),
        right: toRem(20),
        width: toRem(100),
        height: toRem(100),
        zIndex: 999999
    }
};


class InvoiceDetail extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("开票详情");

        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        const param = {
            id: this.props.match.params.id
        };

        this.props.getInvoiceDetailAction(param, reqHeader(param), null);
    }

    render() {
        const {data} = this.props.orderForm.invoiceDetailData || {data: {url: ""}};
        const {imgurl} = data;

        return (
            <div style={{position: "relative"}}>

                <Viewer
                    visible={this.state.visible}
                    images={[{src: imgurl, alt: ''}]}
                />

                {this.state.visible && <div>
                    <div style={styles.close}/>
                    <ClearIcon
                        style={{
                            ...styles.close,
                            width: toRem(80),
                            border: "2px solid #ccc",
                            borderRadius: toRem(100),
                            height: toRem(80)}}
                        color="#ccc"
                        onClick={() => {
                            this.setState({
                                visible: false
                            });
                        }}
                    />
                </div>}

                <a href="#">
                    <img
                        style={{
                            paddingTop: toRem(25),
                            paddingRight: toRem(20),
                            paddingLeft: toRem(20),
                            width: '100%'}}
                        src={imgurl}
                        onClick={() => {
                            this.setState({
                                visible: true
                            });
                        }}/>
                </a>
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
