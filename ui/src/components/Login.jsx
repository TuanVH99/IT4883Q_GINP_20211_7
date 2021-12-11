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
    </div>
  );
};

export default Login;
