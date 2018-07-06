/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import intl from 'react-intl-universal';
import Img1 from '../../../img/product/1/1.png';
import Img2 from '../../../img/product/1/2.png';
import Img3 from '../../../img/product/1/3.png';
import Img4 from '../../../img/product/1/4.png';

const styles = {

};


class Product1 extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("audio.bring.karaoke.home"));

        this.state = {
            matchParams: this.props.match.params,
            questionList: [],
            imgList: [],
            submitParams: {
                questionIds: null,
                content: "",
                imgIds: null,
                tel: null
            },
            showAlert: false,
            globAlert: "toast",
            client: null,
            deleteLoading: false,
            uploadImgLoading: false
        };

    }

    componentDidUpdate(preProps) {
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <img src={Img1} style={{maxWidth: '100%', display: 'block'}}/>
                <img src={Img2} style={{maxWidth: '100%', display: 'block'}} onClick={() => window.location.href = "https://mall.jd.com/index-1000105195.html"}/>
                <img src={Img3} style={{maxWidth: '100%', display: 'block'}} onClick={() => window.location.href = "https://mall.jd.com/index-1000105196.html"}/>
                <img src={Img4} style={{maxWidth: '100%', display: 'block'}} onClick={() => window.location.href = "https://mall.jd.com/index-1000105196.html"}/>
            </div>
        );
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product1));
