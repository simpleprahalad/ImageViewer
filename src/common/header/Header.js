import React, { Component } from "react";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";

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
    this.state = {
      type: "",
    };
  }

  //function to change the state of the search box to filter the posts according to their caption
  inputChangeHandler = (e) => {
    let newList = this.props.list.filter((post) => {
      return String(post.caption).toLowerCase().indexOf(e.target.value) >= 0;
    });
    this.props.callbackFromHome(newList);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <header className="app-header">
          <span
            className="logo"
            style={this.props.home === "true" ? { cursor: "pointer" } : null}
          >
            Image Viewer
          </span>
          <div>
            {this.props.home === "true" ? (
              <div className="pro-pic">
                <IconButton className="icon">
                  <img
                    src={this.props.profilePic}
                    alt="pic"
                    className="profile-image"
                  ></img>
                </IconButton>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {this.props.home === "true" ? (
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
            ) : (
              ""
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
