import React, { Component } from "react";
import { Button } from "reactstrap";

class CreatePost extends Component {
  state = { tags: [], modal_show: false };
  handleAddCustomTag = () => {
    const customTag = this.customTag.current.value;
    if (customTag) {
      this.state.tags.push(customTag);
      this.setState({ tags: this.state.tags });
    }
  };
  fillTagsList = () => {
    fetch("http://127.0.0.1:5000/tags")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ tags: res.tags });
      });
  };
  getSelectedTags = () => {
    const tags_container = document.getElementById("tags");
    const checkboxs = tags_container.children;
    let checked_checkbox = "";
    for (let checkbox of checkboxs) {
      let pure_checkbox = checkbox.children[0];
      if (pure_checkbox.checked) {
        // if (pure_checkbox.id = checkbox[-1],)
        checked_checkbox += pure_checkbox.id + ",";
      }
    }
    return checked_checkbox;
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    const selected_tags = this.getSelectedTags();
    let myHeader = new Headers();
    const token = "Bearer " + sessionStorage.getItem("token");
    myHeader.append("Authorization", token);
    let form = new FormData(e.target);
    form.set("tags", selected_tags);
    fetch("http://127.0.0.1:5000/post", {
      headers: myHeader,
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((res) => alert(res.msg));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <form
              encType="multipart/form-data"
              onSubmit={this.handleOnSubmit}
              className="mt-3"
            >
              <div className="form-group">
                <label htmlFor="title">Post title</label>
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Post title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Post description</label>
                <input
                  className="form-control"
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Post description"
                  required
                />
              </div>
              <div className="form-group">
                <label>Select the tag(s)</label>
                <div id="tags">
                  {this.state.tags &&
                    this.state.tags.map((tag) => (
                      // <option key={tag} value={tag}>
                      //   {tag}
                      // </option>
                      <div key={tag} className="form-control my-1">
                        <input className="mr-2" type="checkbox" id={tag} />
                        <label htmlFor={tag}>{tag}</label>
                      </div>
                    ))}
                </div>
                <div className="my-2">
                  <Button
                    className="btn btn-warning btn-sm"
                    type="button"
                    onClick={this.handleAddCustomTag}
                  >
                    Add custom tag
                  </Button>
                  <input
                    type="text"
                    ref={this.customTag}
                    className="form-control d-inline"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Post image</label>
                <label htmlFor="image" className="form-control">
                  Post image
                </label>
                <input
                  className="d-none"
                  id="image"
                  name="image"
                  type="file"
                  placeholder="Post image"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                CreatePost
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fillTagsList();
    this.customTag = React.createRef();
  }
}

export default CreatePost;
