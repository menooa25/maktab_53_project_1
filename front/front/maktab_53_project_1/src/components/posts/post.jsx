import React, { Component } from "react";

class Post extends Component {
  state = { posts: null, heart_class: "fa-heart-o", likes: 0 };

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.posts !== null && (
            <div className="col-12">
              <img
                className="img-fluid rounded"
                src={`data:image/png;base64,${this.state.posts.image}`}
                alt=""
              />
              <div className="d-flex justify-content-end">
                <i
                  onClick={() => this.onLike(this.state.posts.id)}
                  className={
                    "text-danger fa fa-2x cursor_pointer " +
                    this.state.heart_class
                  }
                >
                  #{this.state.likes}
                </i>
              </div>
              <hr />
              <h1>{this.state.posts.title}</h1>
              <p>{this.state.posts.description}</p>

              {this.state.posts.comments.length !== 0 && (
                <>
                  <hr /> <h4>Comments</h4>
                </>
              )}
              {this.state.posts.comments.map((comment, index) => (
                <p className="bg-light rounded p-2" key={index}>
                  {comment}
                </p>
              ))}
              <hr />
              <form onSubmit={this.onSubmitComment}>
                <div className="form-group">
                  <input
                    type="text"
                    name="id"
                    value={this.state.posts.id}
                    hidden
                    readOnly
                  />
                  <label htmlFor="comment">Your Comment</label>
                  <textarea
                    className="form-control"
                    name="comment"
                    id="comment"
                  />
                  <button type="submit" className="mt-2 btn btn-primary">
                    Send Comment
                  </button>
                </div>
              </form>
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
      .then((res) => {
        this.setState({ posts: res.posts[0], likes: res.posts[0].likes });
      });
  };

  updateLikeStatus = (res) => {
    if (res.msg === "liked") {
      this.setState({ heart_class: "fa-heart", likes: this.state.likes + 1 });
    } else if (res.msg === "disliked") {
      this.setState({ heart_class: "fa-heart-o", likes: this.state.likes - 1 });
    }
  };

  onLike(id) {
    const myHeader = new Headers();
    let token = "Bearer " + sessionStorage.getItem("token");
    myHeader.append("Authorization", token);
    myHeader.append("Content-Type", "application/json");
    fetch("http://127.0.0.1:5000/like", {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => this.updateLikeStatus(res));
  }

  onSubmitComment(e) {
    e.preventDefault();
    const myHeader = new Headers();
    let token = "Bearer " + sessionStorage.getItem("token");
    myHeader.append("Authorization", token);
    const form = new FormData(e.target);
    fetch("http://127.0.0.1:5000/comment", {
      method: "POST",
      headers: myHeader,
      body: form,
    }).then(alert("Thanks for comment <3"));
  }
}

export default Post;