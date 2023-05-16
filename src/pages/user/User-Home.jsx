import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './User-Home.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../../components/UserContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { NavItems } from './NavigationItems'
import { NavLink } from 'react-router-dom'
import UserHeader from './User-Header'
import { useMemo } from 'react'



function UserHome() {
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
  
  // useEffect(() => {
  //   // check for token in cookie on page load
  //   const storedToken = getCookie('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  //   console.log(token)
  // }, []);

  function getUsernameFromToken(token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.username;
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
  

  return (
    <div className='user-homepage'>
      <div className="header-user">
        <UserHeader />
      </div>
      <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className='nav-active'>Dashboard</Link></li>
            <li><Link to="/user/fitness-videos">Workout Tracker</Link></li>
            <li><Link to="/user/forum" className=''>Forum</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default UserHome
