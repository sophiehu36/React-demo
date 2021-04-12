import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;

export function login(data) {
    return http.post(apiEndpoint, {
        email: data.username,
        password: data.password,
    });
}
