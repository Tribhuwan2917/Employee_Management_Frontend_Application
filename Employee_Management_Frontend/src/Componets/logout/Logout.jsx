import React, { useEffect } from 'react'
import {} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_registration_deleteRegistration_URL } from '../../../public/ApiUrl';
function Logout() {
  // console.log(sessionStorage.getItem("registrationEmail"))
  // console.log(sessionStorage.getItem("registraionPassword"))
  // console.log(sessionStorage.getItem("registraionPassword"))
useEffect(()=>{
axios.delete(employeeManagement_base_URL+employeeManagement_registration_deleteRegistration_URL+sessionStorage.getItem("registrationEmail")).then((response)=>{
  sessionStorage.clear();

  setTimeout(()=>{
    location.reload();
    navigate('/login');
  },4000)
  toast.success("Employee logged out successfully")

  
}).catch((error)=>{
 
  sessionStorage.clear();
})
},[])
  return (
    <div>
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default Logout
