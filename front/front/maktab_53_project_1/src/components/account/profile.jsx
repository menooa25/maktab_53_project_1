import React, { Component } from "react";

class Profile extends Component {
  getProfileData = (recived_token) => {
    let token =
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyODg1Mzk5NywianRpIjoiZWI5MTBmMDctOGQ5ZC00ZGE3LTg2N2UtNWM0ODY1ZGVlMWQzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYxMTViODc5YmVjYjAxZTljYmZiNjA3MCIsIm5iZiI6MTYyODg1Mzk5NywiZXhwIjoxNjI4ODU0ODk3fQ.R9BIEQsRfjCSckn4ZKXg3f6g9u-2uCaIUZqBMicbq2A";
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
  };
  render() {
    return (
      <div className="container">
        <button onClick={this.getProfileData} className="btn btn-primary">
          GetUserData
        </button>
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
  // componentDidMount() {
  //   const axios = require("axios").default;
  //   axios({
  //     method: "GET",
  //     url: "http://127.0.0.1:5000/login_user",
  //     headers: {
  //       Authorization:
  //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyODgwMjkyMSwianRpIjoiODVjOTQ3ZmMtNmY3NC00MjI1LWJhODgtOTZmMzc0OWE2MzhhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYxMTRmYWU5ZTEzNGNlODg5MmUzNzQ3YSIsIm5iZiI6MTYyODgwMjkyMSwiZXhwIjoxNjI4ODAzODIxfQ.YlSEUYlhUJjmjGxTniVTz0UCZ44uN0yx28aRwkn9ry8",
  //     },
  //   }).then((res) => console.log(res));
  // }
}

export default Profile;