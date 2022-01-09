import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, account, description, password) => {
    return axios.post(API_URL + "signup", {
        username,
        account,
        description,
        password,
    });
};

const login = (account, password) => {
    return axios
        .post(API_URL + "login", {
            account,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};