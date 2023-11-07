import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert,Card,Container,Row,Col} from 'react-bootstrap';
import './home.css'
function Home() {
  return (
    <div className='home'>
    {(!sessionStorage.getItem('isLoggedIn')||sessionStorage.getItem('isLoggedIn')==='false')?null:<Alert style={{marginTop:'80px', zIndex:'1'}} variant='success'>
         Your Most Welcome! {sessionStorage.getItem('registrationEmail')} 
        </Alert>}
        <div style={{ position:'inherit', marginTop:'80px', width: '28rem', textAlign: 'center', color: 'white', height: '500px' }}></div>

      <ToastContainer/>
    </div>
  )
}

export default Home
