<<<<<<< HEAD
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);


      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
  };

  console.log(props)
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin} ref={form} >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }}/>
        </form>
      </div>
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {addDoc, onSnapshot } from "@firebase/firestore";
// import { loginRef } from "../firebase/firebase";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const inputUsernameHandler = (e) => {
    setInputUsername(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(inputUsername, inputPassword);

    // addDoc(loginRef, {
    //   username: inputUsername,
    //   password: inputPassword
    // });
    setInputUsername("");
    setInputPassword("");
  };

  // useEffect(() => {
  //   onSnapshot(loginRef, (snapshot) => {
  //     let users = []
  //     snapshot.docs.forEach((doc) => {
  //       users.push({ ...doc.data(), id:doc.id })
  //     })
  //     setUserInfo(users)
  //   });
  // }, []);
 
  return (
    <div>
      <h1>Login</h1>
      <form className="login-form">
        <input
          type="text"
          className="login-id"
          placeholder="Email"
          onChange={inputUsernameHandler}
          value={inputUsername}
        />
        <input
          type="password"
          className="login-password"
          placeholder="Password"
          onChange={inputPasswordHandler}
          value={inputPassword}
        />
        <button className="login-button btn btn-success" onClick={loginSubmitHandler}>
          Sign in
        </button>
      </form>
      <Link to="/register">
        <p >Create an account</p>
      </Link>
      <Link to="/recover">
        <p>Forgot password?</p>
      </Link>
      {/* {userInfo && userInfo.map((user) => (
        <div  key={user.id}>
        <h1> { user.username }</h1>
        </div>
      ))} */}
>>>>>>> 16e78242146003b2ff38a3d70a102b669acf84d6
    </div>
  );
};

export default Login;
