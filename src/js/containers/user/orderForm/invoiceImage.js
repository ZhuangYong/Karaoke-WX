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
import intl from 'react-intl-universal';
import {atob as decoding} from "Base64";

const blankImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

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


class invoiceImage extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.invoice.detail"));

        this.state = {
            visible: false,
        };
    }

    render() {
        const {url} = this.props.match.params;
        const imgurl = decoding(decodeURIComponent(url));

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

                <img
                    className="img-not-loaded"
                    style={{
                        paddingTop: toRem(25),
                        paddingRight: toRem(20),
                        paddingLeft: toRem(20),
                        width: '100%',
                        backgroundColor: '#fff'
                    }}
                    src={imgurl}
                    onError={e => {
                        e.target.src = blankImg;
                        e.target.style.backgroundColor = '#eee';
                    }}
                    onClick={() => {
                        this.setState({
                            visible: true
                        });
                    }}/>
            </div>
        );
    }

}

invoiceImage.defaultProps = {};

invoiceImage.propTypes = {};

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(invoiceImage));
