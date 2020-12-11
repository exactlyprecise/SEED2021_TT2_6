import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";
import * as moment from 'moment' // for the date 

const INITIAL_STATE = {
    payeeID: '',
    amount: '',
    expensesCat: '',
    eGift: '',
    message: '',
    failure: null,
    success: null,
};


//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


export default class AddTransaction extends Component {

    constructor(props) {
        super(props);

        //Binding methods 
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ...INITIAL_STATE,
            token: '',
        };
    }

    //Setting form values
    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    //submitting of the form 
    onSubmit = (e) => {
        e.preventDefault();

        const { payeeID, amount, expensesCat, eGift, message } = this.state;

        let formData = new FormData();
        let currentDate = moment().format('DD/MM/YYYY HH:mm:ss'); // npm install moment --save

        formData.append("payeeID", payeeID);
        formData.append("dateTime", currentDate);
        formData.append("amount", amount);
        formData.append("expensesCat", expensesCat);
        formData.append("eGift", eGift);
        formData.append("message", message);

        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        };

        axios
            .post('http://backend-env.eba-g7hdkdd4.ap-southeast-1.elasticbeanstalk.com/transfer',
                formData,
                config
            )
            .then(response => {
                console.log("response " + response.data);
                this.setState({ success: response.data });

            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
                this.setState({ failure: error.message });
            });

    }

    render() {

        const { payeeID, amount, expensesCat, eGift, message, failure, success } = this.state;


        const isInvalid =
            payeeID === '' ||
            amount === '' ||
            expensesCat === '' ||
            eGift === '' ||
            message === '';


        return (
            <Router>
                <div>
                    <div className="validationAuth-Inner">

                        <form onSubmit={this.onSubmit}>
                            <h3>Add Transaction</h3>
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
                                        <label>Payee ID</label>
                                        <input type="number" name="payeeID" value={payeeID} onChange={this.changeHandler} className="form-control" placeholder="eg. 23" />

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" name="amount" value={amount} onChange={this.changeHandler} className="form-control" placeholder="eg. 50 " />

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Expenses Category</label>
                                        <input type="text" name="expensesCat" value={expensesCat} onChange={this.changeHandler} className="form-control" placeholder="eg. Personal " />

                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label>E Gift</label>
                                        <select id="cars" name="eGift" value={eGift} onChange={this.changeHandler} className="form-control" >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea type="text" name="message" value={message} onChange={this.changeHandler} className="form-control" placeholder="eg. 7171" />

                                    </div>
                                </Col>

                            </Row>

                            <button type="submit" disabled={isInvalid} className="btn btn-primary btn-block">Add Transaction</button>
                        </form>
                    </div>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <AddTransaction />,
    document.getElementById('root')
);
