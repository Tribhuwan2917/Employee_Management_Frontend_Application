import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from 'react-bootstrap/Carousel';
import { Alert,Card,Container,Row,Col} from 'react-bootstrap';
import './home.css'
import { Github_logo_URL, Leetcode_logo_URL, Slider_Image1_URL, Slider_Image2_URL, Slider_Image3_URL, Slider_Image4_URL } from '../../../public/ApiUrl';
function Home() {
  return (
    <div className='home'>
    {(!sessionStorage.getItem('isLoggedIn')||sessionStorage.getItem('isLoggedIn')==='false')? <Carousel style={{paddingTop:'200px'}} data-bs-theme="dark">
      <Carousel.Item style={{textAlign:'center'}}>
        <img
          style={{marginLeft:'50px', height:'350px',width:'800px', borderRadius:'10px'}}
          src={Slider_Image1_URL}
          alt="First slide"
        />
        <Carousel.Caption style={{textAlign:'center'}}>
          <h5 style={{color:'black'}}>Thses are the My Employee</h5>
          <p style={{color:'black'}}></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          style={{marginLeft:'300px' , height:'350px',width:'800px', borderRadius:'10px'}}
          src={Slider_Image2_URL}
          alt="Second slide"
        />
        <Carousel.Caption style={{textAlign:'center'}}>
          <h5 style={{color:'white'}}>Second slide label</h5>
          <p style={{color:'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{marginLeft:'300px',height:'350px',width:'800px',borderRadius:'10px'}}
          src={Slider_Image3_URL}
          alt="Third slide"
        />
        <Carousel.Caption >
          <h5 style={{color:'white'}}>Third slide label</h5>
          <p style={{color:'white'}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{marginLeft:'300px',height:'350px',width:'800px',borderRadius:'10px'}}
          src={Slider_Image4_URL}
          alt="Third slide"
        />
        <Carousel.Caption >
          <h5 style={{color:'white'}}>Third slide label</h5>
          <p style={{color:'white'}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>:<Alert style={{marginTop:'80px', zIndex:'1'}} variant='success'>
    <marquee Scrollamount={10}>
         Your Most Welcome! {sessionStorage.getItem('registrationEmail')} </marquee>
        </Alert>}
        <div ></div>

      <ToastContainer/>
    </div>
  )
}

export default Home
