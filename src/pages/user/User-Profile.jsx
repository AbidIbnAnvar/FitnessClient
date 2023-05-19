import React, { useState} from 'react'
import { useEffect } from 'react'
import './User-Profile.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserProfile() {
  const [username,setUsername] =useState(null);
  const [email,setEmail] =useState(null);
  const [weight,setWeight] =useState(null);
  const [height,setHeight] =useState(null)
  const [editMode,setEditMode] = useState(false);
  const edit=()=>{
    setEditMode(!editMode)
  }
   useEffect(()=>{
     const fetchData= async ()=> {
      const response= await axios.get('http://localhost:8080/user/get', {
        withCredentials: true
      })
      setUsername(response.data.username)
      setEmail(response.data.email)
      setWeight(response.data.weight)
      setHeight(response.data.height)
     }
     fetchData() 
   },[])

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, weight, height }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }


      const updatedUser = await response.json();
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);
      setWeight(updatedUser.weight);
      setHeight(updatedUser.height);
    } catch (error) {
      console.error(error);
    }
  };
  var bmi;
  
  if(height && weight){
    bmi=(weight)/(Math.pow(height/100,2))
  }

   async function submit(e){
     e.preventDefault();

     const response= await fetch("http://localhost:8080/user/details",{
        method:'PATCH',
        body: JSON.stringify({username,email,weight,height}),
        headers: {'Content-type':'application/json'},
        credentials: 'include',
      })
      console.log(response)
      if (response.status === 200){
        alert("Edit completed")
      }else{
        alert('Unable to edit')
      }
  }

  return (
    <div className='user-profile-details'>
      <div className='left-arrow'>
        <Link to='/user/home'><i className="fa-solid fa-arrow-left"></i></Link>
        </div>
      <h1 className="user-details">USER DETAILS</h1>
      <div className="input-profile">
        <form className='user-details-form'>
        <label htmlFor="username">Username:</label>
        <h2>{username}</h2>
        <label htmlFor="email">Email:</label>
        {editMode?<input type="text" name="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder={email} />:<h2>{email}</h2>}
        <label htmlFor="weight">Weight (In kg):</label>
        {editMode?<input type="text" name="weight" onChange={(e)=>{setWeight(e.target.value)}} placeholder={weight} />:<h2>{weight?weight:<>Not Set</>}</h2>}
        <label htmlFor="height">Height (In cm):</label>
        {editMode?<input type="text" name="height" onChange={(e)=>{setHeight(e.target.value)}} placeholder={height} />:<h2>{height?height:<>Not Set</>}</h2>}
        {(editMode)?<></>:(height && weight)?<><label htmlFor="bmi">BMI:</label><h2>{bmi}</h2></>:<><label htmlFor="bmi">BMI:</label><h2>Can't Be Calculated</h2></>}
        </form>
        {editMode?<><button type='submit' className='edit-button'  onSubmit={submit} onClick={()=>{edit();handleUpdate();}}>Save</button> <button className='cancel-button'  onClick={edit}>Cancel</button></>:<button type='submit'  className='edit-button' onClick={edit}>Edit</button>}
      </div>
    </div>
  )
}

export default UserProfile
