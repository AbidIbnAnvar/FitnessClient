import React, { useEffect, useRef, useState } from 'react'
import UserHeader from './User-Header'
import './User-Forum.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMemo } from 'react'

function UserForum() {
  const [createMode,setCreateMode] = useState(false);
  const [forumData,setForumData]=useState();
  const[username,setUsername]=useState(null)
  const [message,setMessage] =useState(null);
  // const [no,setNo]= useState(null)
  var no;
  useEffect(()=>{
    const fetchData= async ()=> {
     const response= await axios.get('http://localhost:8080/user/forum-details', {withCredentials: true}).then(res=>{
      setForumData(res.data)
     })
    }
    const fetchUsername= async ()=> {
      const response= await axios.get('http://localhost:8080/user/get', {
        withCredentials: true // Include cookies in the request
      })
      setUsername(response.data.username)
      
    }
    fetchData()
    fetchUsername()
  },[])

  async function post(){
    no= forumData.length +1

    const response= await fetch("http://localhost:8080/user/post-details",{
       method:'POST',
       body: JSON.stringify({no,username,message}),
       headers: {'Content-type':'application/json'},
       credentials: 'include',
     })
     if (response.status === 200){
       alert("Posted")
     }else{
       alert('Unable to post')
     }
     const post_response= await axios.get('http://localhost:8080/user/forum-details', {withCredentials: true}).then(res=>{
      setForumData(res.data)
     })
 } 
  
  
  
  const changeCreateMode =()=>{
    setCreateMode(!createMode)
  }
  const ref = useRef(null);

  const handleInput = (e) => {
  if (ref.current) {
    ref.current.style.height = "auto";
    ref.current.style.height = `${e.target.scrollHeight -40}px`;
  }};
  const HeaderMemo = useMemo(()=>{
    return <UserHeader /> 
},[])

  return (
    <div className='user-forum'>
      {HeaderMemo}
      <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className=''>Dashboard</Link></li>
            <li><Link to="/user/fitness-videos">Workout Tracker</Link></li>
            <li><Link to="/user/forum" className='nav-active'>Forum</Link></li>
          </ul>

        </div>
      <div className="forum-main">
      <form>
      {createMode?
      <div className='create-post'>
        <label htmlFor="message">Enter Post</label>
        <textarea ref={ref} id="post-message" name="message" rows={1} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Enter message' onInput={handleInput}></textarea>
      </div>:
      <></>}
      {createMode?
      <div>
        <button type='submit' className='post-button' onSubmit={post} onClick={()=>{post();changeCreateMode();}}>Create Post</button>
        <button className='cancel-post-button' onClick={changeCreateMode}>Cancel</button>
      </div>
      :<button type='submit' onClick={changeCreateMode} className='create-button'>
        <i className="fa-solid fa-plus"></i>Create New Post
      </button>}
      <div className='forum-data'>
       {(forumData)?
       forumData.map((post)=><p><div className="post-no">{post.no}</div><div>{post.message}</div><div className='post-username'>Posted by {post.username}</div></p>)
       :<p></p>}
       </div>
       </form>
      </div>
    </div>
  )
}

export default UserForum
