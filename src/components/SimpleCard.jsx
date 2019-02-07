import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import pic from "C:/Users/RyanL/Documents/PabloSushibar/security-extension-app/src/components/serkoSign.PNG";

//let formData = { task: "6", questionId: "4", answer: "YEET4" };
const questions = [
  "Would you like to defer this questionaire?",
  "Q1",
  "Q2",
  "Q3",
  "Testing Question",
  "Y E E T"
];

class SimpleCard extends Component {
  props = { question: "", onSubmit: () => {}, color: "" };

  state = {
    clickedYes: false,
    clickedNo: false,
    value: "",
    question: "",
    isLoading: false
  };

  styles = {
    card: {
      minWidth: 300,
      maxWidth: 500
    },
    title: {
      fontSize: 14
    },
    pos: {
      alignItems: "center"
    },
    image: {
      width: 55,
      padding: 10
    },
    centerContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }
  };

  onSubmitClick = () => {
    this.props.onSubmit(this.state.value);
  };

  componentWillMount() {
    this.setState({ question: questions[0] });
  }

  render() {
    return (
      <Card style={{ ...this.styles.card, backgroundColor: this.props.color }}>
        <div style={this.styles.centerContainer}>
          <CardMedia
            component="img"
            height="55"
            image={pic}
            style={this.styles.image}
          />
        </div>
        <CardContent>
          <div style={this.styles.centerContainer}>
            <Typography color="default">
              <h1>Security Questionaire</h1>
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Typography>
            {this.state.isLoading ? "Loading..." : this.state.question}
          </Typography>
        </CardActions>
        <CardActions>
          <FormControl>
            <FormLabel>Answer</FormLabel>
            <RadioGroup
              value={this.state.value}
              onChange={this.handleChangeRadioButton}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <Typography>
                {this.state.value === "yes" ? "Clicked ^" : "Not Clicked ^"}
              </Typography>
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <Typography>
                {this.state.value === "no" ? "Clicked ^" : "Not Clicked ^"}
              </Typography>
            </RadioGroup>
          </FormControl>
        </CardActions>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getQuestion}
          >
            Get Question
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.postQuestion}
          >
            Post Answer
          </Button>
        </CardActions>
      </Card>
    );
  }

  getQuestion = () => {
    this.setState({ isLoading: true });
    fetch(
      "https://serko-ado-security-test.azurewebsites.net/user/questions/get"
    )
      .then(result => result.json()) //takes the result and changes it into JSON format
      .then(data => {
        console.log(data);
        this.setState({
          question: data[0].questionText,
          isLoading: false
        });
      });
  };

  //posting function.
  //Body has been hardcoded for now.
  postQuestion = () => {
    fetch(
      "https://serko-ado-security-test.azurewebsites.net/user/questions/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          questionText: "CAM IS DAD",
          answerOptions: [
            {
              answerOptionText: this.state.value,
              nextQuestionId: "199669"
            }
          ]
        })
      }
    );
  };

  //Body has been hardcoded for now.
  postAnswers = () => {
    fetch("https://serko-ado-security-test.azurewebsites.net/user/answers", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        taskId: "6",
        questionId: "4",
        answerText: "YEET4"
      })
    });
  };

  handleChangeRadioButton = event => {
    this.setState({ value: event.target.value });
  };
}

export default SimpleCard;
