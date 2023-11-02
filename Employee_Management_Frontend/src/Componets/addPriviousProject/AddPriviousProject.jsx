import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AddPriviousProjectSchema } from './AddPriviousProjectSchema'
import { Container, Row, Col, Table, Button, Card, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { employeeManagement_base_URL, employeeManagement_priviousProject_postPriviousProject } from '../../../public/ApiUrl'
import { Server_Error_Message } from '../../../public/UtilData'

function AddPriviousProject() {
    const naviagte = useNavigate()
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        naviagte('/login')
    }
    /**
    private Integer priviousProjectId;
    private String priviousProjectTitle;
    private String priviousProjectLink;
    private String priviousProjectDescription;
    private String priviousProjectObjective;
    private Integer employeeId; */
    const addPriviousProjectIntialValues = {
        priviousProjectId: '',
        priviousProjectTitle: '',
        priviousProjectLink: '',
        priviousProjectDescription: '',
        priviousProjectObjective: '',
        employeeId: ''
    }
    const { handleBlur, handleChange, handleSubmit, touched, values, errors } = useFormik({
        initialValues: addPriviousProjectIntialValues,
        onSubmit: (values, action) => {
            axios.post(employeeManagement_base_URL + employeeManagement_priviousProject_postPriviousProject, values)
                .then((response) => {
                    toast.success("Your Privious Project add Successfully with Privious Project Id: " + values.priviousProjectId)
                })
                .catch((error) => {
                    if (error.response.data.priviousProjectExceptionMessage === "This Privious  project Already exists in database with Id: " + values.priviousProjectId) {
                        toast.warning("Oops! This Privious Project Exists Already with privious Project Id:" + values.priviousProjectId)
                    } else if (error.response.data.priviousProjectExceptionMessage === "No Employee Exists Coressponding this project That's why we can not add this privious project") {
                        toast.warning("No Employee Exists Coressponding this project That's why we can not add this privious project")
                    } else {
                        // console.log(error)
                        toast.error(Server_Error_Message)
                    }
                })
        },
        validationSchema: AddPriviousProjectSchema
    })
    const handleCancel = (event) => {
        naviagte(-1)
    }
    // const handleDelete=(priviousProjectId)=>{

    // }
    return (
        <div>
            <Container style={{ marginLeft: '400px', display: 'flex' }}>
                <Row >
                    <Col>
                        <Card style={{ width: '60rem', textAlign: 'center', backgroundColor: '#1d2e3f', color: 'white', height: '700px', marginLeft: '-270px' }}>
                            <Card.Body>
                                <Card.Title>Add Privios Project</Card.Title>
                                <Card.Img src=''></Card.Img>
                                <Card.Text>
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <div>
                                                    <label>Privious Project Id:</label><br></br>
                                                    <input style={{ width: '400px' }} onBlur={handleBlur} type='number' value={values.priviousProjectId} onChange={handleChange} name='priviousProjectId'></input>
                                                    {errors.priviousProjectId && touched.priviousProjectId ? <Alert style={{ marginLeft: '25px', marginTop: '2px', paddingBottom: '30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectId}

                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Title</label><br></br>
                                                    <input style={{ width: '400px' }} onBlur={handleBlur} type='text' value={values.priviousProjectTitle} onChange={handleChange} name='priviousProjectTitle'></input>
                                                    <br></br>
                                                    {errors.priviousProjectTitle && touched.priviousProjectTitle ? <Alert style={{ marginTop: '2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectTitle}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Employee Id</label><br></br>
                                                    <input style={{ width: '400px' }} type='number
                                                    ' value={values.employeeId} onChange={handleChange} onBlur={handleBlur} name='employeeId'></input>
                                                    <br></br>
                                                    {errors.employeeId && touched.employeeId ? <Alert style={{ marginTop: '2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.employeeId}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>

                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Link</label><br></br>
                                                    <input style={{ width: '400px' }} type='text' value={values.currentProjectLink} onChange={handleChange} onBlur={handleBlur} name='priviousProjectLink'></input>
                                                    <br></br>
                                                    {errors.priviousProjectLink && touched.priviousProjectLink ? <Alert
                                                        style={{ marginTop: '2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectLink}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Objective</label><br></br>
                                                    <textarea onBlur={handleBlur} style={{ width: '400px', height: '200px' }} type='text' value={values.priviousProjectObjective} onChange={handleChange} name='priviousProjectObjective'></textarea>
                                                    <br></br>
                                                    {errors.priviousProjectObjective && touched.priviousProjectObjective ? <Alert style={{ marginTop: '2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectObjective}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Description</label><br></br>
                                                    <textarea style={{ width: '400px', height: '200px' }} type='text' onBlur={handleBlur} value={values.priviousProjectDescription} onChange={handleChange} name='priviousProjectDescription'></textarea>
                                                    <br></br>
                                                    {errors.priviousProjectDescription && touched.priviousProjectDescription ? <Alert style={{ marginTop: '2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectDescription}

                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>

                                                <Row>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '20px' }}>
                                                            <Button style={{ width: '100px', backgroundColor: 'red', marginLeft: '8px' }} onClick={() => { naviagte(-1) }} disabled={false}>Cancel</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Button style={{ width: '100px', marginRight: '-15px' }} type='submit' disabled={false}>Add</Button>
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </Col>

                                        </Row>
                                    </form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer></ToastContainer>

        </div>
    )
}

export default AddPriviousProject
