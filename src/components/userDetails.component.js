import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";


//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            nric: '',
            gender: '',
            age: '',
            phoneNumber: '',
            email: '',
            address: '',
            failure: null,
            success: null,
        };

        this.changeHandler = this.changeHandler.bind(this);

        //call the API 

        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        };

        axios
            .post('http://backend-env.eba-g7hdkdd4.ap-southeast-1.elasticbeanstalk.com/user',
                config
            )
            .then(response => {
                console.log("response " + response.data);
                // this.setState({ success: response.data });

            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
                // this.setState({ failure: error.message });
            });
        //then after that set the values after getting the response 
        // this.state.firstName = "hello";
        // this.state.lastName = "hello";
        // this.state.nric = "hello";
        // this.state.gender = "hello";
        // this.state.age = 22;
        // this.state.phoneNumber = "hello";
        // this.state.email = "hello";
        // this.state.address = "hello";

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { firstName, lastName, nric, gender, age, phoneNumber, email, address, failure, success } = this.state;


        return (
            <Router>
                <div>
                    <div className="validationAuth-Inner">

                        <form>
                            <h3>User Details</h3>
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
                                        <label>First name</label>
                                        <input type="text" name="firstName" value={firstName} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" value={lastName} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                            </Row>

                            <Row>

                                <Col>
                                    <div className="form-group">
                                        <label>NRIC</label>
                                        <input type="text" name="nric" value={nric} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <input type="text" name="gender" value={gender} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input type="number" name="age" value={age} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" name="phoneNumber" value={phoneNumber} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={email} onChange={this.changeHandler} className="form-control" disabled/>

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" name="address" value={address} onChange={this.changeHandler} className="form-control" disabled/>

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
    <UserDetails />,
    document.getElementById('root')
);
