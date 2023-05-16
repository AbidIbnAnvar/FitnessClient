import React, { useState } from 'react'
import UserHeader from './User-Header'
import './User-Fitness.css'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function UserFitness() {
  const[trackWorkout,setTrackWorkout]= useState(false)
  const[trackDuration,setTrackDuration]= useState(false)
  const[username,setUsername]=useState(null)
  const[workoutData,setWorkoutData]=useState()
  
  useEffect(()=>{
    const fetchUsername= async ()=> {
      const response= await axios.get('http://localhost:8080/user/get', {
        withCredentials: true // Include cookies in the request
      })
      setUsername(response.data.username)
    }
    const fetchWorkoutData = async()=>{
      const workout_response= await axios.get('http://localhost:8080/user/get-workout', {
        withCredentials: true,
        params:{
          username:username
        }
      }).then(res=>{
      setWorkoutData(res.data)})
    }
    fetchUsername()
    fetchWorkoutData()
  },[])


  const HeaderMemo = useMemo(()=>{
    return <UserHeader /> 
},[])


  const changeTrackWorkout =()=>{
    setTrackWorkout(!trackWorkout)
  }
  const changeTrackDuration =()=>{
    setTrackDuration(!trackDuration)
  }
  function TrackMode(){
    const[workoutName,setWorkoutName] =useState(null)
    const[workoutReps,setWorkoutReps]=useState(null)
    const[workoutDuration,setWorkoutDuration]= useState(null)
    const[workoutCalories,setWorkoutCalories]=useState(null)

    async function submitWorkout(){
      const response= await fetch("http://localhost:8080/user/add-workout",{
         method:'POST',
         body: JSON.stringify({username,workoutName,workoutReps,workoutDuration,workoutCalories}),
         headers: {'Content-type':'application/json'},
         credentials: 'include',
       })
       if (response.status === 200){
        alert("Workout added")
      }else{
        alert('Unable to add workout')
      }
      const workout_response= await axios.get('http://localhost:8080/user/get-workout', {
        withCredentials: true,
        params:{
          username:username
        }
      }).then(res=>{
      setWorkoutData(res.data)})
    }

    return(
      (trackDuration)?<div className='track-workout'>
      <div className="workout-name"><label htmlFor="workout-name">Workout Name</label><input type='text' name='workout-name' onChange={(e)=>{setWorkoutName(e.target.value)}} /></div>
      <div className="workout-duration"><label htmlFor="workout-duration">Duration</label><input type='number' name='workout-duration' onChange={(e)=>{setWorkoutDuration(e.target.value)}} /><button onClick={changeTrackDuration}>Reps</button></div><div className="workout-calories"><label htmlFor="workout-calories">Number of calories burned</label><input type='number' name='workout-calories' onChange={(e)=>{setWorkoutCalories(e.target.value)}} /></div><div className="track-workout-buttons">
          <button className='track-button' onClick={()=>{submitWorkout();changeTrackWorkout();}}>Track</button>
          <button className='workout-cancel-button' onClick={changeTrackWorkout}>Cancel</button>
          </div>
          </div>

      :<div className='track-workout'>
      <div className="workout-name"><label htmlFor="workout-name">Workout Name</label><input type='text' name='workout-name' onChange={(e)=>{setWorkoutName(e.target.value)}} /></div><div className="workout-reps"><label htmlFor="workout-reps">Number of reps</label><input type='number' name='workout-reps' onChange={(e)=>{setWorkoutReps(e.target.value)}} /><button onClick={changeTrackDuration}>Duration</button></div><div className="workout-calories"><label htmlFor="workout-calories">Number of calories burned</label><input type='number' name='workout-calories' onChange={(e)=>{setWorkoutCalories(e.target.value)}} /></div><div className="track-workout-buttons">
          <button className='track-button' onClick={()=>{submitWorkout();changeTrackWorkout();}}>Track</button>
          <button className='workout-cancel-button' onClick={changeTrackWorkout}>Cancel</button>
          </div>
          </div>)
  }
  

  return (
    <div className='user-fitness'>
      {HeaderMemo}
      <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className=''>Dashboard</Link></li>
            <li><Link to="/user/fitness-videos" className='nav-active'>Workout Tracker</Link></li>
            <li><Link to="/user/forum" className=''>Forum</Link></li>
          </ul>

        </div>
      <div class='workout-main'>
        <form>
          {(trackWorkout)?
          <TrackMode />
            :<button onClick={changeTrackWorkout} className='track-workout-button'>
            <i class="fa-solid fa-plus"></i>Track New Workout
          </button>
          }
        </form>
        <div className='workout-data'>
        {(workoutData)?
       workoutData.map((workout,index)=><p><div className="post-no">{index+1}</div><div>{workout.workout_name}</div><div>{(workout.workout_reps)?<p>{workout.workout_reps} reps</p>:<p>{workout.workout_duration} s</p> }</div><div>{workout.workout_calories} cal</div></p>)
       :<p></p>}
        </div>
      </div>
    </div>
  )
}

export default UserFitness
