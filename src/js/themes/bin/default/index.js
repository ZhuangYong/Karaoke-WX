import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import childrenTheme from "../children";

class defaultTheme extends React.Component {
    render() {
        return <div className="default">{this.props.children}</div>;
    }
}

defaultTheme.propTypes = {
    children: PropTypes.any,
};
export default defaultTheme;
