import React, { useState,useEffect,useRef } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bci from './images/bc.png';
import depth from './images/depth.png';
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

import ModalStart from './component/modalStartStop';





function LandingPage() {

   const navigate = useNavigate();

   const backgroundImage = `url(${depth})`;

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
  const handleShow = () => setIsOpen(true);

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


useEffect(() => {
  fetchTeamProjects();
  fetchUserProjects();
  fetchReviewProjects();
        // const wow = new WOW.WOW();
        // wow.init();
      }, []);
  
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

//  useEffect(() => {
//   fetchTeamProjects();
//   fetchUserProjects();
//   fetchReviewProjects();
//         // const wow = new WOW.WOW();
//         // wow.init();
//       }, []);
  const [isOpen, setIsOpen]= useState(false);
    const [progress, setProgress] = useState(40);
    const [progressT, setProgressT] = useState(50);
    const [progressT2, setProgressT2] = useState(50);
    const [progressT3, setProgressT3] = useState(50);
    const [progressT4, setProgressT4] = useState(50);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
  
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
  
      // Get the correct suffix for the day
      const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };
  
      const dayWithSuffix = day + getDaySuffix(day);
  
      return `${dayWithSuffix} ${month} ${year}`;
    };

  return (
<div style={{backgroundColor:"#fff", minHeight:"100vh"}}>
   <div className='container'>
    <div className='proSeg'>
      <p className='proMain'>Projects <span className='proAdd' onClick={handleShow}>+</span></p>
      {projects.length > 0 && <p className='proSubTitle'>Owned By You</p>}
      {projects.map(member => (
      <div className='row' style={{marginBottom:20}}>

          <div className='col-md-4'>
            <p className='proSlog'>Started {formatDate(member.timeSent)}</p>
            <p className='proName'>{member.projectName}</p>
            
            <p className='proCon' onClick={() => handleProjectClick(member._id)}>Continue</p>
          </div>

          <div className='col-md-4'>
          </div>

          <div className='col-md-4'>
            <div className='proImg' style={{backgroundImage}}>

            </div>
          </div>
      </div>

      ))}


   
          {teamMembers.length > 0 && <p className='proSubTitle'>Team Member</p>}
          {teamMembers.map(member => (
          <div className='row' style={{marginBottom:20}}>

              <div className='col-md-4'>
              <p className='proSlog'>Started {formatDate(member.timeSent)}</p>
                <p className='proName'>{member.projectDetails.project}</p>
                
                <p className='proCon' onClick={() => handleProjectTeamClick(member.projectId)}>Continue</p>
              </div>

              <div className='col-md-4'>
              </div>

              <div className='col-md-4'>
                <div className='proImg' style={{backgroundImage}}>

                </div>
              </div>
          </div>

          ))}

          {reviewProjects.length > 0 && <p className='proSubTitle'>Review Project</p>}
          {reviewProjects.map(member => (
          <div className='row' style={{marginBottom:20}}>

              <div className='col-md-4'>
              <p className='proSlog'>Started {formatDate(member.timeSent)}</p>
                <p className='proName'>{member.projectName}</p>
                
                <p className='proCon' onClick={() => handleProjectReviowClick(member._id)}>Continue</p>
              </div>

              <div className='col-md-4'>
              </div>

              <div className='col-md-4'>
                <div className='proImg' style={{backgroundImage}}>

                </div>
              </div>
          </div>

          ))}

    </div>
    
    
  </div> 
  <ModalStart open={isOpen} onClose={() => setIsOpen(false)}>

</ModalStart>
  </div>
  );
}

export default LandingPage;
