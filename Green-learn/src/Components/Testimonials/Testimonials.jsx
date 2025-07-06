import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user from '../../assets/user.png'
import user_2 from '../../assets/user_2.png'


const Testimonials = () => {
     const slider = useRef();
     let tx = 0;

const slideForward = ()=>{
    if(tx > -50){
       tx -= 25; 
    }
    slider.current.style.transform =`translateX(${tx}%)`;

}
const slideBackward = ()=>{
    if(tx < 0){
        tx += 25; 
     }
     slider.current.style.transform =`translateX(${tx}%)`;
 
    
}

  return (
    <div className='testimonials'>
      <img src={next_icon} alt="" className='next-btn' onClick={slideForward} />
      <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
      <div className="slider">
        <ul ref={slider}>
        <li>
                <div className='slide'>
                        <div  className='user-info'>
                        <img src={user} alt="" />
                        <div>
                            <h3>Nimal Jayasuriya</h3>
                            <span>Kandy, Sri Lanka</span>
                        </div>
                        </div>
                        <div>
                        <p className='user-des'>My son loves the mini-games on GreenLearn. Not only is he having fun, 
                            but he’s also learning important lessons about nature. This is a great tool for parents 
                            who want their kids to learn with purpose.</p>
                        </div>  
                </div>
             </li>
             <li>
                <div className='slide'>
                        <div  className='user-info'>
                        <img src={user_2} alt="" />
                        <div>
                            <h3>Sewwandi Dissanayake</h3>
                            <span>Galle, Sri Lanka</span>
                        </div>
                        </div>
                        <div>
                        <p className='user-des'>GreenLearn helped my child understand how we can protect the environment. 
                            The interactive lessons are simple and colorful — perfect for young learners. 
                            Highly recommended!</p>
                        </div>  
                </div>
             </li>
             <li>
                <div className='slide'>
                        <div  className='user-info'>
                        <img src={user} alt="" />
                        <div>
                            <h3>Ashoka Kalansooriya</h3>
                            <span>Galle, Sri Lanka</span>
                        </div>
                        </div>
                        <div>
                        <p className='user-des'>It’s wonderful to see my child so engaged in learning. 
                            GreenLearn’s fun and friendly approach makes a big difference. 
                            He even teaches us what he learns!</p>
                        </div>  
                </div>
             </li>
             <li>
                <div className='slide'>
                        <div  className='user-info'>
                        <img src={user} alt="" />
                        <div>
                            <h3>Kumari Perera</h3>
                            <span>Colombo, Sri Lanka</span>
                        </div>
                        </div>
                        <div>
                        <p className='user-des'>GreenLearn has made learning about the environment 
                            fun and exciting for my daughter. She now talks about trees, recycling,
                            and saving water every day. I’m so happy we found this platform!</p>
                        </div>  
                </div>
             </li>
        </ul>
     </div>
    </div>
  )
}

export default Testimonials