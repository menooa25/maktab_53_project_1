// todo: mr. gachpazha create me!
import React, { Component } from "react";
import { findByDisplayValue } from "@testing-library/react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { posts: null, tags: null };
  render() {
    return (
      <div className="container">
        <div className="row">
          
        </div>
        <div className="row">
          {this.state.posts !== null &&
            this.state.posts.map(
              (post) =>
                post.is_active && (
                  <div key={post.id} className="col-3 p-2">
                    <Link to={`post/${post.id}`}>
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
                    </Link>
                  </div>
                )
            )}
        </div>
      </div>
    );
  }
  handleOnChange = (e) => {
    this.fetchData(e.target.value);
  };
  componentDidMount() {
    this.fetchData("");
  }
  fetchData = (tag_name) => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    fetch("http://127.0.0.1:5000/getposts", {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify({ tag: tag_name }),
    })
      .then((res) => res.json())
      .then((res) => this.setState(res));
    fetch("http://127.0.0.1:5000/tags")
      .then((res) => res.json())
      .then((res) => this.setState(res));
  };
}

export default Home;