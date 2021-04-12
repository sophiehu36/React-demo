import React, { Component } from "react";

class Logout extends Component {
    componentDidMount() {
        //删除token
        localStorage.removeItem("token");
        //强制刷新页面
        window.location = "/";
    }
    render() {
        return null;
    }
}

export default Logout;
