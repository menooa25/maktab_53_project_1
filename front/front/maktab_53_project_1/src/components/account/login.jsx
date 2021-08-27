import React, { Component } from "react";

class Login extends Component {
  handelOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  render() {
    return (
      <>
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Login Account</h4>
            <form action="http://127.0.0.1:5000/login_user" method="POST">
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