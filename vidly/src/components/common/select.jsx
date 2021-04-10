import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div>
                <select
                    name={name}
                    id={name}
                    {...rest}
                    className="form-control"
                >
                    <option value="" />
                    {/* options是一个数组 eg:this.state.genres */}
                    {options.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
