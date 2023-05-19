import React from 'react'
import './Pricing.css'
import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Pricing() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
},[])

  return (
    <div>
      {navMemo}
      <section className="pricing-main">
        <h1>PRICING</h1>
        <h3>Choose one of the plans to access our services</h3>
            <div className="boxes">
                <div className="box1">
                    <h2 className="box-heading">BASIC</h2>
                    <div className="price-container"><h6><div className="price">$19</div>/MONTH</h6></div>
                    <div className="box-contents">
                      <ul>
                        <li>Workout Tracker</li>
                        <li className='not-available'>Community Forum</li>
                        <li className='not-available'>Personal Coaching</li>
                      </ul>
                    </div>
                </div>
                <div className="box2">
                    <h2 className="box-heading">PLUS </h2>
                    <div className="price-container"><h6><div className="price">$29</div>/MONTH</h6></div>
                    <div className="box-contents">
                      <ul>
                        <li>Workout Tracker</li>
                        <li>Community Forum</li>
                        <li className='not-available'>Personal Coaching</li>
                      </ul>
                    </div>
                    <div className="best-value">BEST VALUE</div>
                </div>

                <div className="box3">
                    <h2 className="box-heading">PRO</h2>
                    <div className="price-container"><h6><div className="price">$49</div>/MONTH</h6></div>
                    <div className="box-contents">
                      <ul>
                        <li>Workout Tracker</li>
                        <li>Community Forum</li>
                        <li>Personal Coaching</li>
                      </ul>
                    </div>
                    
                </div>
                
                
            </div>
      </section>
      <Footer />
    </div>
  )
}

export default Pricing
