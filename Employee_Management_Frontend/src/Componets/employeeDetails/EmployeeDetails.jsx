import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Table, Alert } from 'react-bootstrap'
import { useFormik } from 'formik';
import { EmployeeDetailsSchema } from './EmployeeDetailsSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { employeeManagement_base_URL, employeeManagement_employeeDetails_deleteEmployeeDetails_URL, employeeManagement_employeeDetails_getEmployeeDetails_URL } from '../../../public/ApiUrl';
import { Employee_Image_URL } from '../../../public/UtilData';

function EmployeeDetails() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        useEffect(() => { navigate("/login") }, [])
    }
    const inputSearchIntialValue = {
        employeeId: ''
    }
    const { handleChange, handleBlur, handleSubmit, touched, errors, values } = useFormik({
        initialValues: inputSearchIntialValue,
        onSubmit: (values, action) => {
            axios.get(employeeManagement_base_URL + employeeManagement_employeeDetails_getEmployeeDetails_URL + values.employeeId).then((response) => {
                setEmployeeData(response.data)
                action.resetForm()
            }).catch((error) => {
                console.log("Is has got called")
                toast.warning("No Employee Exists With Employee Id: " + values.employeeId)
                setEmployeeData({})
            })
        },
        validationSchema: EmployeeDetailsSchema
    })
    const [employeeData, setEmployeeData] = useState({

        employeeId: '',
        employeeFirstName: '',
        employeeLastName: '',
        employeeEmail: '',
        employeeCountry: '',
        employeeAddressZipCode: '',
        employeeAddressCity: '',
        employeeSalaryPerMonth: '',
        employeeGender: ''
    })
    const handleDelete = (event) => {
        event.preventDefault();
        if (confirm("Are You!  Sure delete Data")) {
            axios.delete(employeeManagement_base_URL + employeeManagement_employeeDetails_deleteEmployeeDetails_URL + searchInput.employeeId)
                .then((response) => {
                    toast.success("Employee Deleted Successfully! with Employee Id: " + employeeData.employeeId);
                    setEmployeeData({})
                }).catch((error) => {
                    // console.log(error)
                    toast.warning("Oops! Something Went wrong")
                })
        }
    }
    const handleCancel = (event) => {
        event.preventDefault();
        setEmployeeData({})
    }
    return (
        <div>
            <Card style={{  marginTop:'80px', textAlign: 'center', width: '70rem', height: '30rem', marginLeft: '150px', backgroundColor: '#1d2e3f', color: 'white' }}>
                {/* <Card.Img  src={Employee_Image_URL}  variant="top" height='200px' /> */}
                <Card.Body>
                    <Card.Title>Employee Details</Card.Title>
                   
                    <Card.Text>
                        <Container fluid>
                            <Row>
                                <Col lg={6}>
                                    <Form onSubmit={handleSubmit}>
                                        <span >
                                            <input inputmode="numeric" value={values.employeeId} onBlur={handleBlur} name='employeeId' onChange={handleChange} type='number' placeholder='Search Employee By Employee Id' style={{  width: '400px', height: '40px', borderRadius: '10px'}}></input>
                                           
                                            <Button style={{ marginLeft: '5px', marginBottom: '10px' }} disabled={false} type='submit'>Search</Button>
                                            {errors.employeeId && touched.employeeId ? <Alert style={{ marginLeft: '23px', width: '400px'
                          , height: '30px', paddingBottom: '30px'}} variant='danger'>
                                                {errors.employeeId}
                                            </Alert> : null}
                                        </span>
                                    </Form>
                                </Col>
                                <Col>
                                    <Button onClick={() => { navigate("/employeeDetails/addEmployee") }}>Add Employee</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => { navigate('/employeeDetails/getAllEmployee' ) }}>Get All Employee</Button>
                                </Col>
                            </Row>
                        </Container>{

                            (!employeeData.employeeId) ? null :
                                <Container>
                                    <Row>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Emp.Id</th>
                                                    <th> First Name</th>
                                                    <th> Last Name</th>
                                                    <th> Email Id </th>
                                                    <th>Country</th>
                                                    <th>Addess ZipCode</th>
                                                    <th>City</th>
                                                    <th>Salary/Month</th>
                                                    <th>Current Project Id</th>
                                                    <th>Delete</th>
                                                    <th>Update </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{employeeData.employeeId}</td>
                                                    <td> {employeeData.employeeFirstName}</td>
                                                    <td>{employeeData.employeeLastName}</td>
                                                    <td>{employeeData.employeeEmail} </td>
                                                    <td>{employeeData.employeeCountry}</td>
                                                    <td>{employeeData.employeeAddressZipCode}</td>
                                                    <td>{employeeData.employeeAddressCity}</td>
                                                    <td>{employeeData.employeeSalaryPerMonth}</td>
                                                    <td>{employeeData.employeeCurrentProjectId === null ? "NA" : employeeData.employeeCurrentProjectId}</td>
                                                    <td><Button style={{ backgroundColor:'red',marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={handleDelete}>Delete</Button></td>
                                                    <td><Button style={{ marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={() => { navigate('/employeeDetails/updateEmployeeDetails', { state: { employeeData } }) }}>Update</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                    <Row>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div><Button style={{backgroundColor:'red', width:'120px',height:'40px',marginLeft:'15px'}}Button onClick={handleCancel}>Cancel</Button></div></Col>
                                    </Row>
                                </Container>
                        }

                    </Card.Text>
                </Card.Body>
            </Card>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default EmployeeDetails
