import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/movies`;

function movieUrl(id) {
    return `${apiEndpoint}/${id}`
}

export function getMovies() {
    return http.get(apiEndpoint);
}

export function deleteMovies(movieId) {
    return http.delete(movieUrl(movieId));
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id) {
        //因为put的url里已经有id了，movie里面重复出现id服务器会有问题
        //用新变量body拷贝movie
        const body = { ...movie };
        //删除body中的_id
        delete body._id;
        //把删掉了id的内容发送到服务器
        return http.put(movieUrl(movie._id), body);
    }
    return http.post(apiEndpoint, movie);
}

// const movies = [
//     {
//         _id: "5b21ca3eeb7f6fbccd471815",
//         title: "Terminator",
//         genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//         numberInStock: 6,
//         dailyRentalRate: 2.5,
//         publishDate: "2018-01-03T19:04:28.809Z",
//         liked: false,
//     },
// ];

// export function saveMovie(movie) {
    //     const { data: movies } = await getMovies();
    //     const { data: genres } = await getGenres();
    //     let movieInDb = movies.find((m) => m._id === movie._id) || {};
    //     movieInDb.title = movie.title;
    //     movieInDb.genre = genres.find((g) => g._id === movie.genreId);
    //     movieInDb.numberInStock = movie.numberInStock;
    //     movieInDb.dailyRentalRate = movie.dailyRentalRate;
    
    //     //新建的movie没有id，需要设置一个
    //     if (!movieInDb._id) {
        //         //id是一个string，所以要用toString()转换数据类型
        //         movieInDb._id = Date.now().toString();
        //         // movies.push(movieInDb);
        //         console.log(movieInDb)
        //         await http.post(apiEndpoint, movieInDb);
        //     } else {
            //         console.log(movieInDb)
            //     }
            
            //     return movieInDb;
            // }
