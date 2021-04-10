import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };
    //验证整个表单
    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        //console.log(errors);
        return errors;

        // console.log("result", result);
        // const errors = {};
        // const { data } = this.state;
        // if (data.username.trim() === "")
        //     errors.username = "Username is required.";
        // if (data.password.trim() === "")
        //     errors.password = "Password is required.";
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    //在输入时验证单个表单
    validateProperty = ({ name, value }) => {
        //因为name的值会变，所以用[]动态添加
        const obj = { [name]: value };
        //获取单个值，验证单个表单
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        //返回一个message
        return error ? error.details[0].message : null;
        // if (name === "username") {
        //     if (value.trim() === "") return "Username is required.";
        //     //...
        // }
        // if (name === "password") {
        //     if (value.trim() === "") return "Password is required.";
        //     //...
        // }
    };
    handleSubmit = (e) => {
        // 阻止默认事件
        e.preventDefault();
        //call the server
        //获取到属性ref为username的标签的当前值
        // const username = this.username.current.value;
        // const password = this.password.current.value;
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };

    renderButton = (label) => {
        return (
            <button
                disabled={this.validate()}
                type="submit"
                className="btn btn-primary"
            >
                {label}
            </button>
        );
    };

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                type={type}
                error={errors[name]}
            />
        );
    };

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;
        
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };
}

export default Form;
