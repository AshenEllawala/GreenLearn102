// src/components/Program/Program.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Program.css'
import Educational_Games from '../../assets/educational-games.png'
import Interactive_Learning from '../../assets/interactive-learning.png'
import Nature_Connection from '../../assets/nature-connection.png'
import Educational_Games_Icon from '../../assets/game-icon.png'
import Interactive_Learning_Icon from '../../assets/interactive-learning-icon.png'
import Nature_Connection_Icon from '../../assets/nature-connection-icon.png'

const Program = () => {
  const navigate = useNavigate()

 

  return (
    <div className='programs'>
<div className='program' onClick={() => navigate('/videocards')}>
    <img src={Interactive_Learning} alt="" />
    <div className='caption'>
      <img src={Interactive_Learning_Icon} alt="" />
      <p>Interactive Learning</p>
    </div>
</div>
    <div className='program' onClick={() => navigate('/game')}>
        <img src={Educational_Games} alt="" />
        <div className='caption'>
            <img src={Educational_Games_Icon}/>
            <p>Educational Games</p>
        </div>
    </div>
    <div className='program'       onClick={() => navigate('/puzzlecard')}           >
        <img src={Interactive_Learning} alt="" />
        <div className='caption'>
            <img src={Interactive_Learning_Icon}/>
            <p>Interactive Learning</p>
        </div>
    </div>     
</div>
  )
}

export default Program
