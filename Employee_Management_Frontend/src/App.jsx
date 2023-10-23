import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Row,Col,Container} from 'react-bootstrap'
import Header from './Componets/header/Header'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Componets/login/Login'
import Home from './Componets/home/Home'
import SignUp from './Componets/signup/SignUp'
import Logout from './Componets/logout/Logout'
import CurrentProject from './Componets/currentProject/CurrentProject'
import PriviousProject from './Componets/priviousProject/PriviousProject'
import EmployeeDetails from  './Componets/employeeDetails/EmployeeDetails'
import AddEmployee from './Componets/addEmployee/AddEmployee'
import GetAllEmployee from './Componets/getAllEmployee/GetAllEmployee'
import UpdateEmployeeDetails from './Componets/updateEmployee/UpdateEmployeeDetails'

function App() {

  return (
    <>
      <Container fluid>
        <Row>
        <Header></Header>
        </Row>
        <Row>
        <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home></Home>}>
        </Route>
        <Route path='/login' element={<Login></Login>}>
        </Route>
        <Route path='/Signup' element={<SignUp></SignUp>}>
        </Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route path='/currentProject' element={<CurrentProject></CurrentProject>}>
        </Route>
        <Route path='/priviousProject' element={<PriviousProject></PriviousProject>}></Route>
        <Route path='/employeeDetails' element={<EmployeeDetails>
        </EmployeeDetails>}>
        </Route>
        <Route path='/employeeDetails/addEmployee' element={<AddEmployee></AddEmployee>}></Route>
        <Route path='/employeeDetails/getAllEmployee' element={<GetAllEmployee></GetAllEmployee>}></Route>
        <Route path='/employeeDetails/getAllEmployee/updateEmployeeDetails' element={<UpdateEmployeeDetails></UpdateEmployeeDetails>}></Route>
        <Route path='/employeeDetails/updateEmployeeDetails' element={<UpdateEmployeeDetails></UpdateEmployeeDetails>}></Route>
      </Routes>
    </BrowserRouter>
        </Row>
        <Row>
          <Col>Foortoor</Col>
        </Row>
      </Container>
      {/* <Routes>
        <Route to='/home' element={<Home></Home>}></Route>
      </Routes> */}
    </>
  )
}

export default App
