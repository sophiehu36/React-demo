import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name"),
    };

    doSubmit = () => {
        console.log("Registered");
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                {/* 每个form都有一个默认的onSubmit属性 */}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );

        // return (
        //     <form>
        //         <h1>Register</h1>
        //         <div className="mb-3">
        //             <label htmlFor="InputUsername2" className="form-label">
        //                 Username
        //             </label>
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 id="InputUsername2"
        //                 aria-describedby="UsernameHelp"
        //             />
        //             <div id="usernameHelpBlock" className="form-text p-2}">
        //                 "Username" must be a valid email
        //             </div>
        //         </div>
        //         <div className="mb-3">
        //             <label htmlFor="InputPassword2" className="form-label">
        //                 Password
        //             </label>
        //             <input
        //                 type="password"
        //                 className="form-control"
        //                 id="InputPassword2"
        //             />
        //             <div id="passwordHelpBlock" className="form-text p-2}">
        //                 "Password" length must be at least 5 charactors long
        //             </div>
        //         </div>
        //         <div className="mb-3">
        //             <label htmlFor="InputName1" className="form-label">
        //                 Name
        //             </label>
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 id="InputName1"
        //                 aria-describedby="NameHelp"
        //             />
        //         </div>
        //         <button type="submit" className="btn btn-primary ml-3">
        //             Register
        //         </button>
        //     </form>
        // );
    }
}

export default RegisterForm;
