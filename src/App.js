import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { token: localStorage.getItem('token') };
  }
  render() {

    return (
      <Router>
        <div>
          {this.state.token != null ? (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <a className="navbar-brand" href="/sign-in">Tech Track Challenge</a>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Sign up</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                  </li>
                </ul>
              </div>
            </nav>
          ) : (
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                  <a className="navbar-brand" href="/sign-in">Teck Track Challenge</a>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="/login">Sign in</a>
                    </li>
                  </ul>
                </div>
              </nav>
            )}

          <div className="auth-wrapper">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}
