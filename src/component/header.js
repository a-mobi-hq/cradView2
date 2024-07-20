import React, { useState, useEffect, useRef } from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import bbm from './../images/bggm.webp';
import bolt from './../images/bolt2.webp';
import { CiBellOn ,CiUser, CiChat2} from 'react-icons/ci';
import { MdOutlineBolt} from 'react-icons/md';
import ChatToolModal from './chatToolModal';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { checkTokenValidity } from '../util/auth';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const projectId = localStorage.getItem('nProject');
    const [isOpen, setIsOpen]= useState(false);
    const [projectName, setProjectName] = useState('');
    const [streak, setStreak] = useState('0');
    useEffect(() => {
        const { isValid, expired } = checkTokenValidity();
    
        if (!isValid || expired) {
          // Token doesn't exist or has expired, navigate user to login page
          window.location.href = '/login';
        }
      }, []);
      
    const fetchProjectName = async () => {
        try {
          const token = localStorage.getItem('access_token'); // Get the token from localStorage
          console.log(token);
          const response = await fetch(API_BASE_URL + `/api/project/user/${projectId}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch project name');
          }
          const data = await response.json();
          console.log(data);
          setProjectName(data.name);
        } catch (error) {
          console.error('Error fetching project name:', error);
        }
      };
  
      const updateStreak = async () => {
        try {
         const projectId = localStorage.getItem('nProject');
          const token = localStorage.getItem('access_token'); 
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
    
          const response = await axios.post(API_BASE_URL+'/api/streak/', { userId,projectId });
          console.log(response);
          console.log(response.data.streak);
          setStreak(response.data.streak);
    
          // setStreak(response.data.streak);
          // setLoading(false);
        } catch (error) {
          console.log(error.response)
        }
      };
     
      useEffect(() => {
        updateStreak();
      }, []);

  useEffect(() => {
    

    fetchProjectName();
  }, [projectId]);

    //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showDeleteButton1, setShowDeleteButton1] = useState(false);
    const dropdownRef = useRef(null);


  // Function to toggle dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotifyClick = () => {
    setShowDeleteButton(!showDeleteButton);
};


const handleNotifyClick1 = () => {
  setShowDeleteButton1(!showDeleteButton1);
};

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

   // Close dropdown when clicking outside of it 1
   useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsDropdownOpen(false);
            }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);


    
    return(
        <>
    <div className="headerH">
        <div className='row'>
            <div className='col-md-2'>
                <p className='pName'>{projectName}</p>
                <p className='pSlogan'>Just Do It</p>

            </div>

            <div className='col-md-7'>
                {/* <div class="proTop">
                    <img src={p2} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p3} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p4} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p5} alt="Circular Image" className="circular-image-top"/>
                </div> */}

               

            </div>

            <div className='col-md-3'>
                <div className='fll'>
                    {/* <span className='iconS2 mr'><CiBellOn /></span> */}
                    <div ref={dropdownRef} className="dropdown5 iconS2 mr">
                <div className={`select0 `}>
                 <span classname="selected" style={{color:"#fff"}}><MdOutlineBolt /><span className='streakTop'>{streak}</span></span>
                </div>
                <div className={`select0 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected" style={{color:"#fff"}}>{selectedOption || <CiBellOn />}</span>
                </div>
                {/* <div className='newMHold3'> */}
                <div className={`menu0  container-fluid1 ${isDropdownOpen ? 'menu-open0' : ''}`}>
                  
                 <div className='divNotify'>
                {/* <p className='notiHead' >Notification</p> */}
                
                <div className='displayDeletebutton'>
                <div className='notify' onClick={handleNotifyClick}>
                  <FontAwesomeIcon icon={faLightbulb} className='bulb'/>
                 <div className='notifyTxt'>
                  <p className='notifyHead'>Team Invite</p>
                  <p className='notBodi'>You have been added to Project A, <br></br>check Team's Menu to accept invitation</p>
                  <p className='notTime'> 1 day ago</p>
                 </div>
                 </div>
                 {showDeleteButton && (
                            <button className='deleteButtonNotify'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                        
                 </div>
                 <div className='displayDeletebutton'>
                <div className='notify' onClick={handleNotifyClick1}>
                  <FontAwesomeIcon icon={faLightbulb} className='bulb'/>
                 <div className='notifyTxt'>
                  <p className='notifyHead'>Team Invite</p>
                  <p className='notBodi'>You have been added to Project A, <br></br>check Team's Menu to accept invitation</p>
                  <p className='notTime'> 1 day ago</p>
                 </div>
                 </div>
                 {showDeleteButton1 && (
                            <button className='deleteButtonNotify'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                        
                 </div>
                 </div>
                </div>
            </div>
                   <span className='iconS2' type='button' style={{color:"#fff"}} onClick={()=>setIsOpen(true)}><CiChat2 /></span>
                </div>
            </div>
            <ChatToolModal open={isOpen} onClose={() => setIsOpen(false)}>

    </ChatToolModal>
        </div>
       
    </div>
    </>
    )
}

export default Header
