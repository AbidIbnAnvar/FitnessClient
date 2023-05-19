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
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js';
import { CategoryScale, BarController, BarElement } from 'chart.js';
import { PointElement, LineController, LineElement } from 'chart.js';
Chart.register( PointElement, LineController, LineElement);

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

function CaloriesBurnGraph({workoutData}) {
  function getTotalCaloriesByDate(workoutData) {
    const totalCaloriesByDate = {};
    
    workoutData.forEach((entry) => {
      const date = entry.date;
      const calories = entry.workout_calories;
      
      if (totalCaloriesByDate[date]) {
        totalCaloriesByDate[date] += calories;
      } else {
        totalCaloriesByDate[date] = calories;
      }
    });
  
    const chartLabels = Object.keys(totalCaloriesByDate);
    const totalCaloriesData = Object.values(totalCaloriesByDate);
  
    return { chartLabels, totalCaloriesData };
  }
  
  
  const { chartLabels, totalCaloriesData } = getTotalCaloriesByDate(workoutData);

  

      const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: 'Total Calories Burned',
            data: totalCaloriesData,
            fill: true,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 5,
            backgroundColor:'rgb(255, 0, 0)',
            tension: 0.1,
          },
        ],
      };





const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Calories',
        font: {
          weight: 'bold',
          
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', 
      },
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
        stepSize: 100,
      },
    },
    x:{
      beginAtZero:false,
      title: {
        display: true,
        text: 'Date',
        font: {
          weight: 'bold',
          
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', 
      },
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
    }
  },
  maintainAspectRatio: true,
  responsive: true,
  width: 400,
  height: 200,
};

return (
  <div>
    <h2>Calories Burned Per Day</h2>
    <div className='graph' style={{ width: '900px', height: '350px' }}>
      <Line className='line-graph'  data={chartData} options={chartOptions} />
    </div>
    
  </div>
);
}





function UserHome() { 
  const [token, setToken] = useState(null);
  const [username,setUsername] =useState(null)
  const [workoutData,setWorkoutData]=useState([])
   useEffect(()=>{
     const fetchData= async ()=> {
      const response= await axios.get('http://localhost:8080/user/get', {
        withCredentials: true 
      })
      setUsername(response.data.username)
      console.log(username)
      const workout_response= await axios.get(`http://localhost:8080/user/get-workout`, {
        withCredentials: true,
        params:{
          username:username 
        }
      }).then((res)=>{setWorkoutData(res.data)})
      
      
     }
     
     fetchData() 
   },[username])

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
      <div className="home-header-user">
        <UserHeader />
      </div>
      <div className="navigation-user">
          <ul>
            <li><Link to="/user/home" className='nav-active'>Dashboard</Link></li>
            <li><Link to="/user/workout-tracker">Workout Tracker</Link></li>
            <li><Link to="/user/forum" className=''>Forum</Link></li>
          </ul>
        </div>
      <div className="graph">
        <CaloriesBurnGraph workoutData={workoutData} />
      </div>
    </div>
  )
}

export default UserHome
