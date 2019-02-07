import React, { Component } from "react";
import SimpleCard from "../components/SimpleCard";

const questions = [
  "Would you like to defer this questionaire?",
  "Q1",
  "Q2",
  "Q3",
  "Testing Question",
  "Y E E T"
];

class Hello extends Component {
  state = {
    question: "",
    questionIndex: 0,
    color: ""
  };

  styles = {
    CardContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      padding: 20
    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.styles.CardContainer}>
          <SimpleCard
            question={questions[this.state.questionIndex]}
            onSubmit={this.getQuestion}
            color={this.state.Color}
          />
        </div>
      </React.Fragment>
    );
  }

  onClick = answer => {
    this.getQuestion();
    this.onQuestionSubmit(answer);
  };

  getColor = () => {
    fetch("http://www.colr.org/json/color/random")
      .then(result => result.json()) //takes the result and changes it into JSON format
      .then(data => this.setState({ color: "#" + data.new_color }));
  };

  onQuestionSubmit = answer => {
    if (answer === "yes") {
      this.setState({ questionIndex: this.state.questionIndex + 1 });
    } else {
      this.setState({ questionIndex: this.state.questionIndex - 1 });
    }
  };
}

export default Hello;
