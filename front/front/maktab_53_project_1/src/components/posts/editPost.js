import React, { Component } from "react";

class EditPost extends Component {
  state = { title: "", description: "", id: "-1", is_active: false };

  render() {
    return (
      <div className="row">
        <div className="col-5 mx-auto my-3">
          <form onSubmit={this.handleOnSubmit}>
            <input
              type="text"
              name="id"
              readOnly={true}
              value={this.state.id}
              hidden
            />
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                onChange={this.titleOnChange}
                type="text"
                name="title"
                className="form-control"
                id="title"
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripton">Description</label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.descriptionOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="is_active">IsActive</label>
              <input
                name="is_active"
                type="checkbox"
                id="is_active"
                checked={this.state.is_active}
                className="ml-2"
                onChange={this.is_activeOnChange}
              />
            </div>

            <button type="submit" className=" btn btn-primary">
              Update
            </button>
            <button
              type="button"
              onClick={() =>
                this.props.onDelete(this.state.id, this.state.title)
              }
              className="btn btn-danger ml-1"
            >
              Delete
            </button>
          </form>
          <hr />
        </div>
      </div>
    );
  }

  titleOnChange = (e) => {
    this.setState({ title: e.value });
  };
  descriptionOnChange = (e) => {
    this.setState({ description: e.value });
  };
  is_activeOnChange = (e) => {
    this.setState({ is_active: e.value });
  };

  componentDidMount() {
    this.setState(this.props.post);
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const myHeader = new Headers();
    const token = "Bearer " + sessionStorage.getItem("token");
    if (form.get("is_active")) form.set("is_active", 1);
    else form.set("is_active", 0);
    myHeader.append("Authorization", token);
    fetch("http://127.0.0.1:5000/post", {
      method: "PUT",
      headers: myHeader,
      body: form,
    }).then(alert(form.get("title") + " updated"));
  };
}

export default EditPost;