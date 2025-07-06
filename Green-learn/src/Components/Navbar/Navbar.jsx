import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
     const[sticky,setSticky]=useState(false);
     const navigate = useNavigate();


     useEffect(()=>{
            window.addEventListener('scroll', () =>{
            window.scrollY > 400 ? setSticky(true) : setSticky (false);
          })
     },[])

  return (
    <nav className={` ${sticky? 'dark-nav':''}`}>
        <img src={logo} alt="" className='logo' />
        <ul >
           <li><Link to ='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
           <li><Link to ='program' smooth={true} offset={-260} duration={500}>Learn</Link></li>
           <li><Link to ='about' smooth={true} offset={-190} duration={500}>About us</Link></li>
           <li><Link to ='testimonials' smooth={true} offset={-340} duration={500}>Testimonials</Link></li>
          <li><Link to ='contact' smooth={true} offset={-260} duration={500}>Contact us</Link></li>
          
            <li><button className='btn' onClick={() => navigate('/login')}>Sign in</button></li>
        </ul>
    </nav>
  )
}

export default Navbar