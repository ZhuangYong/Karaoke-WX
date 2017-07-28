import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import variables from '../../../../sass/common/variables.scss';

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

    componentDidMount() {
        // 微信header只显示一个返回按钮，进入页面修改title
        if (HYAPP.devinfo.isWeixin) {
            document.title = this.props.title;
        }
    }

    render() {
        // 如果是微信，header只显示为一个返回按钮
        if (HYAPP.devinfo.isWeixin) {
            return (
                <div className="header-back-btn" onClick={this.props.back}></div>
            );
        }
        return (
            <div>
                {/* <div className="header ft46">
                 <span className="back-btn" onClick={this.props.back}>返回</span>
                 <p className="title">{this.props.title}</p>
                 <span className="more-options"></span>
                 </div>*/}
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
