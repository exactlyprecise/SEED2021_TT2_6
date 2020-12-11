import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class Login extends Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control"  placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>

                </form>
            </div>
        );
    }
}
ReactDOM.render(
    <Login />,
    document.getElementById('root')
);



