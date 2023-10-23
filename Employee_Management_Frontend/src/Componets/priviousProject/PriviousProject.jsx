import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function PriviousProject() {
  const navigate=useNavigate();
useEffect(()=>{
    if(sessionStorage.getItem("isLoggedIn")==='true')
    {
        
     
    }
    else{
        console.log("user not logged in")
        navigate("/login")
    }

},[])
  return (
    <div>
      this is my privious projects
    </div>
  )
}

export default PriviousProject
