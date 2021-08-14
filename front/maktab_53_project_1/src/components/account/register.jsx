import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <>
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <form
              action="http://127.0.0.1:5000/register_user"
              method="POST"
              enctype="multipart/form-data"
            >
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="first_name"
                  className="form-control"
                  placeholder="First name"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="last_name"
                  className="form-control"
                  placeholder="Last name"
                  type="text"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-envelope"></i>{" "}
                  </span>
                </div>
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-phone"></i>{" "}
                  </span>
                </div>
                <input
                  name="phone"
                  className="form-control"
                  placeholder="Phone number"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-image"></i>{" "}
                  </span>
                </div>
                <input name="image" className="form-control" type="file" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  name="password"
                  className="form-control"
                  placeholder="Create password"
                  type="password"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Repeat password"
                  type="password"
                />
              </div>

              <div className="form-group">
                <button
                  onClick={(e) => this.handelOnSubmit(e)}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  {" "}
                  Create Account
                </button>
              </div>

              <p className="text-center">
                Have an account? <Link to="/login">Log In</Link>
              </p>
            </form>
          </article>
        </div>
      </>
    );
  }
}

export default Register;
