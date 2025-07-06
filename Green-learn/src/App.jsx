// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Program from './Components/Programs/Program';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Testimonials from './Components/Testimonials/Testimonials';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import VideoPlayer from './Components/VidePlayer/VideoPlayer';
import Puzzle_1 from './Pages/Puzzle';
import Puzzle_2 from './Pages/Puzzle_2';
import Puzzle_3 from './Pages/Puzzle_3';
import Puzzle_4 from './Pages/Puzzle_4';
import Puzzle_5 from './Pages/Puzzle_5';
import PuzzleCards from './Components/PuzzleCards/PuzzleCards';
import VideoCards from './Components/VideoCards/VideoCards';
import GamePage from './Components/GamePage/GamePage';  // Adjust path as needed


import Video  from './Components/Video/Video';

import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Puzzle from './Pages/Puzzle'

const ScrollToHero = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToHero) {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const Home = ({ setPlayState }) => (
  <>
    <Navbar />
    <Hero />
    <div className='container'>
      <Title subTitle='Our Program' Title='Interactive Eco-Education' />
      <Program />
      <About setPlayState={setPlayState} />
      <Title subTitle='TESTIMONIALS' Title='What Parents Say' />
      <Testimonials />
      <Title subTitle='CONTACT US' Title='Get in Touch' />
      <Contact />
      <Footer />
    
    </div>
  </>
);

const App = () => {
  const [playState, setPlayState] = useState(false);


  
  useEffect(() => {
    // Chatbase Script
    const chatScript = document.createElement('script');
    chatScript.innerHTML = `(function(){
      if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...arguments)=>{
          if(!window.chatbase.q){window.chatbase.q=[]}
          window.chatbase.q.push(arguments)
        };
        window.chatbase=new Proxy(window.chatbase,{
          get(target,prop){
            if(prop==="q"){return target.q}
            return(...args)=>target(prop,...args)
          }
        })
      }
      const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="-kj49rfOkQYthyn-HPerl";
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
      };
      if(document.readyState==="complete"){onLoad()}
      else{window.addEventListener("load",onLoad)}
    })();`;
    document.head.appendChild(chatScript);

    // Elfsight Script
    const elfsightScript = document.createElement('script');
    elfsightScript.src = 'https://static.elfsight.com/platform/platform.js';
    elfsightScript.async = true;
    document.body.appendChild(elfsightScript);
  }, []);


  return (
    <Router>
      <ScrollToHero />
      <Routes>
        <Route path="/" element={<Home setPlayState={setPlayState} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/puzzlecard" element={<PuzzleCards />} />
        <Route path="/puzzle2" element={<Puzzle_2 />} />
        <Route path="/puzzle3" element={<Puzzle_3 />} />
        <Route path="/puzzle4" element={<Puzzle_4 />} />
        <Route path="/puzzle5" element={<Puzzle_5 />} />
        <Route path ="/videocards" element ={<VideoCards/>}/>
         <Route path="/game" element={<GamePage />} />
          <Route path="/program" element={<Program />} />
          <Route path="/video/:id" element={<Video />} />


      </Routes>
      <VideoPlayer playState={playState} setPlayState={setPlayState} />

      {/* ✅ Toast notifications for all routes */}
      <ToastContainer />
    </Router>
  );
};

export default App;
