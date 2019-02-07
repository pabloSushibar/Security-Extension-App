import React, { Component } from "react";
import Button from "@material-ui/core/Button";

// let req = new XMLHttpRequest();
// req.open("GET", document.location, false);
// req.send(null);
// var headers = req.getAllResponseHeaders().toLowerCase();
// alert(headers);

class Yote extends Component {
  state = { status: "", title: "", body: "", userId: "" };

  render() {
    return (
      <React.Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              UserId:
              <input
                type="text"
                value={this.state.userId}
                onChange={this.handleChange("userId")}
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleChange("title")}
              />
            </label>
            <label>
              Body:
              <input
                type="text"
                value={this.state.body}
                onChange={this.handleChange("body")}
              />
            </label>
          </form>
          <div>UserId Entered: {this.state.userId}</div>
          <div>Title Entered: {this.state.title}</div>
          <div>Body: {this.state.body}</div>
        </div>
        <div>
          <h1>{this.state.status}</h1>
          <Button variant="contained" onClick={this.posting}>
            Click me to Post
          </Button>
        </div>
      </React.Fragment>
    );
  }

  posting = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        this.setState({ status: response.status });
        return response.json();
      })
      .then(json => console.log(json));
  };

  //Methods to handle each user input.
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
}
export default Yote;
