/**
 * Created by Zed on 2017/12/22.
 */

import React from 'react';
import { toRem } from '../../../utils/comUtils';
import PropTypes from "prop-types";
import RefreshIndicator from "material-ui/RefreshIndicator";
import {SvgIcon} from "material-ui";


const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);

class ButtonHeader extends React.Component {
    constructor () {
        super();

        this.leftButton = this.leftButton.bind(this);
        this.rightButton = this.rightButton.bind(this);
    }

    render() {

        const {style, titleStyle, title, rightButtonLabel} = this.props;

        return <section style={Object.assign({}, {
            width: "100%",
            height: toRem(110),
            backgroundColor: "#fff",
            borderBottom: "2px solid #d7d7d7"}, style || {})}>

            <header style={Object.assign({}, {
                    float: "left",
                    marginLeft: toRem(20),
                    lineHeight: toRem(110),
                    color: "#212121",
                    fontSize: toRem(36)
                }, titleStyle || {})}>

                {title ? title || 'Title' : this.button('left')}

            </header>

            {rightButtonLabel && this.button('right')}

            <div style={{clear: 'both'}} />
        </section>;
    }

    /**
     * buttonHtml用于生成自定义按钮
     * @param position 按钮位置 left/right
     * @returns {XML}
     */
    button(position) {

        const btnData = {
            float: position,
            buttonStyle: this.props[`${position}ButtonStyle`],
            buttonClick: this[`${position}Button`],
            buttonLoading: this.props[`${position}ButtonLoading`],
            buttonDisabled: this.props[`${position}ButtonDisabled`],
            buttonLabelStyle: this.props[`${position}ButtonLabelStyle`],
            buttonLabel: this.props[`${position}ButtonLabel`],
            buttonRightIcon: this.props[`${position}ButtonRightIcon`],
        };

        return <div style={Object.assign({}, {
            position: 'relative',
            float: btnData.float,
            marginRight: toRem(20)
        }, btnData.buttonStyle || {})}
                    onClick={btnData.buttonClick}>

            {!btnData.buttonLoading ? <div>
                <span style={Object.assign({}, {
                    lineHeight: toRem(110),
                    color: btnData.buttonDisabled ? "rgb(229, 229, 229)" : "#ff6832",
                    fontSize: toRem(24)
                }, btnData.buttonLabelStyle || {})}>{btnData.buttonLabel || '点击'}</span>

                {btnData.buttonRightIcon && <RightCircleIcon style={{
                    position: "relative",
                    top: toRem(8),
                    marginLeft: toRem(20),
                    color: btnData.buttonDisabled ? "rgb(229, 229, 229)" : "#ff6832",
                    width: toRem(30),
                    height: toRem(30)
                }}/>}

            </div> : <RefreshIndicator
                size={30}
                left={70}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={{
                    boxShadow: "none",
                    top: '-9988px',
                    left: '-10100px'
                }}
            />}
        </div>;
    }

    rightButton() {
        const {rightButtonDisabled, rightButtonClick} = this.props;
        if (rightButtonDisabled) return;
        rightButtonClick && rightButtonClick();
    }

    leftButton() {
        const {leftButtonDisabled, leftButtonClick} = this.props;
        if (leftButtonDisabled) return;
        leftButtonClick && leftButtonClick();
    }
}

ButtonHeader.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    leftButtonLoading: PropTypes.bool,
    leftButtonStyle: PropTypes.object,
    leftButtonDisabled: PropTypes.bool,
    leftButtonLabelStyle: PropTypes.object,
    leftButtonLabel: PropTypes.string,
    leftButtonClick: PropTypes.func,
    rightButtonStyle: PropTypes.object,
    rightButtonLoading: PropTypes.bool,
    rightButtonLabelStyle: PropTypes.object,
    rightButtonDisabled: PropTypes.bool,
    rightButtonLabel: PropTypes.string,
    rightButtonClick: PropTypes.func,
    rightButtonRightIcon: PropTypes.bool
};

export default ButtonHeader;
