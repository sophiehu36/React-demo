import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
//import { saveMovie } from "../services/fakeMovieService";
//import { deleteMovie } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
    };

    handleDelete = (movie) => {
        //用一个新变量保存movies，去掉点击的这个movie
        const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies: newMovies });
    };

    handleLike = (movie) => {
        // console.log("click like");
        // console.log(movie)
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        //console.log(page);
        this.setState({ currentPage: page });
    };

    render() {
        const { length: count } = this.state.movies;
        const { movies: allMovies, pageSize, currentPage } = this.state;
        if (count === 0) return <h1>There are no movies in the database!</h1>;
        const movies = paginate(allMovies, currentPage, pageSize);

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
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onLikeClick={() =>
                                            this.handleLike(movie)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </>
        );
    }
}

export default Movies;
