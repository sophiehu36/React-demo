import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
    //设置一个reference，用来获取某个标签的value
    //尽量少用ref
    // username = React.createRef();
    // password = React.createRef();
    //控件的state不能为null或undefined，所以这里初始化为""
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };
    //组件加载完毕后，给输入框加上焦点
    //或者在标签的props上加一个autoFocus
    // componentDidMount() {
    //     this.username.current.focus();
    // }

    doSubmit = () => {
        console.log("Submitted");
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                {/* 每个form都有一个默认的onSubmit属性 */}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
