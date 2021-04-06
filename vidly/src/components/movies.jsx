import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
//import { saveMovie } from "../services/fakeMovieService";
//import { deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = (movie) => {
        //用一个新变量保存movies，去掉点击的这个movie
        const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies: newMovies });
    };

    renderTables() {
        let movies = this.state.movies;
        return (
            <tbody>
                {movies.map((movie) => {
                    return (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button
                                    onClick={() => this.handleDelete(movie)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }

    render() {
        const { length: count } = this.state.movies;
        if (count === 0) return <h1>There are no movies in the database!</h1>;
        return (
            //快速创建：zen coding
            //table.table>thead>tr>th*4
            <>
                <h1>Showing {count} movies in the database.</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.renderTables()}
                </table>
            </>
        );
    }
}

export default Movies;
