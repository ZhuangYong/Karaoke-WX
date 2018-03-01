/**
 * Created by walljack@163.com on 2017/7/27.
 */
import React from "react";
import PropTypes from "prop-types";
import { toRem } from '../../utils/comUtils';
import intl from 'react-intl-universal';
import {
    SvgIcon,
    CircularProgress,
} from "material-ui";

const style = {
    position: 'absolute',
    top: '66px'
};

const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);

export default class MyButton extends React.Component {

    constructor(props) {
        super(props);

        this.click = this.click.bind(this);
    }

    render() {
        const {style, loading, disabled, labelStyle, label, rightIcon, backgroundColor, disabledBackgroundColor, disabledFontColor, fontColor} = this.props;

        return <div style={Object.assign({}, {
                position: 'relative',
                display: 'inline-block',
                width: toRem(200),
                height: toRem(80),
                textAlign: 'center',
                lineHeight: toRem(80),
                color: disabled ? disabledFontColor : fontColor,
                fontSize: toRem(24),
                backgroundColor: disabled ? disabledBackgroundColor : backgroundColor
            }, style)}
            onClick={this.click}>

            {loading && <CircularProgress
                className="myButtonCircular"
                size={18}
                thickness={1}
                color={disabledFontColor}
                style={{
                    marginRight: toRem(20),
                }}
            />}

            <span style={Object.assign({}, labelStyle)}>{label}</span>

            {rightIcon && <RightCircleIcon style={{
                position: "relative",
                top: toRem(8),
                marginLeft: toRem(20),
                width: toRem(30),
                height: toRem(30),
                color: disabled ? disabledFontColor : fontColor,
            }}/>}

        </div>;
    }

    click() {
        const {onClick, disabled} = this.props;
        (!disabled && onClick) && onClick();
    }

}

MyButton.propTypes = {
    style: PropTypes.object,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    labelStyle: PropTypes.object,
    label: PropTypes.string,
    rightIcon: PropTypes.bool,
    fontColor: PropTypes.string,
    disabledFontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    disabledBackgroundColor: PropTypes.string
};

MyButton.defaultProps = {
    style: {},
    loading: false,
    disabled: false,
    labelStyle: {},
    label: "点击",
    rightIcon: false,
    fontColor: "#fff",
    disabledFontColor: "#fff",
    backgroundColor: "#ff6832",
    disabledBackgroundColor: "rgb(229, 229, 229)"
};
