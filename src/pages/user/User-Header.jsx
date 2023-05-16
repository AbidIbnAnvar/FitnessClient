import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './User-Header.css'  
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../../components/UserContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { NavItems } from './NavigationItems'
import { NavLink } from 'react-router-dom'


function UserHeader() {
    const [token, setToken] = useState(null);
    const [username,setUsername] =useState(null)
     useEffect(()=>{
       const fetchData= async ()=> {
        const response= await axios.get('http://localhost:8080/user/get', {
          withCredentials: true // Include cookies in the request
        })
        setUsername(response.data.username)
       }
       fetchData() 
     },[])
    
  
   
  return (
    <div>
      <div className="header-user">
            <h1>Welcome <div className='header-username'>{username}</div></h1> 
            <div className="user-right">
                <Link to='/user/profile' className='user-profile'><i className="fa-solid fa-user"></i></Link>
                <Link to='/login' className="log-out">Log Out           <i className="fa-solid fa-arrow-right-from-bracket"></i></Link>
            </div>
            
        </div>
    </div>
  )
}

export default UserHeader

 
