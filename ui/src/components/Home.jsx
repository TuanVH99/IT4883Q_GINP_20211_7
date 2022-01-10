import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("localhost:3000");

const Home = () => {
  const [message, setMessage] = useState("");

  const handleClick = (e) => {
      e.preventDefault();
      console.log(message)
      setMessage("")
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome</h3>
      </header>
      <form>
      <input
      placeholder="type something"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={handleClick} >send</button>
      </form>
    </div>
  );
};

export default Home;
