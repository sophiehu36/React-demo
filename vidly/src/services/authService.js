import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

export async function login(data) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email: data.username,
        password: data.password,
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    //删除token
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage[tokenKey];
        return jwtDecode(jwt);
    } catch (ex) {
        //返回null，表明没有登录的用户
        return null;
    }
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
};
