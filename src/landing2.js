import React, { useState,useEffect,useRef } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bci from './images/bc.png';
import bro from './images/bro.png';
import HeaderHome from './component/headerHome';
import MenuHome from './component/menuHome';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import API_BASE_WEB_URL from './config/apiConfigW';
import { jwtDecode } from "jwt-decode";

import p1 from './images/p1.jpeg';
import p2 from './images/p2.jpeg';
import p3 from './images/p3.jpeg';
import bolt from './images/bolt.png';
import Modal from './component/modal';
// import { validateToken } from './util/auth'; 







function LandingPage() {

   const navigate = useNavigate();

   

   useEffect(() => {

    const token = localStorage.getItem('access_token');

    if (!token) {
      // Navigate to login page if token is not found
      navigate('/login');
      return;
    }
    
  }, [navigate]);
    
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const [teamMembers, setTeamMembers] = useState([]);
const [projects, setProjects] = useState([]);
const [reviewProjects, setReviewProjects] = useState([]);
const [share, setShare] = useState([]);

const access_token = localStorage.getItem('access_token');
const decodedToken = jwtDecode(access_token);
const userId = decodedToken.userId;

const fetchTeamProjects= async () => {
  try {
    console.log(userId);
    const response = await fetch(`${API_BASE_URL}/api/team/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
      }
    });
    
    console.log("here");
    console.log("here");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data.data);
      setTeamMembers(data.data);
      console.log(teamMembers)
    }else{
      const result = await response.json();
      console.error('Error:', result['error']);
    }
   
  } catch (err) {
   
    console.log(err);
  }
};

const fetchReviewProjects= async () => {
  try {
    console.log(userId);
    const response = await fetch(`${API_BASE_URL}/api/share/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
      }
    });
    
    console.log("here");
    console.log("here");
    if (response.status === 200) {
      const data = await response.json();
      console.log("review");
      console.log(data.data);
      setReviewProjects(data.data);
      console.log(reviewProjects)
    }else{
      const result = await response.json();
      console.error('Error:', result['error']);
    }
   
  } catch (err) {
   
    console.log(err);
  }
};

const fetchUserProjects= async () => {
  try {
    console.log(userId);
    const response = await fetch(`${API_BASE_URL}/api/project/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
      }
    });
    
    console.log("here");
    console.log("here");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setProjects(data.data);
      console.log(teamMembers)
    }else{
      const result = await response.json();
      console.error('Error:', result['error']);
    }
   
  } catch (err) {
   
    console.log(err);
  }
};

const fetchSharedProjects= async () => {
  try {
    console.log(userId);
    const response = await fetch(`${API_BASE_URL}/api/share/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
      }
    });
    
    console.log("here");
    console.log("here");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data.data);
      setShare(data.data);
      console.log(teamMembers)
    }else{
      const result = await response.json();
      console.error('Error:', result['error']);
    }
   
  } catch (err) {
   
    console.log(err);
  }
};


const handleProjectClick = (projectId) => {
  localStorage.setItem('nProject', projectId);
  navigate(`/start`);
};

const handleProjectTeamClick = (projectId) => {
  localStorage.setItem('nProject', projectId);
  navigate(`/start`);
};

const handleProjectReviowClick = (reviewId) => {
  localStorage.setItem('nReview', reviewId);
  navigate(`/sharereview/${reviewId}`);
};

 useEffect(() => {
  fetchTeamProjects();
  fetchUserProjects();
  fetchReviewProjects();
        // const wow = new WOW.WOW();
        // wow.init();
      }, []);
  const [isOpen, setIsOpen]= useState(false);
    const [progress, setProgress] = useState(40);
    const [progressT, setProgressT] = useState(50);
    const [progressT2, setProgressT2] = useState(50);
    const [progressT3, setProgressT3] = useState(50);
    const [progressT4, setProgressT4] = useState(50);
  return (

   <div className='container-fluid'>
   
    <div className='row'>
    
   


  
  


    
  


      <p>Your Projects</p>
      <div className='row'>


      {projects.map(member => (
       
        <div className='col-md-3'  onClick={() => handleProjectClick(member._id)}>
        <div className='centerD'>
            <p className='pna'>{member.projectName}</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 
          </div> 
         

        ))}

    </div>

    <p>Projects You are Part of</p>
    <div className='row'>
    {teamMembers.map(member => (
      <div className='col-md-6'  onClick={() => handleProjectTeamClick(member.projectId)}>
      
        <div className='centerD'>
            <p className='pna'>{member.projectDetails.project}</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 
        </div>
      ))}
      </div>



    <p className='ra'>Review Projects</p>
    <div className='row'>
    {reviewProjects.map(member => (
      <div className='col-md-6'  onClick={() => handleProjectReviowClick(member._id)}>
        <div className='centerD'>
            <p className='pna'>{member.projectId.projectName}</p>
            <progress value={progress} max="100"></progress>
            <p className='pna2'>Job is 40% done</p>
            <div class="proTeam">
                      <img src={p3} alt="Circular Image" className="circular-image-top"/>
                  </div>

                  <div class="proTeam">
                      <img src={p2} alt="Circular Image" className="circular-image-top"/>
                  </div>
          </div> 
          
        </div>
      ))}
      </div>
     

   

     
    
    </div>
    
  

 
  </div> 


  );
}

export default LandingPage;
