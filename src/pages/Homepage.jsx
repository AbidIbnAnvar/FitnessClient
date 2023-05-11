import React from 'react'
import './Homepage.css'
import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function Home() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
},[])

  return (
    <>
    {navMemo}
    <div className='home-main'>
      
      <div className="image1-container">
            <img className="image1"src="/images/sven-mieke-MsCgmHuirDo-unsplash2.jpg" alt="Picture of GYM" />
            <div className="textblock">
                <h1>ARE YOU READY?</h1> 
                <p>You are capable of so much more than you think. Believe in yourself and push yourself to reach your full potential through exercise.Don't let excuses hold you back. You owe it to yourself to prioritize your health and well-being. Take the first step towards a healthier you by starting your workout today.</p>
                <button className="join-now"><Link to='/pricing'><span>Join Now </span></Link></button>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home
