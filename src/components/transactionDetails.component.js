import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";


//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


export default class AccountDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountName: '',
            accountNumber: '',
            availableBal: '',
            linked: false,
            failure: null,
            success: null,
        };

        this.changeHandler = this.changeHandler.bind(this);

    

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { accountName, accountNumber, availableBal, linked, failure, success } = this.state;

        return (
            <Router>
                <div>
                    <div className="validationAuth-Inner">

                    </div>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <AccountDetails />,
    document.getElementById('root')
);
