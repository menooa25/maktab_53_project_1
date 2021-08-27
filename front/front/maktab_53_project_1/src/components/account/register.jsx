import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  state = { error: null };
  handleOnRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    fetch("http://127.0.0.1:5000/register_user", {
      method: "POST",
      body: form,
    }).then((res) => {
      if (res.status >= 400) {
        this.setState({ error: "This username already exists !" });
      } else {
        window.location = "/login";
      }
    });
  };
  render() {
    return (
      <>
        <div className="card ">
          <article className="card-body mx-auto">
            {this.state.error && (
              <div id="alert" className="alert alert-danger">
                {this.state.error}
                <button
                  type="button"
                  className="ml-2 close"
                  onClick={() => {
                    document.getElementById("alert").hidden = true;
                    this.setState({ error: null });
                  }}
                >
                  <span>&times;</span>
                </button>
              </div>
            )}
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <form
              encType="multipart/form-data"
              onSubmit={this.handleOnRegister}
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
                <label
                  htmlFor="upload_image"
                  className="text-muted form-control cursor_pointer"
                >
                  Your image
                </label>
                <input
                  id="upload_image"
                  name="image"
                  className="d-none"
                  type="file"
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
                  // name="password2"
                  className="form-control"
                  placeholder="Repeat password"
                  type="password"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
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