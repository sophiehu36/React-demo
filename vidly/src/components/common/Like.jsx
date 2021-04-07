import React from "react";
import PropTypes from "prop-types";

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
            onClick={props.onLike}
            style={{ cursor: "pointer" }}
            className={classes}
        ></i>
    );
};

Like.propTypes = {
    liked: PropTypes.bool.isRequired,
    onLike: PropTypes.func.isRequired,
};

export default Like;
