import React, { Component } from "react";
import EditPost from "./editPost";

class EditPosts extends Component {
  state = { post: null };

  render() {
    return (
      <div className="container">
        {this.state.post &&
          this.state.post.map((post) => (
            <EditPost
              key={post.id}
              post={post}
              onDelete={this.handleOnDelete}
            />
          ))}
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
  handleOnDelete = (id, title) => {
    if (window.confirm(`are you sure you want to delete < ${title} >`)) {
      const token = "Bearer " + sessionStorage.getItem("token");
      const myHeader = new Headers();
      myHeader.append("Authorization", token);
      myHeader.append("Content-Type", "application/json");
      fetch("http://127.0.0.1:5000/post", {
        headers: myHeader,
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then((res) => alert(res.msg))
        .then(() => {
          const remains_posts = this.state.post.filter(
            (post) => post.id !== id
          );
          this.setState({ post: remains_posts });
        });
    }
  };
}

export default EditPosts;