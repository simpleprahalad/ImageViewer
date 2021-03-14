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

  inputUserNameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    let username = "prahalad",
      password = "1",
      accessToken = "IGQVJYUHJ1elhkX2dCSmlFLS1zUmNza0ppcDZAnblFtT3BXQXhVS2pZAUHl3bWFjd0YxRXdvZAXctUUNzNnRtRFA4d2ZAzY2VnWmlqRFp3azhqN1VXRHFqUWVybGlYTlhobTRoNEZAtZAi1mblB6V0poU1EzTG14a0tRZAFZAGWFA0";

    this.setState({ incorrectCredentials: "dispNone" });
    if (
      this.state.username === username &&
      this.state.loginPassword === password
    ) {
      window.sessionStorage.setItem("access-token", accessToken);
      this.props.history.push("/home");
    } else {
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
