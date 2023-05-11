import "./Footer.css"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div className="top-left">
                    <div>
                    <Link to='/'>Home</Link>
                    <Link to='/service'>Services</Link>
                    <Link to='/pricing'>Pricing</Link>
                    <Link to='/contact'>Contact Us</Link>
                    <Link to='/about'>About Us</Link>
                    </div>
                </div>
                <div className="top-right">
                    <h4>GET FITNESS TIPS FOR FREE</h4>
                    <h5>Enter your email to get free weekly fitness tips</h5>
                    <form class='input' action="/action_page.php">
                        <input type="text" id="email" name="email" placeholder="Enter your email..." />
                        <button className="subscribe-button"><span class="material-symbols-rounded">send</span></button> 
                    </form>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    )
}

export default Footer