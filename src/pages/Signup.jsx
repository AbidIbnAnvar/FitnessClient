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
  // const [username,setUsername] = useState('');
  // const [email,setEmail] = useState('');
  // const [password,setPassword] = useState('');
  // async function register(ev){
  //   ev.preventDefault();
  //   await fetch('http://localhost:3000/signup', {
  //     method: 'POST',
  //     body: JSON.stringify({username,email,password}),
  //     headers: {'Content-Type':'application/json'},
  //   })
  // }
  const history=useNavigate();
  const [username,setUsername] = useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  async function submit(e){
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/signup",{username,email, password})

    // const response= await fetch("http://localhost:8080/signup",{
    //     method:'POST',
    //     body: JSON.stringify({username,email,password}),
    //     headers: {'Content-type':'application/json'}
    //   })
    if (response.status === 200){
      alert('Registeration Successfull')
      history("/login")
    }else{
      alert('registration failed')
    }
    


    //   await axios.post("http://localhost:3000/signup", {username,email,password})
    //   .then(res=>{
    //     if(res.data=="exist"){
    //       alert("User has already logged")
    //     }else if(res.data=="does not exist"){
    //       history("/user/home",{state:{id:username}})
    //     }
    //   })
    //   .catch(e=>{
    //     alert("Wrong details")
    //     console.log(e)
    // })

    // } catch (e) {
    //   console.log(e);
      
    // }
  }
  
  return (
    <div>
      {navMemo}
      <div class="signup-overlay" id="sign-up">
            <form class="form-container" action='POST' onSubmit={submit}>
              <h1>Sign Up</h1>

              <label for="username"><b>Name</b></label>
              <input type="username" placeholder="Enter Full Name" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
          
              <label for="email"><b>Email</b></label>
              <input type="email" placeholder="Enter Email" name="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
          
              <label for="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw"  value={password} onChange={e => setPassword(e.target.value)} required />
          
              <button type="submit" class="btn">Sign Up</button>
              <h5>Already have an account? <Link to='/login'>Login</Link></h5>
            </form>
        </div>
    </div>
  )
}
export default Signup
