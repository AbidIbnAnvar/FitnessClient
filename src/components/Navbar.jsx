import { Component } from 'react'
import { useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { MenuItems } from './MenuItems'
import {NavLink} from 'react-router-dom'
import {MenuDropdownItems} from './MenuDropdownItems'


class Navbar extends Component{
    state = { clicked: false}
    handleClick =() =>{
        this.setState({clicked : !this.state.clicked})
        if (this.state.clicked) {
            document.getElementById("menu-dropdowns").style.display ='none'
        } else{
            document.getElementById("menu-dropdowns").style.display ='block'
        }
    }

    closeDropdown =() => {
        document.getElementById("menu-dropdowns").style.display='none'
        document.getElementById("menu-icon").className="fas fa-bars"
    }


    render(){
        
        return (
            <nav className='topnav'>
                <div className="navbar">
                    <div className="links">
                    {MenuItems.map((item, index)=>{
                        return(
                            <li key={index}>
                                <NavLink activeClassName="active" to={item.url} className={item.cName}> {item.title}</ NavLink>
                            </li>
                        )
                    })}
                    </div>
                     <div className="menu-container"><button className='menu-button' onClick={this.handleClick}>
                        <i id='menu-icon' className={this.state.clicked ? 'fas fa-times':'fas fa-bars'}></i>
                     </button>
                    </div>
                    <div className="login-button">
                        <Link to='/login'><button>SIGN IN</button></Link>
                    </div>
                    </div>
                    <div className='menu-dropdowns' id='menu-dropdowns'>

                    {MenuDropdownItems.map((item, index)=>{
                        return(
                            <li key={index}>
                                <NavLink activeClassName="active" to={item.url} className={item.cName}onClick={this.closeDropdown}> {item.title}</ NavLink>
                            </li>
                        )
                    })}
                    </div>
               

            </nav>
        )
    }
}

export default Navbar
