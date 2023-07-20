import React, { useState, useEffect } from 'react'
import EmployeeService from './Services/EmployeeService'
import MyModal from './Common/MyModal'
import MyForm from './MyForm'
import swal from 'sweetalert'
import { FaEdit,FaTrashAlt } from "react-icons/fa";
const DisplayTable = () => {
  const [Employee, setEmployee] = useState([])
  const [editEmp, seteditEmp] = useState(null)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowing = () => setShow(true);

  useEffect(() => {
    fetchEmployees();
  }, [])

  const fetchEmployees = () => {
    EmployeeService.getAllEmployees()
      .then(response => {
        setEmployee(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getByIdEmp = (id) => {
    EmployeeService.getById(id)
      .then(res => console.log(res.data))
      .catch((err) => { console.log(err); })
  }

  const deleteEmp = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once you deleted, you can not retrieve your data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          EmployeeService.deleteEmployee(id)
            .then(res => {
              swal({
                title: "Done!",
                text: "Your data has been deleted",
                icon: "success",
                timer: 2000,
                button: false
              })
              fetchEmployees();
            });
        }
        else {
          swal("Your data is safe!");
        }
      })
  };

  const updateEmp = (id) => {
    handleShowing();
    seteditEmp(id)
  }

  const renderTable = () => {
    return Employee.map((e, index) => {
      return (
        <tr className='text-center' key={"row" + index}>
          <td>{e.id}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.gender}</td>
          <td>{e.dob}</td>
          <td>{e.designation}</td>
          <td>
            <button className='btn btn-primary' onClick={() => getByIdEmp(e.id)}>Details</button> &nbsp;
            <button className='btn btn-success' onClick={() => updateEmp(e.id)}><FaEdit/></button> &nbsp;
            <button className='btn btn-danger' onClick={() => deleteEmp(e.id)}><FaTrashAlt/></button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr className="table-info text-center">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Dob</th>
            <th>designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
      </table>

      <MyModal show={show} handleClose={handleClose} title={'Update Employe'}>
        <MyForm empid={editEmp} />
      </MyModal>
    </div>
  )
}
export default DisplayTable
