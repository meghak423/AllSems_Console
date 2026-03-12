import React, { useState } from 'react'
import { Button } from 'reactstrap';

function DotsOpt() {

    const [employee, setEmployee] = useState(
        { empId: 101, empName: 'Harsha', salary: 1212.12, gender: 'Male', age: 22 }
    );

    const changeEmployee = () => {
        setEmployee({...employee, empName: 'Sree Harsha'});
    }

    return (
        <div>
            {
                <h3>
                    EmpId:  {employee.empId} <br/>
                    EmpName:{employee.empName} <br/>
                    Salary: {employee.salary} <br/>
                    Gender: {employee.gender} <br/>
                    Age:    {employee.age} <br/>
                </h3>
            }

            <Button color='warning' onClick={changeEmployee} >Update Employee</Button>
        </div>
    )
}

export default DotsOpt
