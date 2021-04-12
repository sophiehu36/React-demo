import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = `${apiUrl}/genres`
// export const genres = http.get(config.apiEndpoint);
//     { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//     { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
//     { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
// ];

export function getGenres() {
    return http.get(apiEndpoint);
}
