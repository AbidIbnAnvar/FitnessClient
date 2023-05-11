import React from 'react'
import './Service.css'
import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Service() {
  const navMemo = useMemo(()=>{
    return <Navbar /> 
},[])

  return (
    <div>
      <Navbar />
      <section class="service-main">
            <div class="services-image-container">
                <img class="services-image1" src="/images/anastase-maragos-YVz1LxVJqoA-unsplash.jpg" alt="" />
                <div class="services-textblock">
                    <h1>SERVICES WE PROVIDE</h1>
                    <div class="services-details">
                        <p><b>WORKOUT PLANS</b> We offer pre-designed workout plans that are tailored to specific goals, such as weight loss, muscle gain, or endurance training.</p>
                        <p><b>NUTRITION ADVICE</b> We provide nutrition advice, including meal plans and recipes to help users achieve their fitness goals.</p>
                        <p><b>EXERCISE VIDEOS</b> We have a library of exercise videos that users can access to learn proper form and technique for different exercises.</p>
                        <p><b>COMMUNITY SUPPORT</b> We can offer a community forum or social media platform where users can connect with like-minded individuals to share tips, motivation, and support.</p>
                        <p><b>PERSONALIZED COACHING</b> We offer personalized coaching services, where users can work one-on-one with a coach to develop a personalized fitness plan and receive ongoing support.</p>
                        <p><b>FITNESS TRACKING</b> We offer tools for users to track their progress, such as workout logs, weight trackers, and nutrition diaries.</p>
                    </div>
                </div>
            </div>     
        </section>
        <Footer />
    </div>
  )
}

export default Service
