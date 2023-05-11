import React from 'react'
import './Contact.css'
import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
    const navMemo = useMemo(()=>{
        return <Navbar /> 
    },[])

  return (
    <div>
    {navMemo}
      <section class="contact-main">
            <div class="contact-textblock">
                <h1>CONTACT US</h1>
                <div class="contacts">
                    <div class="contact1">
                        <div class="icons"><span class="material-symbols-rounded">
                            location_on</span>
                        </div>
                        <div class="icon-text">Our Location</div>
                        <div className="box-contents">
                        <ul>
                            <li>National Institute of Technology</li>
                            <li>P.O 673601</li>
                            <li>Kattangal</li>
                            <li>Calicut</li>
                        </ul>
                    </div>  
                        
                    </div>
                    <div class="contact2">
                        <div class="icons"><span class="material-symbols-rounded">
                            call</span>
                        </div>
                        <div class="icon-text">Call us</div>
                        <div className="box-contents">
                        <ul>
                            <li>+91 7418950210</li>
                            <li>+91 6238873294</li>
                            <li>+91 8592915952</li>
                            <li>+91 8129374789</li>
                        </ul>
                    </div>  
                    </div>
                    <div class="contact3">
                        <div class="icons"><span class="material-symbols-rounded">
                            mail</span>
                        </div>
                        <div class="icon-text">Email us</div>
                        <div className="box-contents">
                        <ul>
                            <li>abid_b220004cs@nitc.ac.in</li>
                            <li>adil_b220005ee@nitc.ac.in</li>
                            <li>ajmalrishdin@gmail.com</li>
                            <li>jaefarshameem@gmail.com</li>
                        </ul>
                    </div>  
                    </div>
                </div>
            </div>
        </section>
    <Footer />
    </div>
  )
}

export default Contact
