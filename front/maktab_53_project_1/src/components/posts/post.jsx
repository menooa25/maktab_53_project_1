import React, { Component } from "react";

class Post extends Component {
  state = { posts: null };
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.posts !== null && (
            <div className="col-12">
              <img
                className="img-fluid rounded"
                src={`data:image/png;base64,${this.state.posts[0].image}`}
                alt=""
              />
              <h1>{this.state.posts[0].title}</h1>
              <p>{this.state.posts[0].description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  fetchData = (id) => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    fetch("http://127.0.0.1:5000/getposts", {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => this.setState(res));
  };
}

export default Post;
