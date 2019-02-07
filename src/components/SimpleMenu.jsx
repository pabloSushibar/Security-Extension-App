import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <Link to="/">Counter</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/yeet">Theme Changer</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/yaught">Color Changer</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/yote">Posting APIs</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/hello">Questionaire</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/login">Login Screen</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
