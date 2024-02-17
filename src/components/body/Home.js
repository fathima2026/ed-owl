import React from 'react';
import "./Home.css"
import { useEffect } from 'react';
import Lottie from "lottie-react"
import animationData from "./animations/animation.json"
import registerData from "./animations/registeranimation.json"
import gamesData from "./animations/gamesanimation.json"
import notesData from "./animations/notesanimation.json"
import progressData from "./animations/progressanimation.json"
import leaderData from "./animations/leaderanimation.json"
import freegameData from "./animations/freegameanimations.json"
import {Link} from 'react-router-dom'

import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,MDBRow, MDBCol
} from 'mdb-react-ui-kit';
const Home = () => {

 useEffect(() => {
    document.title = 'Home'
    AOS.init();
 },[])
  return (
    <div className="shake">
        <div className="hero">
        <MDBRow>

            <MDBCol>  
                <div className='intro'>

                <h1>The HE digital learning companion app</h1>
                <p>Make your learning journey more interactive by using this game based learning app 
                        to engage with module specific formative tasks.<br/><br/> Ed Owl also enables you to check your learning progress 
                        and access supporting reading materials such as vlog, podcasts and more for your module!
                </p>
                <MDBBtn tag='a' href='/regrole' class="btn btn-secondary">Get Started</MDBBtn>
                <MDBBtn tag='a' href='https://youtu.be/N9efMxDuADI'  class="btn btn-danger">Video</MDBBtn>
                <MDBBtn tag='a' href='/games'  class="btn btn-warning">Play Games!</MDBBtn>
                </div>      
                <MDBBtn tag='a' href='https://www.bolton.ac.uk/news/university-of-boltons-ed-owl-app-receives-rave-reviews' class="btn btn-success" style={{backgroundColor:'#675de2',marginRight:'280px',color:'black'}}>More information</MDBBtn>

                
            </MDBCol>
            <MDBCol >                
                <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'600px',marginTop:'50px'}} animationData={animationData}></Lottie>
            </MDBCol>

        </MDBRow>

        </div>
       

        <div className='list-card'>

        
        <h1 data-aos="fade-zoom-in"  data-aos-duration="2000"  className="home-heading">Ed Owl Features</h1>



         <MDBRow className='list-item-card'>
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'350px',marginTop:'50px'}} animationData={registerData}></Lottie>
            </MDBCol>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000">Getting started</h2>
            <p data-aos="fade-up"  data-aos-duration="2000">Students and Teachers can get started by creating a free account! Click on the button below to view the sign-up form! Note that you will not be able to view your dashboard until it is authorized, till then you can play free games!</p>
            <MDBBtn color='danger'>Sign Up</MDBBtn> 
            </MDBCol>
         </MDBRow>

         <MDBRow className='list-item-card'>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000" >Games, learning and HE</h2>
            <p data-aos="fade-up"  data-aos-duration="2000" >Each module will consist of games like hangman,puzzles, multiple choice questions and assignments based on topic! Browse or participate in subject specific tasks at your own time.</p>
            <br /> <MDBBtn color='danger'>See Tasks</MDBBtn>     
            </MDBCol>    
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'350px'}} animationData={gamesData}></Lottie>
            </MDBCol>
         </MDBRow>

         <MDBRow className='list-item-card'>
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'450px',width:'450px'}} animationData={freegameData}></Lottie>            </MDBCol>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000" >Play free 3D games</h2>
            <p data-aos="fade-up"  data-aos-duration="2000">Even if you are not a registered student or teacher you can still play free 3D games! Click on the button to view the 3D games that are not module specific</p>
            <MDBBtn color='danger'>See Board</MDBBtn> 
            </MDBCol>
         </MDBRow>

         <MDBRow className='list-item-card'>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000" >Leadership Board</h2>
            <p data-aos="fade-up"  data-aos-duration="2000" >Score will be awarded for each game, quiz and assignment submitted. Based on th score a leadership will be designed for each student enrolled in the module. View your ranking in a game, quiz, assignment or the entire module in general by viweing the Leadership board from the dashboard</p>
                       
             <MDBBtn color='danger'>See Board</MDBBtn>      
            </MDBCol>    
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'450px'}} animationData={leaderData}></Lottie>
            </MDBCol>
         </MDBRow>

         
         <MDBRow className='list-item-card'>
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'350px'}} animationData={notesData}></Lottie>            
            </MDBCol>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000" >Notes</h2>
                        <p data-aos="fade-up"  data-aos-duration="2000" >Allowing you to create & manage quick notes for modules instead of maintaining a seperate app for taking notes.
                            <br /> Available within "Notes" of the applications navigation-bar</p>
                            <MDBBtn color='danger'>Go to Notes</MDBBtn>      
            </MDBCol>
         </MDBRow>

         <MDBRow className='list-item-card'>
            <MDBCol className='card-info'>
            <h2 data-aos="fade-up"  data-aos-duration="2000" >Progression tracking</h2>
            <p data-aos="fade-up"  data-aos-duration="2000" >Progress bar on top of each module will give an idea of how much of the module is done. Paticipate in games, quiz and assignments to complete a module. 
            Available within "Course Dashboard"</p>
            <br /> <MDBBtn color='danger'>See Progress</MDBBtn> 
            </MDBCol>    
            <MDBCol>
            <Lottie data-aos="fade-up"  data-aos-duration="2000" style={{height:'350px'}} animationData={progressData}></Lottie>
            </MDBCol>
         </MDBRow>


        </div>

        
    </div>
);
}

export default Home