/**
 * Created by walljack@163.com on 2017/8/2.
 */

import React from "react";
import {BottomNavigation, BottomNavigationItem} from "material-ui";
import {linkTo} from "../../utils/comUtils";
import PropTypes from "prop-types";
import BaseComponent from "./BaseComponent";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import navIndexIcon from "../../../img/common/nav_index.png";
import navIndexOnIcon from "../../../img/common/nav_index_on.png";
import navMeIcon from "../../../img/common/nav_me.png";
import navMeOnIcon from "../../../img/common/nav_me_on.png";
import navControllerIcon from "../../../img/common/nav_controll_gif.png";

const style = {
    nav: {
        height: "1.4rem",
        position: "fixed",
        borderTop: "1px solid #efeeef",
        bottom: -1,
        zIndex: "2",
        playController: {
            position: "relative",
            paddingLeft: 0,
            paddingRight: 0,
            circle: {
                position: "absolute",
                top: '-.93rem',
                height: '2.4rem',
                arc: {
                    border: "1px solid #efeeef",
                    position: "absolute",
                    marginLeft: '-.907rem',
                    left: "50%",
                    width: '1.813rem',
                    height: '1.067rem',
                    bottom: '1.1rem',
                    borderRadius: "1.067rem 1.067rem 0 0",
                    backgroundColor: "white"
                },
                maskLine: {
                    height: '1.493rem',
                    borderTop: "1px solid white",
                    width: '1.707rem',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    marginLeft: '-.853rem',
                    backgroundColor: "white"
                },
                maskArc: {
                    height: '1.467rem',
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "white"
                },
                icon: {
                    position: "absolute",
                    left: "50%",
                    marginLeft: '-.7rem',
                    width: '1.4rem',
                    bottom: '.56rem',
                    backgroundColor: '#ff6d32',
                    borderRadius: '50%'
                }
            }
        },
        label: {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            bottom: 4,
            left: 0,
            fontSize: ".267rem"
        }
    }
};

class MBottomNavigation extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex
        };
    }

    render() {
        const indexIcon = this.state.selectedIndex === 0 ? navIndexOnIcon : navIndexIcon;
        const meIcon = this.state.selectedIndex === 2 ? navMeOnIcon : navMeIcon;
        let labelColor = ["#999", "#999", "#999"];
        labelColor[this.state.selectedIndex] = "#ff6832";
        return (
            <BottomNavigation
                selectedIndex={this.state.selectedIndex}
                style={style.nav}
            >
                <BottomNavigationItem
                    style={{paddingTop: '.213rem', paddingBottom: '.113rem', maxWidth: '100%'}}
                    label={<div style={{...style.nav.label, color: labelColor[0], bottom: '.107rem'}}>主页</div>}
                    icon={
                        <div style={{height: '.667rem', marginBottom: '.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img style={{height: ".667rem", width: '.62rem'}} src={indexIcon}/>
                        </div>
                    }
                    onTouchTap={() => this.navSelect(0)}
                />
                <BottomNavigationItem
                    style={{...style.nav.playController, maxWidth: '100%'}}
                    label={<div style={{...style.nav.label, color: labelColor[1], bottom: '.107rem'}}>播控</div>}
                    icon={
                        <div style={style.nav.playController.circle}>
                            <div style={style.nav.playController.circle.arc}/>
                            <div style={style.nav.playController.circle.maskLine}/>
                            <div style={style.nav.playController.circle.maskArc}/>
                            <img style={style.nav.playController.circle.icon} src={navControllerIcon}/>
                        </div>
                    }
                    onTouchTap={() => this.navSelect(1)}
                />
                <BottomNavigationItem
                    style={{paddingTop: '.213rem', paddingBottom: '.113rem', maxWidth: '100%'}}
                    label={<div style={{...style.nav.label, color: labelColor[2], bottom: '.107rem'}}>我的</div>}
                    icon={
                        <div style={{height: '.667rem', marginBottom: '.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img style={{height: ".667rem", width: ".667rem"}} src={meIcon}/>
                        </div>
                    }
                    onTouchTap={() => this.navSelect(2)}
                />
            </BottomNavigation>
        );
    }

    navSelect(index) {
        this.setState({selectedIndex: index});
        switch (index) {
            case 0:
                linkTo("", false, null);
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
