// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect} from 'react'
import './App.css'
import Cookies from 'universal-cookie'
import jwt from "jwt-decode"
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

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
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

