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

        //call the API 
        //then after that set the values after getting the response 
        this.state.accountName = "hello";
        this.state.accountNumber = "hello";
        this.state.availableBal = "hello";
        if(this.state.linked == false) {
            this.state.linked = "No";
        } else {
            this.state.linked = "Yes";
        }
       

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

                        <form>
                            <h3>Account Details</h3>
                            <Row>
                                <Col>
                                    {success !== null &&
                                        <div className="alert alert-success">
                                            {success}
                                        </div>}

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {failure !== null &&
                                        <div className="alert alert-danger">
                                            {failure}
                                        </div>
                                    }
                                </Col>
                            </Row>

                            <Row>

                                <Col>
                                    <div className="form-group">
                                        <label>Account Name</label>
                                        <input type="text" name="accountName" value={accountName} onChange={this.changeHandler} className="form-control" disabled />

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Account Number</label>
                                        <input type="text" name="accountNumber" value={accountNumber} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Available Balance </label>
                                        <input type="text" name="availableBal" value={availableBal} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Linked</label>
                                        <input type="text" name="linked" value={linked} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                            </Row>
                        </form>
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
