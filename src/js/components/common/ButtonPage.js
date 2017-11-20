/**
 * Created by Zed on 2017/8/24.
 */
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {FontIcon} from "material-ui";

const styles = {
    submitBtn: {
        position: "absolute",
        left: "50%",
        bottom: "80px",
        marginLeft: "-120px",
        width: "240px",
        height: "50px",
        borderRadius: "50px",
        overflow: "hidden"
    }
};

class ButtonPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<section style={Object.assign({}, {
            width: "100%"
        }, this.props.style)}>
            <header>
                {this.props.headerDom || (<div>
                    <img
                        style={Object.assign({}, {
                            display: "block",
                            margin: "130px auto 0",
                            width: "100px"
                        }, this.props.imgStyle)}
                        src={this.props.src}
                        alt=""/>
                    <div style={Object.assign({}, {
                        marginTop: "8px",
                        textAlign: "center",
                        color: "#ff8632",
                        fontSize: "18px"
                    }, this.props.contentStyle)}>{this.props.content}</div>
                </div>)}
            </header>

            {!this.props.hideButton && (<RaisedButton
                icon={this.props.icon}
                disabled={this.props.disabled}
                backgroundColor="#ff6832"
                disabledBackgroundColor="#ccc"
                label={this.props.buttonLabel}
                style={Object.assign({}, styles.submitBtn, this.props.raisedButtonStyles)}
                buttonStyle={this.props.buttonStyles}
                labelStyle={Object.assign({}, {
                    lineHeight: "50px",
                    fontSize: "18px",
                    color: "#fff"
                }, this.props.buttonLabelStyles)}
                onClick={this.props.touchTap}/>)}
        </section>);
    }
}

export default ButtonPage;
