import React from "react";
import RaiseButton from "material-ui/RaisedButton";

import "../../../sass/login/index.scss";
import Input from "../../components/common/Input";
import BaseComponent from "../../components/common/BaseComponent";
import Form from "../../components/common/Form";

class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    render() {
        return (
            <div className="login-from">
                <Form validate={true}>
                    <Input
                        minLength={4}
                        maxLength={10}
                        fullWidth={true}
                        floatingLabelText="账号"
                        validate="account"
                        defaultValue={this.state.userName}
                        errorText="用户名必须是由字母开头,字母、数字、下划线组成"
                        bindState={this.bindState("userName")}/>
                    <Input
                        type="password"
                        minLength={3}
                        maxLength={20}
                        fullWidth={true}
                        floatingLabelText="密碼"
                        defaultValue={this.state.password}
                        bindState={this.bindState("password")}/>
                    <RaiseButton
                        type="submit"
                        primary={true}
                        label="登录"
                        className="login-bth"
                        fullWidth={true}
                        onClick={this.handelSubmit.bind(this)}/>
                </Form>
            </div>
        );
    }

    handelSubmit() {

    }
}

export default Login;
