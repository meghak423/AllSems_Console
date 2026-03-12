import React, { useRef } from 'react';
import { Button } from 'reactstrap';

function RefDemo2() {

    const loginId = useRef(null);
    const password = useRef(null);

    const login = () => {
        let userLoginId = loginId.current.value;
        let userPassword = password.current.value;

        if (userLoginId == 'Admin' && userPassword == 'Admin') {
            alert("Login Success");
        } else {
            alert("Invalid Creadentials");
        }
    }

    return (
        <div class='container'>
            <fieldset>
                <legend>Login Form</legend>
                LoginId:  <input type='text'     ref={loginId} /> <br />
                Password: <input type='password' ref={password} /> <br />
                <Button color='primary' onClick={login}>Login</Button>
            </fieldset>
        </div>
    )
}

export default RefDemo2




