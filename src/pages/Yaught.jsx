import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Yaught extends Component {
  state = { Color: "", isLoading: false };

  //static, cannot be changed dynamically.
  styles = {
    display: {
      fontSize: 100,
      display: "flex",
      justifyContent: "center",
      width: "100%"
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%"
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div style={this.styles.display}>
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>
          <h1 style={{ ...this.styles.display, color: this.state.Color }}>
            Changing Color
          </h1>
        </div>
        <div style={this.styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={this.getColor}>
            Change Color
          </Button>
        </div>
      </React.Fragment>
    );
  }

  getColor = () => {
    //This will run the loading circle.
    this.setState({ isLoading: true });
    fetch("http://www.colr.org/json/color/random")
      .then(result => result.json()) //takes the result and changes it into JSON format
      .then(data =>
        this.setState({ Color: "#" + data.new_color, isLoading: false })
      );
  };
}

export default Yaught;
