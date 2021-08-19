import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Link className="btn btn-warning m-2" to="profile_info">
            ProfileInfo
          </Link>
          <Link className="btn btn-primary m-2" to="create_post">
            CreatePost
          </Link>
          <Link className="btn btn-primary m-2" to="edit_post">
            EditPost(s)
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
