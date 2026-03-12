import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class RefDemo1 extends Component {

    constructor() {
        super();
        this.loginId = React.createRef();
        this.password = React.createRef();
    }

    render() {
        return (
            <div class='container'>
                <fieldset>
                    <legend>Login Form</legend>
                    LoginId:  <input type='text'     ref={this.loginId} /> <br />
                    Password: <input type='password' ref={this.password} /> <br />
                    <Button color='primary' onClick={this.login}>Login</Button>
                </fieldset>
            </div>
        )
    }

    login = () => {
        let loginId = this.loginId.current.value;
        let password = this.password.current.value;

        if (loginId == 'Admin' && password == 'Admin') {
            alert("Login Success");
        } else {
            alert("Invalid Creadentials");
        }
    }
}
