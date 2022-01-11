import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const register = (username, account, description, password) => {
  return axios.post(API_URL + "/api/auth/signup", {
    username,
    account,
    description,
    password,
  });
};

const login = (account, password) => {
  return axios
    .post(API_URL + "/api/auth/login", {
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
