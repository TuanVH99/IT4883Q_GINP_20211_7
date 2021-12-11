import "./App.css";
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/tutorials" className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item-left">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </div>

        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/*" element={<TutorialsList />} />
            <Route path="/tutorials//" element={<TutorialsList />} />
            <Route path="/add/*" element={<AddTutorial />} />
            <Route path="/tutorials/:id" element={<Tutorial />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
