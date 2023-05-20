import React from 'react'
import './Signup.css'
import axios from 'axios'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function Signup() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
  },[])
  const history=useNavigate();
  const [username,setUsername] = useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  async function submit(e){
    e.preventDefault();
    const response = await axios.post("http://34.133.77.198/api/signup",{username,email, password})
    if (response.status === 200){
      alert('Registeration Successfull')
      history("/login")
    }else{
      alert('registration failed')
    }
    
  }
  
  return (
    <div>
      {navMemo}
      <div class="signup-overlay" id="sign-up">
            <form class="form-container" action='POST' onSubmit={submit}>
              <h1>Sign Up</h1>

              <label htmlFor="username"><b>Username</b></label>
              <input type="username" placeholder="Enter Username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
          
              <label htmlFor="email"><b>Email</b></label>
              <input type="email" placeholder="Enter Email" name="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
          
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw"  value={password} onChange={e => setPassword(e.target.value)} required />
          
              <button type="submit" class="btn">Sign Up</button>
              <h5>Already have an account? <Link to='/login'>Login</Link></h5>
            </form>
        </div>
    </div>
  )
}
export default Signup
