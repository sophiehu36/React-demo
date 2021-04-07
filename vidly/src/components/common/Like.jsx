import React, { Component } from "react";

//Input: liked: boolean
//Output: onClick

//!!function里面不能用this.props
const Like = (props) => {
    let classes = "fa fa-heart";
    //判断this.props.liked是否为false
    //如果是false说明是空心，使用空心样式
    //如果不是false说明不是空心，使用实心样式
    if (!props.liked) classes += "-o";
    return (
        <i
            onClick={props.onLikeClick}
            style={{ cursor: "pointer" }}
            className={classes}
        ></i>
    );
};

export default Like;
