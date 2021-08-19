import React, { Component } from "react";
import EditPost from "./editPost";

class EditPosts extends Component {
  state = { post: null };

  render() {
    return (
      <div className="container">
        {this.state.post &&
          this.state.post.map((post) => <EditPost key={post.id} post={post} />)}
      </div>
    );
  }

  componentDidMount() {
    const token = "Bearer " + sessionStorage.getItem("token");
    let myHeader = new Headers();
    myHeader.append("Authorization", token);
    fetch("http://127.0.0.1:5000/post", { method: "PATCH", headers: myHeader })
      .then((res) => res.json())
      .then((res) => this.setState({ post: res.post }));
  }
}

export default EditPosts;
