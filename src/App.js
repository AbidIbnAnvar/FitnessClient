import { useState, useEffect} from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Homepage.jsx'
import Service from './pages/Service'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserHome from './pages/user/User-Home'
import UserProfile from './pages/user/User-Profile'
import UserFitness from './pages/user/User-Fitness'
import UserForum from './pages/user/User-Forum'

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/service' element={<Service />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/home' element={<UserHome />} />
        <Route path='/user/profile' element={<UserProfile />} />
        <Route path='/user/workout-tracker' element={<UserFitness />} />
        <Route path='/user/forum' element={<UserForum/>} />
      </Routes>
      
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          <span class="material-symbols-rounded">
            keyboard_double_arrow_up
          </span>
        </button>
      )}
      

    </div>
  )
}

export default App

