/**
 * Created by walljack@163.com on 2017/7/27.
 */

import React from "react";
import reactDom from "react-dom";
import PropTypes from "prop-types";

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            validateArr: {}
        };
    }

    componentDidMount() {
        let form = reactDom.findDOMNode(this.refs.form);
        form.onsubmit = () => this.beforeSubmit();
        const {children, validate} = this.props;
        const childrenClone = children.map((o, i) => {
            if (o.type.name !== "Input") return o;
            return React.cloneElement(o, {
                doValidate: this.setHandelValidate.bind(this),
                key: i
            });
        });
        this.setState({
            children: childrenClone
        });
    }

    render() {
        const children = this.state.children;

        return (
            <form ref="form" action="">
                {children}
            </form>
        );
    }

    beforeSubmit() {
        const validateArr = this.state.validateArr;
        for (let key in validateArr) {
            const validateHandel = validateArr[key];
            validateHandel();
        }
        return false;
    }

    setHandelValidate(handelValidateFun, hash) {
        let validateArr = this.state.validateArr;
        validateArr[hash] = handelValidateFun;
        this.setState({
            validateArr: validateArr
        });
    }
}

Form.propTypes = {
    validate: PropTypes.bool
};
