import React, { Component } from 'react'

export default class StateEx4 extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
    }

    changeCounter() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Counter: {this.state.counter}</h1>
                <button onClick={()=>this.changeCounter()}>Click Me!!!</button>
            </div>
        )
    }
}
