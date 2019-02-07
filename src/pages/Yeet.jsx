import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import { theme1, theme2 } from "../themes/themes";

class Yeet extends Component {
  state = { toggled: false };
  render() {
    if (this.state.toggled) {
      return (
        <MuiThemeProvider theme={theme1}>
          <React.Fragment>
            <Switch colour="default" onChange={this.handleChange} />
            <h1 id="label">True</h1>
          </React.Fragment>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme2}>
          <React.Fragment>
            <Switch colour="default" onChange={this.handleChange} />
            <h1 id="label">False</h1>
          </React.Fragment>
        </MuiThemeProvider>
      );
    }
  }

  handleChange = () => {
    this.setState({ toggled: !this.state.toggled });
  };
}

export default Yeet;
