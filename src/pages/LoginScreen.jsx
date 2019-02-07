import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { List, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Autorenew";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import UploadIcon from "@material-ui/icons/CloudUpload";

//question needs to be of TYPE: IQuestion.
class LoginScreen extends Component {
  state = {
    questionList: [],
    questionArray: [{ question: "", answers: ["", ""], id: 0 }],
    listOfJobDTO: [{ title: "", description: "" }]
  };

  componentWillMount() {
    this.getQuestionList();
  }

  getQuestionList = () => {
    //this.setState({ isLoading: true });
    fetch(
      `https://serko-ado-security-test.azurewebsites.net/user/questions/getList`
    )
      .then(result => result.json()) //takes the result and changes it into JSON format
      .then(data => {
        this.setState({
          questionList: data
        });
        console.log(this.state.questionList);
      })
      //Catches the error and logs it in the console.
      .catch(error => {
        console.log(error);
      });
  };

  addQuestion = () => {
    this.setState(
      prevState => ({
        questionArray: [
          ...prevState.questionArray,
          {
            question: "",
            answers: ["", ""],
            id: this.state.questionArray.length
          }
        ]
      }),
      () => {
        console.log("Question Added.");
        console.log(this.state.questionArray);
      }
    );
  };

  addAnswer = index => {
    this.setState(
      prevState => ({
        questionArray: prevState.questionArray.map(question => {
          if (question.id === index) {
            return { ...question, answers: [...question.answers, ""] };
          }
          return question;
        })
      }),
      () => {
        console.log(this.state.questionArray);
      }
    );
  };

  addJob = () => {
    this.setState(
      prevState => ({
        listOfJobDTO: [
          ...prevState.listOfJobDTO,
          {
            title: "",
            description: ""
          }
        ]
      }),
      () => {
        console.log("Job Added.");
        console.log(this.state.listOfJobDTO);
      }
    );
  };

  removeJob = () => {
    console.log("yeet");
    let oldArray = [...this.state.listOfJobDTO];
    let lengthOfArray = this.state.listOfJobDTO.length;
    if (lengthOfArray !== -1) {
      let newArray = oldArray.slice(0, lengthOfArray - 1);
      this.setState({ listOfJobDTO: newArray }, () => {
        console.log(this.state.listOfJobDTO);
      });
    }
  };

  removeQuestion = () => {
    let oldArray = [...this.state.questionArray];
    let lengthOfArray = this.state.questionArray.length;
    console.log(`length of questionArray: ${lengthOfArray}`);
    if (lengthOfArray !== -1) {
      let newArray = oldArray.slice(0, lengthOfArray - 1);
      this.setState({ questionArray: newArray }, () => {
        console.log(this.state.questionArray);
      });
    }
  };

  removeAnswer = index => {
    this.setState(
      prevState => ({
        questionArray: prevState.questionArray.map(question => {
          if (question.id === index) {
            //copies old array
            let oldAnswersArray = [...question.answers];
            let lengthOfArray = oldAnswersArray.length;
            if (lengthOfArray !== -1) {
              let newAnswerArray = oldAnswersArray.slice(0, lengthOfArray - 1);
              return {
                ...question,
                answers: newAnswerArray
              };
            }
          }
          return question;
        })
      }),
      () => {
        console.log(this.state.questionArray);
      }
    );
  };

  handleChangeQuestion = (id, question) => {
    const newQuestiondata = this.state.questionArray.map(
      questionArrayElement => {
        if (questionArrayElement.id === id) {
          console.log(question);
          //Goes into the questionArray element and spreads the element, then changeds the value of it.
          return { ...questionArrayElement, question };
        }
        //if the index is not the same, then just return the whole element.
        return questionArrayElement;
      }
    );
    console.log(newQuestiondata);
    this.setState({ questionArray: newQuestiondata });
  };

  handleChangeAnswer = (questionId, answerIndex, userAnswer) => {
    const newAnswerdata = this.state.questionArray.map(
      (questionArrayElement, index) => {
        if (index === questionId) {
          console.log(userAnswer);
          //Goes into the questionArray element and spreads the element, then changeds the value of it.
          return {
            ...questionArrayElement,
            answers: questionArrayElement.answers.map(
              (currentAnswer, currentAnswerIndex) => {
                if (currentAnswerIndex === answerIndex) {
                  return userAnswer;
                } else {
                  return currentAnswer;
                }
              }
            )
          };
        }
        //if the index is not the same, then just return the whole element.
        return questionArrayElement;
      }
    );
    console.log(newAnswerdata);
    this.setState({ questionArray: newAnswerdata });
  };

  handleChangeJob = (jobIndex, userInput, isTitle) => {
    const newJobData = this.state.listOfJobDTO.map((jobArrayElement, index) => {
      if (index === jobIndex) {
        console.log(userInput);
        if (isTitle) {
          return {
            ...jobArrayElement,
            title: userInput
          };
        } else {
          return { ...jobArrayElement, description: userInput };
        }
      }
      return jobArrayElement;
    });
    console.log(newJobData);
    this.setState({ listOfJobDTO: newJobData });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  //maps the questionArray obj to the questionRequestDTOList.
  answerMapper = () => {
    let newQuestionRequestDTOList = {
      questionRequestDTOList: this.state.questionArray.map(
        questionArrayElement => {
          return {
            questionText: questionArrayElement.question,
            answerOptions: questionArrayElement.answers.map(
              (answerArrayElement, answerElementIndex) => {
                return {
                  answerOptionText: answerArrayElement,
                  optionOrderPosition: answerElementIndex.toString()
                };
              }
            )
          };
        }
      )
    };
    console.log(newQuestionRequestDTOList);
    return newQuestionRequestDTOList;
  };

  createQuestionsAndAnswers = async DTOList => {
    await fetch(
      "https://serko-ado-security-test.azurewebsites.net/user/questions/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(DTOList)
      }
    ).catch(error => {
      console.log(error);
    });
    //Debugging
    console.log(DTOList);
  };

  createJobs = async listOfJobDTO => {
    await fetch(
      "https://serko-ado-security-test.azurewebsites.net/user/jobs/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ listOfJobDTO })
      }
    ).catch(error => {
      console.log(error);
    });
    console.log(listOfJobDTO);
  };

  postAnswerClick = async () => {
    await this.createQuestionsAndAnswers(await this.answerMapper());
    await this.resetQuestionForm();
    this.getQuestionList();
  };

  resetQuestionForm = () => {
    this.setState(
      {
        questionArray: [
          {
            question: "",
            answers: ["", ""],
            id: 0
          }
        ]
      },
      () => {
        console.log(this.state.questionArray);
      }
    );
  };

  resetJobForm = () => {
    this.setState(
      {
        listOfJobDTO: [
          {
            title: "",
            description: ""
          }
        ]
      },
      () => {
        console.log(this.state.listOfJobDTO);
      }
    );
  };
  // postJobList = () => {
  //   this.createJobs(this.state.listOfJobDTO);
  // };

  style = {
    overallContainer: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "stretch"
    },
    creationContainer: {
      flex: "auto",
      overflowY: "scroll"
    },
    viewContainer: {
      flex: "auto",
      overflowY: "scroll"
    },
    questionPaperContainer: {
      margin: "1em"
    },
    questionWrapper: {
      padding: "1em"
    },
    questionBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-evenly",
      paddingTop: "0.5em"
    },
    buttonWrapperBottom: {
      display: "flex",
      justifyContent: "space-evenly",
      paddingBottom: "0.5em"
    },
    buttonWrapperMiddle: {
      display: "flex",
      justifyContent: "space-evenly",
      paddingBottom: "0.2em"
    },
    answer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    answerFromQuestionList: {
      paddingLeft: "1em",
      paddingTop: "0.3em"
    }
  };

  render() {
    return (
      <div style={this.style.overallContainer}>
        <div style={this.style.creationContainer}>
          <div style={this.style.buttonWrapper}>
            <Button
              onClick={this.resetQuestionForm}
              variant="contained"
              color="secondary"
            >
              Reset form
            </Button>
            <Button
              onClick={() => {
                this.addQuestion();
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              <AddIcon />
              Add question
            </Button>
            <Button
              onClick={this.removeQuestion}
              variant="contained"
              color="secondary"
              size="small"
            >
              <SubtractIcon />
              Remove question
            </Button>
          </div>
          {this.state.questionArray.map((val, idx) => {
            return (
              <div style={this.style.questionPaperContainer}>
                <Paper key={idx} elevation={4}>
                  <div style={this.style.questionWrapper}>
                    <div style={this.style.questionBox}>
                      <TextField
                        label={`Question #${idx + 1}`}
                        onChange={e =>
                          this.handleChangeQuestion(idx, e.target.value)
                        }
                        margin="dense"
                        variant="outlined"
                        value={val.question}
                      />
                    </div>
                    {val.answers.map((answer, answerArrayIndex) => {
                      return (
                        <div key={answerArrayIndex} style={this.style.answer}>
                          <TextField
                            label={`Answer #${answerArrayIndex + 1}`}
                            value={answer}
                            onChange={e =>
                              this.handleChangeAnswer(
                                idx,
                                answerArrayIndex,
                                e.target.value
                              )
                            }
                            margin="dense"
                            variant="outlined"
                          />
                        </div>
                      );
                    })}
                    <div style={this.style.buttonWrapper}>
                      <Button
                        onClick={() => {
                          this.addAnswer(idx);
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        <AddIcon />
                        Answer
                      </Button>
                      <Button
                        onClick={() => {
                          this.removeAnswer(idx);
                        }}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        <SubtractIcon />
                        Answer
                      </Button>
                    </div>
                  </div>
                </Paper>
              </div>
            );
          })}
          <div style={this.style.buttonWrapperMiddle}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.postAnswerClick}
              size="small"
            >
              Post Question List
              <UploadIcon />
            </Button>
          </div>
          <div style={this.style.buttonWrapper}>
            <Button
              onClick={this.resetJobForm}
              variant="contained"
              color="secondary"
            >
              Reset Job Form
            </Button>
            <Button
              onClick={this.addJob}
              variant="contained"
              color="primary"
              size="small"
            >
              <AddIcon />
              Add Job
            </Button>
            <Button
              onClick={this.removeJob}
              variant="contained"
              color="secondary"
              size="small"
            >
              <SubtractIcon />
              Remove job
            </Button>
          </div>
          {this.state.listOfJobDTO.map((jobElement, jobElementIndex) => {
            return (
              <div style={this.style.questionPaperContainer}>
                <Paper key={jobElementIndex} elevation={4}>
                  <div style={this.style.questionWrapper}>
                    <div style={this.style.questionBox}>
                      <TextField
                        label={`Job Title #${jobElementIndex + 1}`}
                        value={jobElement.title}
                        onChange={e =>
                          this.handleChangeJob(
                            jobElementIndex,
                            e.target.value,
                            true
                          )
                        }
                        margin="dense"
                        variant="outlined"
                      />
                    </div>
                    <div style={this.style.answer}>
                      <TextField
                        label={`Job Description #${jobElementIndex + 1}`}
                        value={jobElement.description}
                        onChange={e =>
                          this.handleChangeJob(
                            jobElementIndex,
                            e.target.value,
                            false
                          )
                        }
                        margin="dense"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </Paper>
              </div>
            );
          })}
          <div style={this.style.buttonWrapperBottom}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.createJobs(this.state.listOfJobDTO);
              }}
            >
              Post Job List <UploadIcon />
            </Button>
          </div>
        </div>
        <div style={this.style.viewContainer}>
          <div style={this.style.buttonWrapper}>
            <Button
              onClick={this.getQuestionList}
              variant="contained"
              color="primary"
            >
              Refresh Question List <RefreshIcon />
            </Button>
          </div>
          <List>
            {this.state.questionList.map(question => {
              let id = question.questionId + ") ";
              let questionText = question.questionText;
              let primaryText = id + questionText;
              return (
                <ListItem key={question.questionId} alignItems="flex-start">
                  <ListItemText
                    primary={primaryText}
                    secondary={
                      <React.Fragment>
                        {question.answerOptions.map((answer, answerIdx) => {
                          return (
                            <div style={this.style.answerFromQuestionList}>
                              <Typography
                                key={answer.answerOptionId}
                                component="span"
                              >
                                {answerIdx + 1}) {answer.answerOptionText}
                              </Typography>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
