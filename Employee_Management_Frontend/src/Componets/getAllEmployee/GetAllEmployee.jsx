import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_employeeDetails_deleteEmployeeDetails_URL, employeeManagement_employeeDetails_getAllEmployeeDetails_URL } from '../../../public/ApiUrl';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetAllEmployee() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        useEffect(() => {
            navigate("/login")
        }, [])
    }
    const [allEmployeeData, setAllEmployeeData] = useState([])
    useEffect(() => {
        axios.get(employeeManagement_base_URL + employeeManagement_employeeDetails_getAllEmployeeDetails_URL)
            .then((response) => {
                for(let key in response.data)
                {
                    setAllEmployeeData([...response.data,response.data[key]])
                }
            })
            .catch((error) => {
                if(error.response.data.exceptionMessage==="No Employee Exists")
                {
                    toast.warning("Oops! No Employee Exists")
                }
                else{
                    toast.warning("Oops! Something Went Wrong")
                }
            })
    },[])
    const[isUpdated,setIsUpdated]=useState("")
    const handleUpdate=(event)=>{
        setIsUpdated("true");
    }
    const handleDelete=(employeeId,event)=>{
        console.log(allEmployeeData)
     
       if(confirm("Do! You want Sure delete Data")){
        axios.delete(employeeManagement_base_URL+employeeManagement_employeeDetails_deleteEmployeeDetails_URL+employeeId)
        .then((response)=>{
           
            for(let key in allEmployeeData)
            {
                if(key!==employeeId){
                setAllEmployeeData([...allEmployeeData,allEmployeeData[key]])
                }
            }
           location.reload()
           toast.success("Employee With Employee Id: "+employeeId+" has been deleted successfully!")
        })
        .catch((error)=>{
            toast.warning("Oops! Something Went wrong ")
        })
      }
    

    }

    return (
        <div>
            {allEmployeeData.length <= 0 ?<Alert style={{textAlign:'center',backgroundColor:'#1d2e3f', color:'white'}}>No Employee Exists</Alert> :
                <Table striped bordered hover>
                    <thead style={{textAlign:'center'}}>
                        <tr>
                            <th>Emp.Id</th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th>Gender</th>
                            <th> Email Id </th>
                            <th>Country</th>
                            <th>Addess ZipCode</th>
                            <th>City</th>
                            <th>Salary per Month</th>
                            <th>Current Project Id</th>
                            <th>Delete Employee</th>
                            <th>Update Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allEmployeeData.map((employeeData,index)=>(
                        <tr key={index}>
                        <td>{employeeData.employeeId}</td>
                        <td>{employeeData.employeeFirstName}</td>
                        <td>{employeeData.employeeLastName}</td>
                        <td>{employeeData.employeeGender}</td>
                        <td>{employeeData.employeeEmail}</td>
                        <td>{employeeData.employeeCountry}</td>
                        <td>{employeeData.employeeAddressZipCode}</td>
                        <td>{employeeData.employeeAddressCity}</td>
                        <td>{employeeData.employeeSalaryPerMonth}</td>
                        <td>{employeeData.currentProjectId?employeeData.currentProjectId:"NA"}</td>
                        <td><Button style={{marginLeft:'5px',width:'120px',height:'40px',fontSize:'15px'}} onClick={(event)=>handleDelete(employeeData.employeeId)} >Delete</Button></td>
                        <td><Button style={{marginLeft:'5px',width:'120px',height:'40px',fontSize:'15px'}} onClick={(event)=>navigate('/employeeDetails/getAllEmployee/updateEmployeeDetails',{state: {employeeData} })} >Update</Button></td>
                        </tr>
                         ))}
                    <tr>
                    </tr>
                    </tbody>
                </Table>
            }
            <Row>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div></div></Col>
                <Col><div><Button style={{marginLeft:'5px',width:'120px',height:'40px',fontSize:'15px'}} onClick={()=>{navigate(-1)}}>Cancel</Button></div></Col>
            </Row>
<ToastContainer></ToastContainer>
        </div>
    )
}

export default GetAllEmployee
