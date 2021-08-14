import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="row flex-row justify-content-between p-3">
          <div className="navbar">
            <Link className="nav-link" to="/register">
              Register
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </div>
          <div className=""></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
