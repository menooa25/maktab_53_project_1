import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = { redirect: false };
  handelOnSubmit = (e) => {
    e.preventDefault();
    const current_form = e.target;
    const username = current_form.username.value;
    const password = current_form.password.value;
    let form = new FormData();
    form.set("username", username);
    form.set("password", password);
    const url = "http://127.0.0.1:5000/login_user";
    fetch(url, { method: "POST", body: form })
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("token", res["access token"]);
        this.setState({ redirect: true });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Login Account</h4>
            <form onSubmit={this.handelOnSubmit}>
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
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Login Account
                </button>
              </div>
            </form>
          </article>
        </div>
      </>
    );
  }
}

export default Login;
