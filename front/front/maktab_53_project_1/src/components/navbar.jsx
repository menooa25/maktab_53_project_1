import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="container">
          <div className="row flex-row justify-content-between p-3">
            <div className="navbar">
              <Link className="nav-link" to="/">
                Home
              </Link>
              {!sessionStorage.getItem("token") && (
                <>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </>
              )}
              {sessionStorage.getItem("token") && (
                <>
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </>
              )}
            </div>
            <div className="navbar">
              <Link className="text-decoration-none text-dark" to="/">
                <h3>WebsiteName</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;