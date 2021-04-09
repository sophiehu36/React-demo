import React, { Component } from "react";
import MovieTables from "./movieTables";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
        selectedGenre: {},
    };

    componentDidMount() {
        //组件加载完毕时加载电影和类别列表
        //手动添加genres列表第一项为：All Genres
        const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleGenreSelect = (genre) => {
        //为了避免切换选择genre时，页面没有切换过来
        //切换genre的同时，把页面切换到第一页
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleDelete = (movie) => {
        //用一个新变量保存movies，去掉点击的这个movie
        const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies: newMovies });
    };

    handleLike = (movie) => {
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

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            movies: allMovies,
            pageSize,
            currentPage,
            selectedGenre,
            sortColumn,
        } = this.state;

        const filtered =
            //因为没有给all genres设置id属性，所以还要判断id是否同时为true
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
                : allMovies;

        //关键的一步，_.orderBy()方法实现排序
        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            currentPage,
            selectedGenre,
            sortColumn,
            genres,
        } = this.state;

        if (count === 0) return <h1>There are no movies in the database!</h1>;

        const { totalCount, data: movies } = this.getPagedData();

        return (
            //快速创建：zen coding
            //table.table>thead>tr>th*4
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database.</p>
                    <MovieTables
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
