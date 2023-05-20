import React, { useState } from 'react'
import UserHeader from './User-Header'
import './User-Fitness.css'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { DragDrop } from '../../components/DragDrop'

function UserFitness() {
  const[trackWorkout,setTrackWorkout]= useState(false)
  const[trackDuration,setTrackDuration]= useState(false)
  const[username,setUsername]=useState(null)
  const[workoutData,setWorkoutData]=useState([])
  const[displayData,setDisplayData]=useState(false)
  
  useEffect(()=>{
    const fetchWorkoutData = async()=>{
      const response= await axios.get('http://34.133.77.198/api/user/get', {
        withCredentials: true
      })
      setUsername(response.data.username) 
      const workout_response= await axios.get(`http://34.133.77.198/api/user/get-workout`, {
        withCredentials: true,
        params:{
          username:username 
        }
      }).then((res)=>{setWorkoutData(res.data)})
      
    }

    fetchWorkoutData()
    
    
    
  },[])

  async function deleteData(workout){
    const id =workout._id
    const response = await fetch("http://34.133.77.198/api/user/delete-workout",{
      method:'DELETE',
      body: JSON.stringify({id}), 
      headers: {'Content-type':'application/json'},
      credentials: 'include',
    })
    if (response.status === 200){
      alert("Deleted")
      setDisplayData(false)
      setWorkoutData(prevWorkoutData => prevWorkoutData.filter(item => item._id !== workout._id));
    }else{
      alert('Unable to delete')
    }
    const post_response= await axios.get('http://34.133.77.198/api/user/get-workout/', {withCredentials: true}).then(res=>{
    setWorkoutData(res.data)
   })
 }

  const HeaderMemo = useMemo(()=>{
    return <UserHeader /> 
},[])

function formatDate(date) {
  const currentDate = new Date(date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const day = currentDate.getDate();
  let suffix = 'th';

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
}


  const changeTrackWorkout =()=>{
    setTrackWorkout(!trackWorkout)
  }
  const changeTrackDuration =()=>{
    setTrackDuration(!trackDuration)
  }
  const changeDisplayData =()=>{
    setDisplayData(!displayData)
  }
  function TrackMode(){
    const[workoutName,setWorkoutName] =useState(null)
    const[workoutReps,setWorkoutReps]=useState(null)
    const[workoutDuration,setWorkoutDuration]= useState(null)
    const[workoutCalories,setWorkoutCalories]=useState(null)  

    async function submitWorkout(){
      const currentDate = Date.now();
      const date = formatDate(currentDate);
      const response= await fetch("http://34.133.77.198/api/user/add-workout",{
         method:'POST',
         body: JSON.stringify({username,workoutName,workoutReps,workoutDuration,workoutCalories,date}),
         headers: {'Content-type':'application/json'},
         credentials: 'include',
       })
       if (response.status === 200){
        alert("Workout added")
      }else{
        alert('Unable to add workout')
      }
      const workout_response= await axios.get('http://34.133.77.198/api/user/get-workout', {
        withCredentials: true,
        params:{
          username:username
        }
      }).then(res=>{
      setWorkoutData(res.data)})
    }

    return(
      (trackDuration)?<div className='track-workout'>
      <div className="workout-name"><label htmlFor="workout-name">Workout Name</label><input type='text' value={workoutName} name='workout-name' onChange={(e)=>{setWorkoutName(e.target.value)}} /></div>
      <div className="workout-duration"><label htmlFor="workout-duration">Duration</label><input type='number' name='workout-duration' onChange={(e)=>{setWorkoutDuration(e.target.value)}} /><button onClick={changeTrackDuration}>Reps</button></div><div className="workout-calories"><label htmlFor="workout-calories">Number of calories burned</label><input value={workoutCalories} type='number' name='workout-calories' onChange={(e)=>{setWorkoutCalories(e.target.value)}} /></div><div className="drag-drop-div"><DragDrop username={username} /></div><div className="track-workout-buttons">
          <button className='track-button' onClick={()=>{submitWorkout();changeTrackWorkout();}}>Track</button>
          <button className='workout-cancel-button' onClick={changeTrackWorkout}>Cancel</button>
          </div>
          </div>

      :<div className='track-workout'>
      <div className="workout-name"><label htmlFor="workout-name">Workout Name</label><input type='text' name='workout-name' onChange={(e)=>{setWorkoutName(e.target.value)}} /></div><div className="workout-reps"><label htmlFor="workout-reps">Number of reps</label><input type='number' name='workout-reps' onChange={(e)=>{setWorkoutReps(e.target.value)}} /><button onClick={changeTrackDuration}>Duration</button></div><div className="workout-calories"><label htmlFor="workout-calories">Number of calories burned</label><input type='number' name='workout-calories' onChange={(e)=>{setWorkoutCalories(e.target.value)}} /></div><div className="drag-drop-div"><DragDrop username={username} /></div><div className="track-workout-buttons">
          <button className='track-button' onClick={()=>{submitWorkout();changeTrackWorkout();}}>Track</button>
          <button className='workout-cancel-button' onClick={changeTrackWorkout}>Cancel</button>
          </div>
          </div>)
  }

  async function display(){
    const workout_response= await axios.get(`http://34.133.77.198/api/user/get-workout`, {
        withCredentials: true,
        params:{
          username:username 
        }
      }).then((res)=>{setWorkoutData(res.data)})
  }
  
  

  return (
    <div className='user-fitness'>
      {HeaderMemo}
      <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className=''>Dashboard</Link></li>
            <li><Link to="/user/workout-tracker" className='nav-active'>Workout Tracker</Link></li>
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
           {(displayData)?<><button onClick={()=>{changeDisplayData();}} className='hide-workouts'><i class="fa-solid fa-angle-up"></i>Hide Workouts
          </button>
          {(workoutData)?
       workoutData.map((workout,index)=>
       <p className='each-workout-data'>
        <div className="post-no">{index+1}</div>
        <div>{(workout.workout_name)?workout.workout_name:workout.sessionMesgs[0]['sport']}</div><div></div>
        <div>{(workout.workout_reps)?
        <>{workout.workout_reps} reps  done </>
        :
        <div className='workout-duration-data'>for {workout.workout_duration} s</div>
         }
         </div>
         <div>{workout.workout_calories} Cal burnt</div>
         <div className="post-username">{workout.date}</div>
         <button className='delete-data' onClick={(e)=>{e.preventDefault();deleteData(workout);setDisplayData(true)}}><i className="fa-solid fa-trash"></i></button>
         </p>)
       :
       <p></p>
       }
       </>
       :
       <button onClick={()=>{changeDisplayData();display();}} className='display-workouts'><i class="fa-solid fa-angle-down"></i>Display workouts
          </button>} 
          
        </div>
      </div>
    </div>
  )
}

export default UserFitness
