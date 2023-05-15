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


      // .then(res =>{
      //   const username = getUsernameFromToken(res.data.access_token);
      //   console.log(`Username: ${username}`);
      // })
      // .catch(error => console.error(error));

    //    const data= await fetch("http://localhost:8080/user/get",{
    //      method:"GET",
    //      headers:{
    //        Accept: "application/json",
    //        "Content-Type": "application/json",
    //       //  'Cookie': 'access_token=' + encodeURIComponent(getCookie('access_token'))
    //       // Authorization: `Bearer ${auth.token}`
    //      }
    //    })
    //    .then(res =>{
    //      return res.json()
    //    })
    //    .then(data => {
    //      if (data.error) {
    //        console.log("ERROR")
    //      } else {
    //        console.log(data)
    //      }
    //    })
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

  const HeaderMemo = useMemo(()=>{
    return <UserHeader /> 
},[])

 

  return (
    <div className='user-homepage'>
      {HeaderMemo}
      <div className="main-user">
        <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className='nav-active'>Dashboard</Link></li>
            <li><Link to="/user/fitness-videos">Workout Tracker</Link></li>
            <li><Link to="/user/forum" className=''>Forum</Link></li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default UserHome
