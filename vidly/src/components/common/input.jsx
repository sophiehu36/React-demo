import React from "react";

const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                name={name}
                //把input变成controlled component，没有自己的state
                // value={value}
                // onChange={onChange}
                // type={type}
                //用{...rest} 替代 value, onChange 和 type
                {...rest}
                //autoFocus自动加焦点
                autoFocus
                // 设置ref属性，与this.name关联
                // 就可以在其他地方访问到这个标签的value了
                // ref={this.username}
                className="form-control"
                id={name}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
