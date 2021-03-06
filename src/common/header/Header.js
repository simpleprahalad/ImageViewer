import React, { Component } from "react";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "#c0c0c0",
    marginRight: theme.spacing(10),
    marginLeft: 0,
    width: "300px",
    float: "right",
    marginTop: "18px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
});

class Header extends Component {
  constructor() {
    super();
  }

  inputChangeHandler = (e) => {
    console.log("INPUT CHANGE HANDLER !!!!");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <header className="app-header">
          <span className="logo">Image Viewer</span>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Input
              disableUnderline={true}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={this.inputChangeHandler}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(Header);