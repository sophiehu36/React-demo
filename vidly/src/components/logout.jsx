import React, { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
    componentDidMount() {
        auth.logout();
        //强制刷新页面
        window.location = "/";
    }
    render() {
        return null;
    }
}

export default Logout;
