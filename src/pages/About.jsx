import React from 'react'
import './About.css'
import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {

  const navMemo = useMemo(()=>{
    return <Navbar /> 
},[])
  return (
    <div>
      {navMemo}
      <section class="about-main">
        
            <div class="about-image-container">
                <img class="about-image1" src="/images/brandon-holmes-GofYo51GQ_4-unsplash.jpg" alt="" />
                <div class="about-textblock">
                    <h1>MORE ABOUT US</h1>
                    <p><b>Mission:</b> Our mission is to empower individuals to live healthier and happier lives by providing them with the resources, guidance, and support needed to achieve their fitness goals.</p>
                    <p><b>Vision:</b> Our vision is to be the go-to destination for individuals seeking to improve their physical and mental well-being through fitness.</p>
                    <p><b>Values:</b> We are committed to delivering exceptional customer service, providing a welcoming and inclusive environment for all, promoting health and wellness in all aspects of life, and upholding the highest standards of integrity and professionalism in all that we do.</p>
                    <p>Our fitness website offers a wide range of facilities and services designed to help individuals achieve their fitness goals. Some of the equipment and amenities we offer include:</p>

                    <ol>State-of-the-art gym equipment: Our gym is equipped with the latest cardio and strength training equipment to help you get the most out of your workout.</ol>
                        
                    <ol>Personal training: Our certified personal trainers offer customized training programs tailored to your specific fitness goals and needs.</ol>
                        
                    <ol>Group fitness classes: We offer a variety of group fitness classes, including Pilates, spinning, and HIIT, led by experienced instructors.</ol>
                        
                    <ol>Nutrition guidance: Our nutritionists offer personalized nutrition guidance and meal plans to help you fuel your body for optimal performance.</ol>
                        
                    <ol>Virtual training: We offer virtual training sessions for individuals who prefer to workout from the comfort of their own home.</ol>
                        
                    <ol>Sauna and steam rooms: Our facilities include sauna and steam rooms, perfect for relaxing and rejuvenating after a workout.</ol>
                        
                    <ol>Sports therapy and massage: We offer sports therapy and massage services to help prevent and treat injuries and promote faster recovery.</ol>
                        
                    <p>Our facilities and amenities are designed to provide individuals with everything they need to achieve their fitness goals, from state-of-the-art equipment to expert guidance and support.</p>
                </div>
            </div>     
        </section>
      <Footer />
    </div>
  )
}

export default About
