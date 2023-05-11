import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './User-Home.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../../components/UserContext'
import axios from 'axios'



function UserHome() {
  const [token, setToken] = useState(null);
   useEffect(()=>{
     const fetchData= async ()=> {
       const data= await fetch("http://localhost:8080/user/get",{
         method:"GET",
         headers:{
           Accept: "application/json",
           "Content-Type": "application/json",
          //  Authorization: `Bearer ${auth.token}`
         }
       })
       .then(res =>{
         return res.json()
       })
       .then(data => {
         if (data.error) {
           console.log("ERROR")
         } else {
           console.log(data)
         }
       })
     }
     fetchData() 
   },[])
  
  // useEffect(() => {
  //   // check for token in cookie on page load
  //   const storedToken = getCookie('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  //   console.log(token)
  // }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  const location=useLocation()
  const {setUserInfo,userInfo} = useContext(UserContext)
  function logout(){
    fetch('http://localhost:8080/logout',{
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null)
  }
  function userName(){
    const username = userInfo?.username
  }

  return (
    <div className='user-homepage'>
      <div className="header-user">
          <h1>Hello {userName()} 👋</h1>
          <Link to='/login' className="log-out">Log Out           <i class="fa-solid fa-arrow-right-from-bracket"></i></Link>
      </div>
    </div>
  )
}

export default UserHome
