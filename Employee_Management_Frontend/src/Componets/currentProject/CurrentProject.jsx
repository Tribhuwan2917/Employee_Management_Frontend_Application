import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function CurrentProject() {
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
      This is my Current projects
    </div>
  )
}

export default CurrentProject

