import React, { Component } from "react";
import MovieTables from "./movieTables";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/search";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
        selectedGenre: {},
        searchQuery: "",
    };

    componentDidMount() {
        //组件加载完毕时加载电影和类别列表
        //手动添加genres列表第一项为：All Genres
        const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

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

    handleGenreSelect = (genre) => {
        //为了避免切换选择genre时，页面没有切换过来
        //切换genre的同时，把页面切换到第一页
        this.setState({
            selectedGenre: genre,
            searchQuery: "",
            currentPage: 1,
        });
        // this.setState({ movies: getMovies(), searchQuery: "" });
    };

    handleSearch = (query) => {
        // this.setState({ selectedGenre: {} });
        // //console.log(input.value.toUpperCase())
        // const searchQuery = input.value.toUpperCase();
        // const movies = [...this.state.movies].filter((m) =>
        //     m.title.toUpperCase().includes(searchQuery)
        // );
        // console.log(movies);
        // this.setState({ movies, searchQuery });
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1,
        });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            searchQuery,
            sortColumn,
            movies: allMovies,
        } = this.state;

        //设置筛选初始值为原movie数据
        let filtered = allMovies;

        //判断是否有搜索值，如果有的话，返回筛选后的值
        if (searchQuery)
            filtered = allMovies.filter((m) =>
                //如果没有匹配的项，就会返回一个空数组
                m.title.toUpperCase().includes(searchQuery.toUpperCase())
            );
        //因为没有给all genres设置id属性，所以还要判断id是否同时为true
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(
                (m) => m.genre._id === selectedGenre._id
            );

        //关键的一步，_.orderBy()方法实现排序
        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        //对筛选后的项分页显示
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
            searchQuery,
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
                    <Link className="btn btn-primary mb-2" to="/movies/new">
                        New Movie
                    </Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox
                        onChange={this.handleSearch}
                        value={searchQuery}
                    />
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
