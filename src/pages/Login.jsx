import React, { useState, useEffect } from 'react'
import './Login.css'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
  },[])

  const history=useNavigate();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);

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

     if (response.status === 200){
      alert('Login Successfull')
      setRedirect(true)
      
     }else{
       alert('Login Failed')
     }
     
      
    


  
}

  return (
    <div>
      {navMemo}
        <div className="login-overlay" id="login-in">
            <form action="POST" className="form-container" onSubmit={submit}>
              <h1>Login</h1>
          
              <label htmlFor="username"><b>Username</b></label>
              <input type="username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username" name="username" required />
          
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" name="psw" required />
          
              <button type="submit" className="btn">Login</button>
              <h5>Don't have an account yet? <Link to='/signup' className="sign-up-link" >Sign up</Link></h5>
            </form> 
        </div>
    </div>
  )
}

export default Login
