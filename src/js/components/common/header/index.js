import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import variables from "../../../../sass/common/variables.scss";

const styles = {
    title: {
        width: "100%",
        display: "inline-block",
        textAlign: "center"
    }
};
// 通用头部组件，包含标题和一个返回按钮
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar
                    style={{height: variables.barBaseHeight}}
                    titleStyle={{height: variables.barBaseHeight, lineHeight: variables.barBaseHeight}}
                    iconElementLeft = {<span/>}
                    iconElementRight = {<span/>}
                    title={<span style={styles.title}> {this.props.title} </span>}
                />
            </div>

        );
    }
}

Header.propTypes = {
    back: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Header;
