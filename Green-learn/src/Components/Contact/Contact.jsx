import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'


const Contact = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "a9ce52a7-0248-4d23-9f70-f4bedd876f90");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };


  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Send us a message <img src={msg_icon} /></h3>
            <p>Contact us via our form or find our details below. 
                Your feedback helps us enhance GreenLearn’s mission to educate 
                and inspire young learners on environmental protection.
            </p>
            <ul>
                <li><img src={mail_icon} alt="" />teamgreenlearn@gmail.com</li>
                <li><img src={phone_icon} alt="" />+94-123-5678-90</li>
                <li><img src={location_icon} alt="" />No. 123, Galle Road,<br/>Colombo 03, Sri Lanka</li>
            </ul>
        </div>
        <div className="contact-col">
            <form onSubmit={onSubmit}>
                <label >Parent's Name</label>
                <input type="text" name="name" placeholder="Enter your name" required/>
                <label >Phone Number</label>
                <input type="tel" name="tel" placeholder="Enter your mobile number" required/>
                <label >Write Your Message Here</label>
                <textarea name="message"  rows="6" placeholder='Share your questions, feedback, or suggestions with us' required></textarea>
                <button type='submit' className='dark-green-btn'>Submit now </button>
            </form> 
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact