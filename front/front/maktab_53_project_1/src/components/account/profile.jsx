import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to="login" />;
    }
    return (
      <div className="container">
        {this.state && (
          <div className="row">
            <div className="col-6 mx-auto d-flex flex-column justify-content-center">
              <img
                src=""
                id="profile_image"
                className="m-4 mx-auto profile_image"
                alt=""
              />

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
                  readOnly
                  value={this.state.username}
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
                  value={this.state.first_name}
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
                  value={this.state.last_name}
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
                  value={this.state.email}
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
                  value={this.state.phone}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    let token = `Bearer ${sessionStorage.getItem("token")}`;
    const myheader = new Headers();
    myheader.append("Authorization", token);
    fetch("http://127.0.0.1:5000/login_user", {
      method: "GET",
      headers: myheader,
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState(res);
        document.getElementById(
          "profile_image"
        ).src = `data:image/png;base64,${res.image}`;
      });
  }
}

export default Profile;