import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import { Provider } from "react-redux";
// import { createStore } from "redux";

class Counter extends Component {
  // constructor(props) {
  //   super(props);
  // }

  //state = { count: 0 };

  //Something like CSS.
  styles = {
    display: {
      fontSize: 100,
      color: "default",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%"
    },

    buttonStyle: {
      flex: "auto",
      margin: "0.5em"
    }
  };

  //{this.state.count === 10 ? "Ryan Shaw Sucks" : this.state.count}
  render() {
    return (
      <React.Fragment>
        <div>
          <h1 style={this.styles.display}>{this.props.count}</h1>
        </div>
        <div style={this.styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.increment}
            style={this.styles.buttonStyle}
          >
            Increment Me
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.decrement}
            style={this.styles.buttonStyle}
          >
            Decrement Me
          </Button>
          <Button
            variant="outlined"
            color="default"
            onClick={this.reset}
            style={this.styles.buttonStyle}
          >
            Reset Me
          </Button>
        </div>
      </React.Fragment>
    );
  }

  /* METHODS */
  increment = () => {
    // this.setState({
    //   count: this.state.count + 1
    // });
    this.props.dispatch({ type: "ADD" });
  };

  decrement = () => {
    // this.setState({ count: this.state.count - 1 });
    this.props.dispatch({ type: "SUBTRACT" });
  };

  reset = () => {
    // this.setState({ count: 0 });
    this.props.dispatch({ type: "RESET" });
  };
}

//This takes the state and changes it into a prop that the connect method can map to others.
const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(Counter);
