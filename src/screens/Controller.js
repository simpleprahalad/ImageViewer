import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/Login';

class Controller extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={props => <Login {...props} /> } />
                    <Route path='/home' render={props => <Home {...props} /> } />
                </div>
            </Router>
        )
    }
}

export default Controller;