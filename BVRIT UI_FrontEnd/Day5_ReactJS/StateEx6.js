import React, { useState } from 'react';
import { Button } from 'reactstrap';

function StateEx6() {

    const employees = [
        { empId: 101, empName: 'Harsha', salary: 1212.12, gender: 'Male', age: 22, mobile: 9898989899 },
        { empId: 102, empName: 'Pasha', salary: 2323.23, gender: 'Male', age: 23, mobile: 9898989898 },
        { empId: 103, empName: 'Mahesh', salary: 3434.34, gender: 'Male', age: 24, mobile: 9898989897 },
        { empId: 104, empName: 'Mohan', salary: 4545.45, gender: 'Male', age: 25, mobile: 9898989896 },
        { empId: 105, empName: 'Deepika', salary: 5656.56, gender: 'Female', age: 26, mobile: 9898989895 }
    ];

    const [employeesList, setState] = useState(employees);

    const clearData = () => {
        setState([]);
    }

    if (employeesList.length > 0) {
        return (
            <div class='container'>
                <h1 align='center'>Employees Data</h1> <br />

                <table class='table table-bordered table-hover table-striped table-sm'>
                    <thead>
                        <tr>
                            <th class='bg-info text-white'>EmpId  </th>
                            <th class='bg-info text-white'>EmpName</th>
                            <th class='bg-info text-white'>Salary </th>
                            <th class='bg-info text-white'>Gender </th>
                            <th class='bg-info text-white'>Age    </th>
                            <th class='bg-info text-white'>Mobile </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeesList.map((emp) => (
                                <tr h1 key={emp.empId}>
                                    <td>{emp.empId}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.age}</td>
                                    <td>{emp.mobile}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br />

                <center>
                    <Button color='warning' onClick={clearData}>Clear Data</Button>
                </center>
            </div>
        )
    } else {
        return (
            <div>
                <br />
                <h1 align='center' style={{ color: 'Red' }}>No Employee Records</h1>
            </div>
        )
    }
}

export default StateEx6





