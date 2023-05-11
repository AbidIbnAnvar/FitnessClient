import React, { useContext, useState, useEffect } from 'react'
import './Login.css'
import axios from "axios"
import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { UserContext } from '../components/UserContext'

function Login() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
  },[])

  const history=useNavigate();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUserInfo} =useContext(UserContext)

  useEffect(() => {
    if (redirect) {
     return history("/user/home")
    }
  }, [redirect]);

  async function submit(e){
    e.preventDefault();

    const response= await fetch("http://localhost:8080/login",{
        method:'POST',
        body: JSON.stringify({username,password}),
        headers: {'Content-type':'application/json'},
        credentials: 'include',
      })
    // if (response.ok){
    //   setRediret(true);
    // } else{
    //   alert('wrong credentials')
    // }
    
    // if (redirect) {
    //   return <Navigate to={'http://localhost:3000/user/home'} /> 
    // }

     if (response.status === 200){
      alert('registeration succesful')
      setRedirect(true)
      // response.json().then(userInfo =>{
      //   setUserInfo(userInfo)
      //   setRediret(true)
      // })
     }else{
       alert('registration failed')
     }
    console.log('Hello',redirect)
     
      
    


  
}

  //   try {
  //     await axios.post("http://localhost:3000/login", {
  //       email,password
  //     })
  //     .then(res=>{
  //       if(res.data=="exist"){
  //           history("/user/home",{state:{id:email}})
  //       }else if(res.data=="does not exist"){
  //         alert("User has not signed up")
  //       }
  //     })
  //     .catch(e=>{
  //       alert("Wrong details")
  //       console.log(e)
  //   })
  //   } catch (e) {
  //     console.log(e);
      
  //   }
  // }

  return (
    <div>
      {navMemo}
        <div className="login-overlay" id="login-in">
            <form action="POST" className="form-container" onSubmit={submit}>
                {/* <button className="close_button" onclick="close_signin()"><span className="material-symbols-outlined">
                    close
                </span> </button>  */}
              <h1>Login</h1>
          
              <label for="username"><b>Username</b></label>
              <input type="username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username" name="username" required />
          
              <label for="psw"><b>Password</b></label>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" name="psw" required />
          
              <button type="submit" className="btn">Login</button>
              <h5>Don't have an account yet? <Link to='/signup' className="sign-up-link" >Sign up</Link></h5>
            </form> 
        </div>
    </div>
  )
}

export default Login
