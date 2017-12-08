import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import VipImg from "../../../../img/mall/vip.png";
import MallImg from "../../../../img/mall/mall.png";
import {Paper} from "material-ui";
import {linkTo} from "../../../utils/comUtils";
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import sysConfig from "../../utils/sysConfig";

class myOrder extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("我的订单");
    }

    render() {
        return (
            <Paper
                zDepth={0}
                style={{margin: '.3rem .267rem 0 .267rem'}}
            >
                 <img src={VipImg} style={{width: '100%', marginBottom: '.2rem'}} onClick={() => {
                     linkTo(`user/orderForm`, false, null);
                 }}/>
                 <img src={MallImg} style={{width: '100%'}} onClick={f => location.href = sysConfig.mallOrder}/>
             </Paper>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(myOrder));
