import { useState, useEffect } from "react";
import EmployeeService from "./Services/EmployeeService";
const MyForm = (props) => {
    const { empid } = props
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        gender: "",
        dob: "",
        hobby: [],
        designation: "",
        phoneno: "",
        employeeSkill: []
    });

    useEffect(() => {
        if (empid) {
            EmployeeService.getById(empid)
                .then(res => { setInputs(res.data) })
        }
    }, [props.empid])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleCheck = ({ target }) => {
        const { name: hobby, checked, value } = target;
        if (checked) {
            inputs[hobby].push(value);
        } else {
            const index = inputs[hobby].indexOf(value);
            inputs[hobby].splice(index, 1);
        }
        setInputs(inputs);
    };

    const createEmp = (data) => {
        EmployeeService.addEmployee(data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(inputs);
    }

    const updateEmp = (empid, data) => {
        debugger
        EmployeeService.updateEmployee(empid, data)
            .then((response) => {

                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(inputs);
    }
    const handleSubmit = () => {
       
        const { name, email, gender, dob, hobby, designation, phoneno, employeeSkill } = inputs;
        const employees = { name, email, gender, dob, hobby:hobby.join(','), designation, phoneno, employeeSkill };
        return empid == null ? createEmp(employees) : updateEmp(empid, employees)

    }
    return (
        <form>
            <label>Name:</label>
            <input className="form-control" type="text" name="name" placeholder="Enter Employee name" value={inputs.name} onChange={handleChange} />

            <label>Email:</label>
            <input className="form-control" type="text" name="email" placeholder="Enter Employee email" value={inputs.email} onChange={handleChange} />

            <div>
                <label>Gender:</label>
                <div className="form-check">
                    <input type="radio" checked={inputs.gender === 'Male'} value="Male" name="gender" onChange={handleChange}/> Male &nbsp;
                    <input type="radio" checked={inputs.gender === 'Female'} value="Female" name="gender" onChange={handleChange}/> Female &nbsp;
                    <input type="radio" checked={inputs.gender === 'Other'} value="Other" name="gender" onChange={handleChange} /> Other
                </div>
            </div>
            <label>Dob:</label>
            <input className="form-control" type="date" name="dob" placeholder="Enter your birthdate" value={inputs.dob} onChange={handleChange} />

            <div>
                <label>Hobby:</label>
                <div className="form-check" onChange={handleCheck}>
                    <input type="checkbox"  name="hobby" id="hobby" value="Reading"/> Reading &nbsp;
                    <input type="checkbox" name="hobby" id="hobby" value="Writing"  /> Writing &nbsp;
                    <input type="checkbox" name="hobby" id="hobby" value="Programming" /> Programming &nbsp;
                    <input type="checkbox" name="hobby" id="hobby" value="Dancing" /> Dancing
                </div>
            </div>
            <label>Designation:</label>
            <select className="form-control" name="designation" value={inputs.designation} onChange={handleChange}>
                <option value="Trainee">Trainee</option>
                <option value="Jr.Developer">Jr.Developer</option>
                <option value="Sr.Developer">Sr.Developer</option>
            </select>
            <label>Phone No:</label>
            <input className="form-control" type="text" name="phoneno" placeholder="Enter your Phone" value={inputs.phoneno} onChange={handleChange} />
            <br />
            {/* <label>skill:</label>
                <input className="form-control" type="text" name="employeeSkill" placeholder="Enter your skill" value={inputs.employeeSkill} onChange={handleChange} /> */}
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>&nbsp;
        </form>
    )
}
export default MyForm
