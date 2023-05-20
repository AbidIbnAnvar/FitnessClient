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
import { Doughnut } from 'react-chartjs-2'

import { Chart, LinearScale,ArcElement,Filler } from 'chart.js';
import { CategoryScale, BarController, BarElement } from 'chart.js';
import { PointElement, LineController, LineElement } from 'chart.js';
Chart.register(ArcElement, PointElement, LineController, LineElement,);

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
            fill: false,
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
  const [todaysCalories, setTodaysCalories] = useState(0); 
   useEffect(()=>{
     const fetchData= async ()=> {
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

      // const today = new Date().toISOString().slice(0, 10);
      const currentDate = Date.now();
      const today = formatDate(currentDate);
      const todaysData = workoutData.filter((entry) => entry.date === today);
      console.log(todaysData)
      const todaysCalories = todaysData.reduce((sum, entry) => sum + entry.workout_calories, 0);
      setTodaysCalories(todaysCalories);
      
     }
     
     fetchData() 
   },[username,workoutData])

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

   const doughnutChartData = {
    labels: ['Calories Burned', 'Calories Remaining'],
    datasets: [
      {
        label: 'Calories',
        data: [todaysCalories, 1500 - todaysCalories],
        backgroundColor: ['rgb(255,0,0)', 'rgb(60,60,60)'],
        borderColor: 'transparent' ,
        hoverOffset:4,
 
      },
      
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories Burned Today',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  function getUsernameFromToken(token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.username;
  }

  const location=useLocation()
  const {setUserInfo,userInfo} = useContext(UserContext)
  function logout(){
    fetch('http://34.133.77.198/api/logout',{
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
      <div className='doughnut-chart'>
        <h2>Calories Burned Today</h2>
        <h3>Target:1500 cal</h3>
        {/* <div style={{ width: '400px', height: '400px' }}>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div> */}
        <div className='ring'>
        <svg class="ActivityRings" viewBox="0 0 45 45">
    <g class="ring ring1"   >
        <circle class="background"
            cx="50%" cy="50%"
            stroke-width="3.7" 
            r="15.915" /> 
        <circle class="completed"
            cx="50%" cy="50%"
            stroke-width="3.7" 
            r="15.915"
            stroke-dasharray="85, 100" />
    </g>
    <g class="ring ring2" >
    <circle class="background"
            cx="50%" cy="50%"
            r="15.915"
            stroke-width="4.7" />
        <circle class="completed"
            cx="50%" cy="50%"
            r="15.915"
            stroke-width="4.7"
            stroke-dasharray="55, 100" />
</g>

<g class="ring ring3" >
    <circle class="background"
            cx="50%" cy="50%"
            r="15.915"
            stroke-width="7.3" />
        <circle class="completed"
            cx="50%" cy="50%"
            r="15.915"
            stroke-width="7.3"
            stroke-dasharray="100, 100" />
</g>

</svg>
</div>
      </div>
    </div>
  )
}

export default UserHome
