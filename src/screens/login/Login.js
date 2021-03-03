import React, { Component } from 'react';
import "./Login.css";
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone"
        }
    }
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
                        <Input id="username" type="text" username={this.state.username} />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl required>
                        <InputLabel htmlFor="Password"> Password </InputLabel>
                        <Input id="password" type="password" password={this.state.loginPassword}/>
                    </FormControl>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </div>
                </Card>
                </div>
            </div>
        )
    }
}

export default Login;