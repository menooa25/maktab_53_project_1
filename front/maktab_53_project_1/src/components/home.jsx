// todo: mr. gachpazha create me!
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { posts: null, tags: null, categories: null, tag: "", category: "" };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 d-flex">
            <label htmlFor="" className="w-25 d-block">
              Filter by
            </label>
            <select
              onChange={this.handleOnChange}
              className="form-control w-50"
              name="tag"
            >
              {this.state.tags &&
                this.state.tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              <option value="">All Tags</option>
            </select>
            <select
              className="form-control w-50 ml-1"
              name="category"
              onChange={this.handleOnChange}
            >
              {this.state.categories &&
                this.state.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              <option value="">All Categories</option>
            </select>
          </div>
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
    if (e.target.name === "tag") {
      this.setState({ tag: e.target.value });
      this.state.tag = e.target.value;
    } else {
      this.setState({ category: e.target.value });
      this.state.category = e.target.value;
    }
    this.fetchData(this.state.tag, this.state.category);
  };
  componentDidMount() {
    this.fillCategoryList();
    this.fetchData("");
  }
  fillCategoryList = () => {
    fetch("http://127.0.0.1:5000/category")
      .then((res) => res.json())
      .then((res) => this.setState({ categories: res.categories }));
  };
  fetchData = (tag_name, category_name = "") => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    fetch("http://127.0.0.1:5000/getposts", {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify({ tag: tag_name, category: category_name }),
    })
      .then((res) => res.json())
      .then((res) => this.setState(res));
    fetch("http://127.0.0.1:5000/tags")
      .then((res) => res.json())
      .then((res) => this.setState(res));
  };
}

export default Home;
