/**
 * Created by walljack@163.com on 2017/7/27.
 */
import TextField from 'material-ui/TextField';
import React from "react";
import PropTypes from "prop-types";
import {getRandomString} from "../../utils/comUtils";

const style = {
    position: 'absolute',
    top: '66px'
};
export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: getRandomString(24),
            value: "",
            errorText: "",
            trim: this.props.trim || false
        };
        this.handelValidate.bind(this);
    }

    componentDidMount() {
        const doValidate = this.props.doValidate;
        doValidate && doValidate(this.handelValidate.bind(this), this.state.hash);
    }

    render() {
        const {onChange, errorStyle, errorText, minLength, maxLength, bindState, validate, doValidate, trim, ...other} = this.props;
        return (
            <TextField
                ref="input"
                errorStyle={style}
                errorText={this.state.errorText}
                onChange={this.handelChange.bind(this)}
                {...other}
            />
        );
    }

    handelChange(t, value) {
        if (this.state.trim) {
            value = value.trim();
        }
        this.setState({
            value: value
        });
        this.handelValidate(value);
        const bindState = this.props.bindState;
        bindState && bindState(value);
    }

    handelValidate(value) {
        value = value || this.state.value;
        let errorText = "";
        const validate = this.props.validate;
        const minLength = this.props.minLength;
        const maxLength = this.props.maxLength;
        if (typeof value === "string") {
            if (minLength) {
                if (value.length < minLength) {
                    errorText = "长度不能小于" + minLength;
                }
            }
            if (maxLength) {
                if (value.length > maxLength) {
                    errorText = "长度不能大于" + maxLength;
                }
            }
        }

        if (!errorText && typeof validate === "string") {
            switch (validate) {
                case "account":
                    if (!(/^[a-zA-z]\w{3,15}$/.test(value))) {
                        errorText = this.props.errorText;
                    }
                    break;
                default:
                    break;
            }
        }

        this.setState({
            errorText: errorText
        });

        return errorText;
    }
}

Input.propTypes = {
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    errorStyle: PropTypes.object,
    validate: PropTypes.any,
    bindState: PropTypes.func,
    doValidate: PropTypes.func,
};

// Input.defaultProps = {
//     doValidate: this.handelValidate
// };
