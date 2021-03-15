import React, { Component } from "react";
import "./Login.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameRequired: "dispNone",
      loginPassword: "",
      loginPasswordRequired: "dispNone",
      incorrectCredentials: "dispNone",
    };
  }

  // function for handing the username entered by user
  inputUserNameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  // function for handing the password entered by user
  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  // function to handle login feature when user presses "LOGIN" button
  loginClickHandler = () => {
    // Login Credentials
    let username = "prahalad",
      password = "1",
      accessToken =
        "IGQVJXQktVUmd4V2pGSHNnTTZAId0V5dTVYenQ4aG5LaVJ4N2RhaWtDX1ktRC1mTVh3UHAya2NucnVmVC1wZAVNBdjRtTmdoMEJNcWU0NE5wUXVlZAGNOUWtTekc0UWZAQYXp1cFM0b0hjazRBYkxPNUR1ZA0RWdjN6b1MxRzdN";

    // handling the "required" field for username
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });

    // handling the "required" field for passowrd
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    // removing the default text to be displayed when user gives incorrect login credentials
    this.setState({ incorrectCredentials: "dispNone" });

    if (
      this.state.username === username &&
      this.state.loginPassword === password
    ) {
      // when username and password matches correctly, storing the access token in session storage
      sessionStorage.setItem("access-token", accessToken);

      // launching home page
      this.props.history.push("/home");
    } else {
      // Displaying the incrrect login id/passwd when user gives incorrect login credentials
      if (this.state.username !== "" && this.state.loginPassword !== "") {
        this.setState({ incorrectCredentials: "dispBlock" });
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="card-container">
          <Card>
            <div className="card-content">
              <Typography variant="h5" component="h2">
                LOGIN
              </Typography>

              <br />

              <FormControl required>
                <InputLabel htmlFor="username"> Username </InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUserNameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>

              <br />
              <br />

              <FormControl required>
                <InputLabel htmlFor="Password"> Password </InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <br />
                <FormHelperText className={this.state.incorrectCredentials}>
                  <span className="red">
                    Incorrect username and/or password
                  </span>
                </FormHelperText>
              </FormControl>

              <br />
              <br />

              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
