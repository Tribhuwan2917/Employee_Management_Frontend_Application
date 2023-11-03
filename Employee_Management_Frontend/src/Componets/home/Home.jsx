import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap';
function Home() {

  return (
    <div>
    {(!sessionStorage.getItem('isLoggedIn')||sessionStorage.getItem('isLoggedIn')==='false')?null:<Alert style={{marginTop:'80px'}} variant='success'>
         Your Most Welcome! {sessionStorage.getItem('registrationEmail')} 
        </Alert>}

      <ToastContainer/>
    </div>
  )
}

export default Home
