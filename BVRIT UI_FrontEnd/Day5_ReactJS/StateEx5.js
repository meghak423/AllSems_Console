import React, {useState} from 'react';
import { Button } from 'reactstrap';

function StateEx5() {

    const [message, setMessage] = useState("UI Sessions");

    const changeMessage = () => {
        setMessage("ReactJS Sessions");
    }

    return (
        <div>
            <h1>Message: {message}</h1>
            <Button color='warning' onClick={changeMessage}>Change Message</Button>
        </div>
    )
}

export default StateEx5