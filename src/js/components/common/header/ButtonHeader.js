/**
 * Created by Zed on 2017/12/22.
 */

import React from 'react';
import { toRem } from '../../../utils/comUtils';
import PropTypes from "prop-types";
import MyButton from '../MyButton';

class ButtonHeader extends React.Component {
    constructor () {
        super();

        this.leftButton = this.leftButton.bind(this);
        this.rightButton = this.rightButton.bind(this);
    }

    render() {

        const {style, titleStyle, title, rightButtonLabel} = this.props;

        return <section style={{
            width: "100%",
            height: toRem(110),
            backgroundColor: "#fff",
            borderTop: "2px solid #d7d7d7",
            ...style
        }}>

            <header style={{
                float: "left",
                marginLeft: toRem(20),
                lineHeight: toRem(110),
                color: "#212121",
                fontSize: toRem(36),
                ...titleStyle
            }}>

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

        return <MyButton
            style={{...btnData.buttonStyle,
                float: btnData.float,
                marginRight: toRem(20),
                width: 'auto',
                height: 'auto',
                lineHeight: toRem(110)
            }}
            onClick={btnData.buttonClick}
            loading={btnData.buttonLoading}
            labelStyle={btnData.buttonLabelStyle}
            label={btnData.buttonLabel}
            rightIcon={btnData.buttonRightIcon}
            disabled={btnData.buttonDisabled}
            backgroundColor=""
            disabledBackgroundColor=""
            disabledFontColor="rgb(229, 229, 229)"
            fontColor="#ff6832"
        />;
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

ButtonHeader.defaultProps = {
    style: {},
    title: null,
    titleStyle: {},
    leftButtonLoading: false,
    leftButtonStyle: {},
    leftButtonDisabled: false,
    leftButtonLabelStyle: {},
    leftButtonLabel: null,
    leftButtonClick: null,
    rightButtonStyle: {},
    rightButtonLoading: false,
    rightButtonLabelStyle: {},
    rightButtonDisabled: false,
    rightButtonLabel: null,
    rightButtonClick: null,
    rightButtonRightIcon: false
};

export default ButtonHeader;
