import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import UserDetails from "./components/userDetails.component";
import AccountDetails from "./components/accountDetails.component";
import AddTransaction from "./components/addTransaction.component";
import UpdateAccBal from "./components/updateAccBal.component";
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { token: localStorage.getItem('token') };
  }

  logout() {
    axios
      .post('http://localhost:4000/logout', {

      })
      .then(response => {

      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
    localStorage.removeItem('token');

  }
  render() {

    return (
      <Router>
        <div>
          {this.state.token != null ? (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <a className="navbar-brand" href="/login">TechTrek Challenge</a>
                <ul className="navbar-nav ml-auto">
                  <NavDropdown title="Actions" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/updateAccBal">Update Account Balance</NavDropdown.Item>
                    <NavDropdown.Item href="/accountDetails">Add Transaction</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Details" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/userDetails">User Details</NavDropdown.Item>
                    <NavDropdown.Item href="/accountDetails">Account Details</NavDropdown.Item>
                    <NavDropdown.Item href="/transactionDetails">Transaction Details</NavDropdown.Item>
                  </NavDropdown>

                  <li className="nav-item">
                    <a className="nav-link" href="/login">Logout</a>
                  </li>
                </ul>
              </div>
            </nav>
          ) : (
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                  <a className="navbar-brand" href="/login">TeckTrek Challenge</a>

                </div>
              </nav>
            )}

          <div className="auth-wrapper">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/userDetails" component={UserDetails} />
              <Route path="/accountDetails" component={AccountDetails} />
              <Route path="/addTransaction" component={AddTransaction} />
              <Route path="/updateAccBal" component={UpdateAccBal} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}
