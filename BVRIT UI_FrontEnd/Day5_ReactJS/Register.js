import axios from 'axios'
import React, { Component } from 'react'
import { Form, Button, FormGroup, Input, Label } from 'reactstrap'

export default class RefsDemo1 extends Component {

  register = () => {
    const student = {
      "id" : this.refs.id.value,  
      "name" : this.refs.studentName.value,
        "course" : this.refs.course.value,
        "fees" : this.refs.fees.value,
}
    axios.post('http://localhost:8085/register',student).then((data)=>{console.log(data)})
}
  render() {
    return (
      <div>
        Enter name : 
            <input type="text" ref="id" placeholder='Enter id' /><br />
      
        Enter name : 
            <input type="text" ref="studentName" placeholder='Enter name' /><br />
            Enter fees : 
            <input type="text" ref="fees" placeholder='Enter fees' /><br />
            Enter gender : 
            <input type="text" ref="course" placeholder='Enter course' /><br />
                   
          <Button color="info" onClick={this.register}>Register</Button>
      </div>
    )
  }
  
}
