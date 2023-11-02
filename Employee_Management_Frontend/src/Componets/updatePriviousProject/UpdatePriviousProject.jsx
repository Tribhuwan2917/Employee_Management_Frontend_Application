import { useFormik } from 'formik';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Server_Error_Message } from '../../../public/UtilData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Row,Col,Table,Alert,Container,Card,Button} from 'react-bootstrap'
import { UpdatePriviousProjectSchema } from './UpdatePriviousProjectSchema';

function UpdatePriviousProject() {
    const navigate = useNavigate();
    const locationData = useLocation();
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        useEffect(() => {
            navigate("/login")
        }, [])
    }
    const { handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: locationData.state,
        onSubmit: (values, action) => {
            axios.put(employeeManagement_base_URL + employeeManagement_currentProject_updateCurrentProject_URL, values)
                .then((response) => {
                    if(response.data==="Employee Current Project Successfully updated With Current Project Id"+values.priviousProjectId)
                    {
                        toast.success("Employee Current Project Successfully! updated With Current Project Id: "+values.priviousProjectId)
                        setTimeout(()=>{
                            navigate(-1)
                        },3000)
                    }
                    else{
                        toast.warning("Oops! Employee current project  Unable is deu to update server Errror")
                    }
                })
                .catch((error) => {
                    if(error.response.data.exceptionMessage==="Current Project Not not exists With currentProjectId: "+values.priviousProjectId)
                    {
                        toast.warning("Oops!  No Any Current Project Exists with current project Id :"+values.priviousProjectId)
                    }
                    else{
                    toast.error(Server_Error_Message)
                    }
                })
        },
        validationSchema:UpdatePriviousProjectSchema
    })
    const handleCancel=()=>{
        navigate(-1)
    }
  return (
    <div>
     
     <Container style={{ marginLeft: '400px', display: 'flex' }}>
                <Row >
                    <Col>
                        <Card style={{ width: '60rem', textAlign: 'center', backgroundColor: '#1d2e3f', color: 'white', height: '700px', marginLeft: '-270px' }}>
                            <Card.Body>
                                <Card.Title>Update Privious Project</Card.Title>
                                <Card.Img src=''></Card.Img>
                                <Card.Text>
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Current Project Id:</label><br></br>
                                                    <input  style={{width:'400px'}}  onBlur={handleBlur} type='number' value={locationData.state.priviousProjectId} onChange={handleChange} name='priviousProjectId'></input>
                                                    {errors.priviousProjectId && touched.priviousProjectId ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectId}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Title</label><br></br>
                                                    <input  style={{width:'400px'}}  onBlur={handleBlur} type='text' value={values.priviousProjectTitle} onChange={handleChange} name='priviousProjectTitle'></input>
                                                    <br></br>
                                                    {errors.priviousProjectTitle && touched.priviousProjectTitle ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectTitle}
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
                                                    <input style={{width:'400px'}} type='text' value={values.priviousProjectLink} onChange={handleChange} onBlur={handleBlur} name='priviousProjectLink'></input>
                                                    <br></br>
                                                    {errors.priviousProjectLink && touched.priviousProjectLink ? <Alert  style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectLink}
                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            
                                            <div style={{ padding: '2px' }}>
                                                    <label>Project Objective</label><br></br>
                                                    <textarea onBlur={handleBlur} style={{width:'400px',height:'200px'}} type='text' value={values.priviousProjectObjective} onChange={handleChange} name='priviousProjectObjective'></textarea>
                                                    <br></br>
                                                    {errors.priviousProjectObjective && touched.priviousProjectObjective ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.priviousProjectObjective}
                                                    </Alert> : null}
                                                </div>
                                                
                                            </Col>
                                            <Col>
                                            <div style={{ padding: '2px' }}>
                                                    <label>Project Description</label><br></br>
                                                    <textarea style={{width:'400px',height:'200px'}} type='text' onBlur={handleBlur} value={values.priviousProjectDescription} onChange={handleChange} name='priviousProjectDescription'></textarea>
                                                    <br></br>
                                                    {errors.priviousProjectDescription && touched.priviousProjectDescription ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
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
                                                        <div style={{ marginRight: '10px' }}>
                                                            <Button style={{ width:'100px', backgroundColor: 'red', margin: '2px' }} onClick={handleCancel} disabled={false}>Cancel</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '20px' }}>
                                                            <Button style={{width:'100px', margin: '2px' }} type='submit' disabled={false}>Update</Button>
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

export default UpdatePriviousProject
