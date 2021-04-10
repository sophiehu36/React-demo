import React, { Component } from "react";

class NewMovieForm extends Component {
    render() {
        return (
            <form>
                <h1>Movie Form</h1>
                <div className="mb-3">
                    <label htmlFor="InputTitle1" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputTitle1"
                        aria-describedby="TitleHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="SelectGenre" className="form-label">
                        Genre
                    </label>
                    <div>
                        <select
                            id="SelectGenre"
                            className="form-select"
                            aria-label="Default select "
                        >
                            <option selected></option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputNumberInStock1" className="form-label">
                        Number In Stock
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputNumberInStock1"
                    />
                    {/* <div id="NumberInStockHelpBlock" className="form-text p-2}">
                        "NumberInStock" length must be at least 5 charactors long
                    </div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="InputRate1" className="form-label">
                        Rate
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputRate1"
                    />
                    {/* <div id="NumberInStockHelpBlock" className="form-text p-2}">
                        "NumberInStock" length must be at least 5 charactors long
                    </div> */}
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        );
    }
}

export default NewMovieForm;
