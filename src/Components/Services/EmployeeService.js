import axios from "axios"

const getAllEmployees = () => {
    return axios.get("https://localhost:7279/api/Employee")    
 }

 const getById = (id) => {
    return axios.get("https://localhost:7279/api/Employee/" + id)    
 }

 const addEmployee = (data) => {
    return axios.post("https://localhost:7279/api/Employee",data)    
 }

 const updateEmployee = (id,data) => {
    return axios.put("https://localhost:7279/api/Employee/" + id,data)    
 }

 const deleteEmployee = (id) => {
    return axios.delete("https://localhost:7279/api/Employee/" + id)    
 }

const EmployeeService= {
    getAllEmployees,
    getById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
export default EmployeeService

