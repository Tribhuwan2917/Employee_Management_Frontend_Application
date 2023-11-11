import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Table, Row, Col, Card, Alert, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_currentProject_updateCurrentProject_URL } from '../../../public/ApiUrl';
import { useFormik } from 'formik';
import { UpdateCurrentProjectSchema } from './UpdateCurrentProjectSchema';
import axios from 'axios';


function UpdateCurrentProject() {
    const navigate = useNavigate();
    const locationData = useLocation();
    console.log("This all parent data")
     console.log(locationData.state)
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        useEffect(() => {
            navigate("/login")
        }, [])
    }
    const { handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: locationData.state,
        onSubmit: (values, action) => {

            // console.log(values)
            axios.put(employeeManagement_base_URL + employeeManagement_currentProject_updateCurrentProject_URL, values)
                .then((response) => {
                    if(response.data==="Employee Current Project Successfully updated With Current Project Id"+values.currentProjectId)
                    {
                        toast.success("Employee Current Project Successfully! updated With Current Project Id: "+values.currentProjectId)
                        setTimeout(()=>{
                            navigate(-1)
                        },3000)
                    }
                    else{
                        toast.warning("Oops! Employee current project  Unable is deu to update server Errror")
                    }
                })
                .catch((error) => {
                    if(error.response.data.exceptionMessage==="Current Project Not not exists With currentProjectId: "+values.currentProjectId)
                    {
                        toast.warning("Oops!  No Any Current Project Exists with current project Id :"+values.currentProjectId)
                    }
                    else{
                    toast.error("Oops! Something Went Wrong")
                    }
                })
        },
        validationSchema:UpdateCurrentProjectSchema
    })
    const handleCancel=()=>{
        navigate(-1)
    }
    return (
        <div style={{margin:'5px'}}>  
            <Container style={{ marginLeft: '400px', display: 'flex' }}>
                <Row >
                    <Col>
                        <Card style={{ marginTop:'80px', width: '60rem', textAlign: 'center', backgroundColor: '#1d2e3f', color: 'white', height: '700px', marginLeft: '-270px' }}>
                            <Card.Body>
                                <Card.Title>Update Current Project</Card.Title>
                                {/* <Card.Img src=''></Card.Img> */}
                                <Card.Text>
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Current Project Id:</label><br></br>
                                                    <input  style={{width:'400px'}}  onBlur={handleBlur} type='number' value={locationData.state.currentProjectId} onChange={handleChange} name='currentProjectId'></input>
                                                    {errors.currentProjectId && touched.currentProjectId ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectId}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Title</label><br></br>
                                                    <input  style={{width:'400px'}}  onBlur={handleBlur} type='text' value={values.currentProjectTitle} onChange={handleChange} name='currentProjectTitle'></input>
                                                    <br></br>
                                                    {errors.currentProjectTitle && touched.currentProjectTitle ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectTitle}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div style={{ padding: '2px' }}>
                                                    <label>Employee Id</label><br></br>
                                                    <input  style={{width:'400px'}}  type='number
                                                    ' value={values.employeeId} onChange={handleChange} onBlur={handleBlur} name='employeeId'></input>
                                                    <br></br>
                                                    {errors.employeeId && touched.employeeId ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.employeeId}
                                                    </Alert> : null}
                                                </div> 
                                            </Col>
                                            <Col>

                                            <div style={{ padding: '2px' }}>
                                                    <label>Project Link</label><br></br>
                                                    <input style={{width:'400px'}} type='text' value={values.currentProjectLink} onChange={handleChange} onBlur={handleBlur} name='currentProjectLink'></input>
                                                    <br></br>
                                                    {errors.currentProjectLink && touched.currentProjectLink ? <Alert  style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectLink}
                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            
                                            <div style={{ padding: '2px' }}>
                                                    <label>Project Objective</label><br></br>
                                                    <textarea onBlur={handleBlur} style={{width:'400px',height:'200px'}} type='text' value={values.currentProjectObjective} onChange={handleChange} name='currentProjectObjective'></textarea>
                                                    <br></br>
                                                    {errors.currentProjectObjective && touched.currentProjectObjective ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectObjective}
                                                    </Alert> : null}
                                                </div>
                                                
                                            </Col>
                                            <Col>
                                            <div style={{ padding: '2px' }}>
                                                    <label>Project Description</label><br></br>
                                                    <textarea style={{width:'400px',height:'200px'}} type='text' onBlur={handleBlur} value={values.currentProjectDescription} onChange={handleChange} name='currentProjectDescription'></textarea>
                                                    <br></br>
                                                    {errors.currentProjectDescription && touched.currentProjectDescription ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectDescription}

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
                                                            <Button style={{ width:'100px',backgroundColor: 'red', margin: '2px' }} onClick={handleCancel} disabled={false}>Cancel</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Button style={{width:'100px' }} type='submit' disabled={false}>Update</Button>
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

export default UpdateCurrentProject

