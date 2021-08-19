import React, { Component } from "react";
import { findByDisplayValue } from "@testing-library/react";

class Home extends Component {
  state = { posts: null };
  render() {
    return (
      <div className="container">
        <div className="row"></div>
        <div className="row">
          {this.state.posts !== null &&
            this.state.posts.map(
              (post) =>
                post.is_active && (
                  <div key={post.id} className="col-3 p-2">
                    <div className="card" style={{ height: "25vh" }}>
                      <div className="card-header">
                        <img
                          src={`data:image/png;base64,${post.image}`}
                          className="card-img post_image"
                          alt=""
                        />
                      </div>
                      <div
                        className="card-body overflow-hidden"
                        style={{ textOverflow: "ellipsis" }}
                      >
                        <h5 className="text-center">{post.title}</h5>
                        <p>{post.description}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    );
  }
  componentDidMount() {
    fetch("http://127.0.0.1:5000/post")
      .then((res) => res.json())
      .then((res) => this.setState({ posts: res.posts }));
  }
}

export default Home;
