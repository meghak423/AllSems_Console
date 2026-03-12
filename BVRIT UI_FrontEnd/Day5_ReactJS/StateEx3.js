import axios from 'axios'
import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class StateEx3 extends Component {
  constructor() {
    super()
    this.state = {
      students: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8085/getAllStudents').then((res) => {
        //console.log(res.data)
        this.setState({students: res.data });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }

  render() {
    return (
      <div className="container mt-4">
        <h1>Employees Details</h1>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Fees</th>
              <th>Course</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.fees}</td>
                <td>{student.course}</td>
                <td><Button color="primary">Edit</Button></td>
                <td><Button color="warning">Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
