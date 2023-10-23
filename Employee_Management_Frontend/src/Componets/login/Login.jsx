import React, { useState } from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Form, useFormik } from 'formik'
import { FormSchema } from './FormSchema.jsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_registration_getRegistration_URL } from '../../../public/ApiUrl.jsx'
function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    successMessage: '',
    failureMessage: ''
  })
  const formIntialValue = {
    registrationEmail: '',
    registraionPassword: ''
  }
  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: formIntialValue,
    onSubmit: (values, action) => {
      //"http://localhost:8081/employeeManagement/getRegistration/"
      if (sessionStorage.getItem("isLoggedId") !== 'true'||!sessionStorage.getItem("isLoggedIn")) {
        axios.get(employeeManagement_base_URL + employeeManagement_registration_getRegistration_URL + values.registrationEmail).then((response) => {
          if (response.data.registrationEmail === values.registrationEmail && response.data.registraionPassword === values.registraionPassword) {
            // setMessage({successMessage:"Employee SucessFully LoggedIn",failureMessage:''})
            toast.success("Employee Successfully Logged In")
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("registrationEmail", values.registrationEmail);
            sessionStorage.setItem("registraionPassword", values.registraionPassword);
            setTimeout(() => {
              location.reload();
              navigate('/login')
            }, 4000)
            // console.log("session data++++++++++++++++++++++++++")
            // console.log(sessionStorage.getItem("isLoggedIn"))
            // console.log(sessionStorage.getItem("registraionPassword"))
            // console.log(sessionStorage.getItem("registrationEmail"))

          }
          else {
            // console.log(response.data.registraionPassword+"............."+values.registraionPassword)
            // console.log(response.data)
            // console.log("ist has called+++++++++++++++++++++")
            // setMessage({successMessage:"",failureMessage:'Password is Wrong'})
            toast.warning("Wrong Password");
            sessionStorage.clear()
          }
        }).catch((error) => {
          // console.log("somethi9ng went arong")
          // setMessage({successMessage:'',failureMessage:error.response.data.exceptionMessage})
          if (error.response.data.exceptionMessage === "Registration With Email Id: " + values.registrationEmail + "Not Found") {
            toast.warning("Employee Does not exists with Email Id: " + values.registrationEmail)
          }
          else {
            toast.warning("Something Went Wrong")
          }
          sessionStorage.clear();
        })
      }
      else {
        sessionStorage.clear();
        toast.info("Employee already Logged In")
      }
      action.resetForm()
    },
    validationSchema: FormSchema
  })
  return (
    <div>
      <Container style={{ marginLeft: '400px', display: 'flex' }}>
        <Row >
          <Col>
            <Card style={{ width: '28rem', textAlign: 'center', backgroundColor: '#1d2e3f', color: 'white', height: '350px' }}>
              <Card.Body>
                <Card.Title>Employee Login</Card.Title>
                <Card.Img src=''></Card.Img>
                <Card.Text>
                  <form onSubmit={handleSubmit}>
                    <div style={{ padding: '2px' }}>
                      <label>Employee Email Id:</label><br></br>
                      <input type='text' value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange} name='registrationEmail'></input><br></br>
                      {errors.registrationEmail && touched.registrationEmail ? <Alert variant='danger'>
                        {errors.registrationEmail}
                      </Alert> : null}
                    </div>
                    <div style={{ padding: '2px' }}>
                      <label> Employee Password:</label><br></br>
                      <input type='text' value={values.registraionPassword} onBlur={handleBlur} onChange={handleChange} name='registraionPassword'></input>
                      <br></br>
                      {errors.registraionPassword && touched.registraionPassword ? <Alert variant='danger'>
                        {errors.registraionPassword}
                      </Alert> : null}
                    </div>
                    <div style={{ margin: '10px' }}>
                      <Button type='submit' >Login</Button>
                    </div>
                  </form>
                  {/* {message.failureMessage? <Alert style={{width:'450px', marginLeft:'-17px',height:'73px'}} variant='danger'>{message.failureMessage}
        </Alert>:null}  */}
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  )
}

export default Login
