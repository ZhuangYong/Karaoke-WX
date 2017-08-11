/**
 * Created by walljack@163.com on 2017/8/2.
 */

import React from "react";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import HardwareKeyboardVoice from "material-ui/svg-icons/hardware/keyboard-voice";
import Monitor from "material-ui/svg-icons/device/graphic-eq";
import {BottomNavigation, BottomNavigationItem} from "material-ui";
import {linkTo} from "../../utils/comUtils";
import PropTypes from "prop-types";
import BaseComponent from "./BaseComponent";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class MBottomNavigation extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex
        };
    }

    render() {
        return (
            <BottomNavigation
                selectedIndex={this.state.selectedIndex}
                style={{position: "fixed", borderTop: "1px solid #efefef", bottom: "0", zIndex: "2"}}
            >
                <BottomNavigationItem
                    label="主页"
                    icon={<HardwareKeyboardVoice/>}
                    onTouchTap={() => this.navSelect(0)}
                />
                <BottomNavigationItem
                    style={{}}
                    label="遥控"
                    icon={
                        <div>
                            <Monitor
                            />
                        </div>
                    }
                    onTouchTap={() => this.navSelect(1)}
                />
                <BottomNavigationItem
                    label="我的"
                    icon={<IconLocationOn/>}
                    onTouchTap={() => this.navSelect(2)}
                />
            </BottomNavigation>
        );
    }

    navSelect(index) {
        this.setState({selectedIndex: index});
        switch (index) {
            case 0:
                linkTo("home", false, null);
                break;
            case 1:
                linkTo("controller/", false, null);
                break;
            case 2:
                linkTo("user", false, null);
                break;
            default:
                break;
        }
    }
}

MBottomNavigation.propTypes = {
    selectedIndex: PropTypes.number
};
MBottomNavigation.defaultProps = {
    selectedIndex: 0
};


const mapStateToProps = (state, ownPorps) => {
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MBottomNavigation));
