import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import themeProvider from "../../index";

class childrenTheme extends React.Component {
    render() {
        return <div className="children">{this.props.children}</div>;
    }
}

childrenTheme.propTypes = {
    children: PropTypes.any,
};
export default childrenTheme;
