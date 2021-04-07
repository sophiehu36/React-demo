import React, { Component } from "react";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import Like from "./common/Like";

class MovieTables extends Component {
    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "Like",
            content: (movie) => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            ),
        },
        {
            key: "Delete",
            content: (movie) => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            ),
        },
    ];
    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <table className="table">
                <TableHead
                    onSort={onSort}
                    sortColumn={sortColumn}
                    columns={this.columns}
                />
                <TableBody data={movies} columns={this.columns} />
            </table>
        );
    }
}

export default MovieTables;
