import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

const INITIAL_STATE = {
    username: '',
    password: '',
    error: null,
    isChecked: false,
};

export default class Login extends Component {


    constructor(props) {
        super(props);
        //Binding methods 
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

        // The state object is where you store property values that belongs to the component.
        // When the state object changes, the component re-renders.
        this.state = {
            ...INITIAL_STATE,
            custID: '',
        };
    }


    componentDidMount() {
        // if you want to use localStorage.checkbox, must use === 'true'
        if (localStorage.checkbox && localStorage.username !== '') {
            this.setState({
                isChecked: true,
                username: localStorage.username,
                password: localStorage.password
            })
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    onChangeCheckbox = (e) => {

        this.setState({ // this method is asynchronous which means that if u put the console log after this method, the boolean method will not be updated immediately
            isChecked: e.target.checked
        })

    }
    onSubmit = (e) => {
        e.preventDefault();

        const { username, password, isChecked } = this.state; //just submit the username and password when the form is submitted 

        if (isChecked === true && username !== '') {

            // this sets the credentials in the web browser
            localStorage.username = username
            localStorage.password = password
            localStorage.checkbox = 'true'
        } else {
            localStorage.username = ''
            localStorage.password = ''
            localStorage.checkbox = 'false'
        }

        const config = {
            headers: { 'Content-Type': "application/json" }
        };

        //API Calling
        //need to insert the link 
        axios
            .post('http://localhost:4002/login', {
                username: username,
                password: password,
                config
            })
            .then(response => {

                localStorage.setItem('token', response.data.accessToken);
                window.location.href = "/accountDetails";

            })
            .catch(error => {
                this.setState({ error });
                console.log(error);
            });

        // const { isLoggedIn } = this.state;

    }

    render() {

        const { username, password, error, isChecked } = this.state;
        const isInvalid = password === '' || username === '';

        return (
            <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.changeHandler} placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.changeHandler} placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isChecked} name="RememberMe" onChange={this.onChangeCheckbox} />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" disabled={isInvalid} className="btn btn-primary btn-block">Submit</button>
                    {error && <p className="error">{error.message}</p>}
                </form>
            </div>
        );
    }
}
ReactDOM.render(
    <Login />,
    document.getElementById('root')
);



