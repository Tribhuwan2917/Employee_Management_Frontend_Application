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
    const emailSender=()=>
    {
      
    }
    const{handleChange,handleSubmit,values,errors,touched,handleBlur}=useFormik({
        initialValues:formIntialValue,
        onSubmit:(values,action)=>{
           axios.post(employeeManagement_base_URL+employeeManagement_registration_postRegistration_URL,values)
           .then((response)=>{
            // console.log(response)
            toast.success("Employee Successfully Register");
            setTimeout(()=>{
              navigate('/login')
            },3000)
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
    //<div class="hero__bg js-loaded is-loaded" style="background-image:url(https://www.altantechnologies.com/drive/uploads/2019/02/iot-internet-of-things-cloud-1600x650c-1600x650.jpg )"></div>
  return (
    <div>
    <Container style={{ marginLeft:'400px', display:'flex',marginBottom:'5px'}}>
    <Row >
    <Col>
      <Card style={{zIndex:'-1', position:'inherit', marginTop:'120px', width: '38rem',textAlign:'center',backgroundColor:'#1d2e3f', color:'white',height: '480px'}}>
      <Card.Body>
        <Card.Title>Employee Registration</Card.Title>
        <Card.Img src=''></Card.Img>
        <Card.Text>
        <form onSubmit={handleSubmit}>
        <div>
        <label>Employee Email Id</label><br></br>
        <div>
        <input type='text' style={{width:'300px'}} value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange} name='registrationEmail'></input>
        <Button style={{ width:'100px', margin:'5px'}}>Verify</Button>
        </div> 
        {errors.registrationEmail&&touched.registrationEmail?<Alert style={{ marginTop:'2px', marginLeft:'75px',width:'420px',height:'35px',paddingBottom:'35px'}} variant='danger'>
        {errors.registrationEmail}
        </Alert>:null}
        </div>
        <div>
        <label> Employee Password</label><br></br>
        <input onBlur={handleBlur} style={{width:'420px'}} type='text' value={values.registraionPassword} onChange={handleChange} name='registraionPassword'></input>
        <br></br>
        {errors.registraionPassword&&touched.registraionPassword?<Alert style={{marginTop:'2px', marginLeft:'75px',width:'420px',height:'35px',paddingBottom:'35px'}} variant='danger'>
        {errors.registraionPassword}
        </Alert>:null}
        </div>
        <div>
        <Button style={{ marginTop:'30px',width:'100px', marginLeft:'15px'}} type='submit' disabled={false}>SignUp</Button>
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
