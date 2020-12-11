import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";

const INITIAL_STATE = {
    amount: '',
};


//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


export default class UpdateAccBal extends Component {

    constructor(props) {
        super(props);

        //Binding methods 
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ...INITIAL_STATE,
            amount: '',
        };
    }

    //Setting form values
    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    //submitting of the form 
    onSubmit = (e) => {
        e.preventDefault();

        // change the below code according to your variable name
        const { amount } = this.state;

        let formData = new FormData();

        formData.append("amount", amount); // change the variable name

        const config = {
            headers: { "accessToken": localStorage.getItem("token") }
        };

        // get the link from jiawei!
        axios
            .post('http://backend-env.eba-g7hdkdd4.ap-southeast-1.elasticbeanstalk.com/balance',
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

        // change the variable name 
        // const { payeeID } = this.state;
        const { amount } = this.state;


        // insert the variable name
        const isInvalid =
            amount === ''
        //     amount === '' ||
        //     expensesCat === '' ||
        //     eGift === '' ||
        //     message === '';


        return (
            <Router>
                <div>
                    <div className="auth-inner">

                        <form onSubmit={this.onSubmit}>
                            <h3>Update Account Balance</h3>

                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="text" name="amount" value={amount} onChange={this.changeHandler} className="form-control" />

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
    <UpdateAccBal />,
    document.getElementById('root')
);
