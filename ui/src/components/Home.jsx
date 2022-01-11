import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import AuthService from "../services/auth.service";

const socket = io("localhost:3000");

const Home = () => {
  const currentUser = AuthService.getCurrentUser();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const username = currentUser.username;

  const handleClick = (e) => {
    e.preventDefault();
    //send msg to socket
    socket.emit("sendPrivateMessage", {username, message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setChat([...chat, data]);
    });
  
  }, [chat]);

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
        <button onClick={handleClick}>send</button>
      </form>
      {chat.map((data, index) => {
        return <h3 key={message.id}>{data.username}: {data.message}</h3>;
      })}
    </div>
  );
};

export default Home;
