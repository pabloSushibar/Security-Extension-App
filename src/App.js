import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Counter from "./components/Counter";
import Navbar from "./components/NavBar";
import Yeet from "./pages/Yeet";
import Yaught from "./pages/Yaught";
import Yote from "./pages/Yote";
import Hello from "./pages/Hello";
import LoginScreen from "./pages/LoginScreen";

class App extends Component {
  style = {
    overallContainer: {
      display: "flex",
      width: "100vw",
      height: "100vh",
      flexDirection: "column"
    }
  };
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container" style={this.style.overallContainer}>
            <Navbar />
            <Route path="/" exact component={Counter} />
            <Route path="/yeet" exact component={Yeet} />
            <Route path="/yaught" exact component={Yaught} />
            <Route path="/yote" exact component={Yote} />
            <Route path="/hello" exact component={Hello} />
            <Route path="/login" exact component={LoginScreen} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return {
        count: state.count + 1
      };
    case "SUBTRACT":
      return {
        count: state.count - 1
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
}
//creating the store.
const store = createStore(reducer);

export default App;
