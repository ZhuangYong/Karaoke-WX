import React from "react";
import Route from "react-router-dom/es/Route";
import Bundle from "../components/Bundle";
import childrenTheme from "./bin/children";
import defaultTheme from "./bin/default";
import PropTypes from "prop-types";

class themeProvider extends React.Component {
    render() {
        const childrenThemeComponent = () => (
            <Bundle load={childrenTheme}>
                {Component => <Component children={this.props.children}/>}
            </Bundle>
        );
        const defaultThemeComponent = () => (
            <Bundle load={defaultTheme}>
                {Component => <Component children={this.props.children}/>}
            </Bundle>
        );
        return <div>
            {
                this.props.name === "children" && <Route path="*" component={childrenThemeComponent}/>
            }
            {
                this.props.name === "default" && <Route path="*" component={defaultThemeComponent}/>
            }
        </div>;
    }
}

themeProvider.propTypes = {
    name: PropTypes.string,
};

export default themeProvider;
