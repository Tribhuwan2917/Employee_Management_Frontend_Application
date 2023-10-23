import React, { useState } from 'react'
import {Card,Button,Container,Row,Col,Alert} from 'react-bootstrap'
import {Form, useFormik} from 'formik'
import { FormSchema } from './FormSchema'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_registration_postRegistration_URL } from '../../../public/ApiUrl'

// toast.configure() 
function SignUp() {
  // toast.configure()
  const[message,setMessage]=useState({
    successMessage:'',
    failureMessage:''
  })
  const navigate=useNavigate();
    const formIntialValue={
      registrationEmail:'',
      registraionPassword:''
    }
    const{handleChange,handleSubmit,values,errors,touched,handleBlur}=useFormik({
        initialValues:formIntialValue,
        onSubmit:(values,action)=>{
           axios.post(employeeManagement_base_URL+employeeManagement_registration_postRegistration_URL,values)
           .then((response)=>{
            console.log(response)
            toast.success("Employee Successfully Register");''
           }).catch((error)=>{
            //Registration with Email Id: testemail8499@gmail.comalready exists
            if(error.response.data.exceptionMessage==="Registration with Email Id: "+values.registrationEmail+"already exists"){
            // console.log(error.response.data)
            toast.warning("Employee Already Register With Email Id: "+values.registrationEmail)
            }
            else{
              toast.warning("Something Went Wrong");
            }
           })
           action.resetForm();
        },
        validationSchema:FormSchema
    })
  return (
    <div>
    <Container style={{ marginLeft:'400px', display:'flex'}}>
    <Row >
    <Col>
      <Card style={{ width: '28rem',textAlign:'center',backgroundColor:'#1d2e3f', color:'white',height:'400px'}}>
      <Card.Body>
        <Card.Title>Employee Registration</Card.Title>
        <Card.Img src=''></Card.Img>
        <Card.Text>
        <form onSubmit={handleSubmit}>
        <div style={{padding:'2px'}}>
        <label>Employee Email Id:</label><br></br>
        <input type='text' value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange} name='registrationEmail'></input><br></br>
        {errors.registrationEmail&&touched.registrationEmail?<Alert variant='danger'>
        {errors.registrationEmail}
        </Alert>:null}
        </div>
        <div style={{padding:'2px'}}>
        <label> Employee Password:</label><br></br>
        <input onBlur={handleBlur} type='text' value={values.registraionPassword} onChange={handleChange} name='registraionPassword'></input>
        <br></br>
        {errors.registraionPassword&&touched.registraionPassword?<Alert variant='danger'>
        {errors.registraionPassword}
        </Alert>:null}
        </div>
        <div>
        <Button style={{margin:'2px'}} type='submit' disabled={false}>Submit</Button>
        </div>
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

export default SignUp
