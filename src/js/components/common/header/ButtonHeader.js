/**
 * Created by Zed on 2017/12/22.
 */

import React from 'react';
import { toRem } from '../../../utils/comUtils';
import PropTypes from "prop-types";
import RefreshIndicator from "material-ui/RefreshIndicator";

class ButtonHeader extends React.Component {
    constructor () {
        super();

        this.leftButton = this.leftButton.bind(this);
        this.rightButton = this.rightButton.bind(this);
    }

    render() {

        const {style, titleStyle, title, isShowLeftButton} = this.props;

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

                {!isShowLeftButton ? title || 'Title' : this.button('left')}

            </header>

            {this.button('right')}

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
            buttonLabel: this.props[`${position}ButtonLabel`]
        };

        return <div style={Object.assign({}, {
            position: 'relative',
            float: btnData.float,
            marginRight: toRem(20)
        }, btnData.buttonStyle || {})}
                    onClick={btnData.buttonClick}>

            {!btnData.buttonLoading ? <span style={Object.assign({}, {
                lineHeight: toRem(110),
                color: btnData.buttonDisabled ? "rgb(229, 229, 229)" : "#ff6832",
                fontSize: toRem(24)
            }, btnData.buttonLabelStyle || {})}>{btnData.buttonLabel || '点击'}</span> : <RefreshIndicator
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
    isShowLeftButton: PropTypes.bool,
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
    rightButtonClick: PropTypes.func
};

export default ButtonHeader;
