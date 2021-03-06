import "./App.css";
import React, { Component, useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder{" "}
        </Link>{" "}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home{" "}
            </Link>{" "}
          </li>

          {/* {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )} */}

          {/* {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )} */}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User{" "}
              </Link>{" "}
            </li>
          )}{" "}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {" "}
                {currentUser.username}{" "}
              </Link>{" "}
            </li>{" "}
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut{" "}
              </a>{" "}
            </li>{" "}
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login{" "}
              </Link>{" "}
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up{" "}
              </Link>{" "}
            </li>{" "}
          </div>
        )}{" "}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path={"/"} element={<Home />}>
            {" "}
          </Route>{" "}
          <Route path={"/home"} element={<Home />}>
            {" "}
          </Route>{" "}
          <Route exact path="/login" element={<Login />}>
            {" "}
          </Route>{" "}
          <Route exact path="/register" element={<Register />}>
            {" "}
          </Route>{" "}
          <Route exact path="/profile" element={<Profile />}>
            {" "}
          </Route>{" "}
        </Routes>{" "}
      </div>{" "}
    </div>
  );
};

export default App;
