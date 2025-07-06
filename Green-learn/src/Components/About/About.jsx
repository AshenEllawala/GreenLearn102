import React from 'react'
import './About.css'
import about_img from '../../assets/about_us.png'
import play_icon from '../../assets/play_icon.png'

const About = ({setPlayState}) => {
  return (
    <div className='about'id='about'>
        <div className="about-left">
           <img src={about_img} alt="" className='about-img'/>
           <img src={play_icon} alt="" className='play-icon'onClick={()=>{setPlayState(true)}}/>
        </div>
        <div className="about-right">
            <br />
           <h3>ABOUT GREENLEARN</h3>
           <h2>Nurturing Young Minds for a Greener Tomorrow</h2>
           <p>GreenLearn is an interactive educational platform designed to inspire and educate
             children about the environment. Our mission is to plant the seeds of eco-consciousness 
             in young minds through engaging lessons, fun mini-games, and hands-on learning experiences.</p>

            <p>We believe that by making learning fun and meaningful, we can help raise 
                a generation that values sustainability, understands nature, 
                and takes action to protect our planet.</p>
  
            <p>GreenLearn is a passion-driven project developed by Ashen Ellawala, Minidu Thiranjaya, Muditha Madhushan, Sanka Yashodana, and Praveen Kalansooriya —
                 a group of dedicated students from the University of Kelaniya committed to building a 
                 greener and more informed future through engaging and interactive environmental education.</p>          

        </div>

    </div>
  )
}

export default About