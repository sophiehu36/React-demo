import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {},
    };

    schema = {
        //因为设置new movie没有id，所以_id没有设置required()
        _id: Joi.string(),
        //这里的label是用来显示error的
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            //读取路由中的id参数
            const movieId = this.props.match.params.id;
            //如果id是new，说明是新建页面，就不读取数据了，return
            if (movieId === "new") return;
            //否则就读取对应id的movie
            const { data: movie } = await getMovie(movieId);
            //console.log("movie", movie);
            //mapToViewModel方法传入从服务器获得的movie对象，映射为表单使用的对象
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }

        //如果movieId不存在，movie的值就是undefined
        //利用history替换页面为not-found，此处必须return，不然后面的代码还会执行
        // if (!movie) return this.props.history.replace("/not-found");
    }

    async componentDidMount() {
        //组件加载完毕时加载类别列表
        await this.populateGenres();
        await this.populateMovie();
    }

    //返回一个object，提取movie里面的一些键值对
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }

    doSubmit = async () => {
        // const { data: movies } = await getMovies();
        //保存movie数据
        await saveMovie(this.state.data);
        console.log("Saved");
        this.props.history.push("/movies");
    };

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                {/* 每个form都有一个默认的onSubmit属性 */}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
                {/* <button
                    className="btn btn-primary"
                    onClick={() => {
                        history.push("/movies");
                    }}
                >
                    Save
                </button> */}
            </div>
        );
    }
}

export default MovieForm;
