import React, { useState, useEffect, useRef } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import API_BASE_URL from './apiConfig';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




export default function AddUserModal ( {open, onClose})  {
  const [isOpen, setIsOpen]= useState(false);

  // State variables to manage dropdown behavior
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [selectedOption, setSelectedOption] = useState('');
     const [error, setError] = useState(null);
     const [task, setTask] = useState([]);


     const dropdownRef = useRef(null);
     
    const projectId = localStorage.getItem('nProject');

  const [loading, setLoading] = useState(false);
  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  const navigate = useNavigate()
  const onClickHandler = () => navigate(`/pageFrontView`)

   // Function to toggle dropdown visibility
   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    
  };


  //Second Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
        const [selectedOption1, setSelectedOption1] = useState('');
        const dropdownRef1 = useRef(null);

      
        // Function to toggle dropdown visibility
        const toggleDropdown1 = () => {
          setIsDropdownOpen1(!isDropdownOpen1);
        };
      
        // Function to handle option selection
        const handleOptionSelect1 = (option) => {
          setSelectedOption1(option);
          setIsDropdownOpen1(false);
          
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
  
  // Close dropdown when clicking outside of it 2
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
            setIsDropdownOpen1(false);
        }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Fetch all tasks for the dropdown on component mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTask(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching tasks for the dropdown');
      }
    };

    fetchTasks();
  }, []);

  

  const getAllTaskById = async () => {
    try {
      console.log(projectId);
      const response = await fetch(`${API_BASE_URL}/api/task/${projectId}`, {
        method: 'GET',
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
        setTask(data.data);
        console.log(task)
        setLoading(false);
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
     
    } catch (err) {
      setError(err);
      setLoading(false);
      console.log(err);
      console.log(err.response.data);
    }
  };


  const fetchTeamMembers = async () => {
    try {
      console.log(projectId);
      const response = await fetch(`${API_BASE_URL}/api/team/${projectId}`, {
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
        setLoading(false);
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
     
    } catch (err) {
      setError(err);
      setLoading(false);
      console.log(err);
    }
  };


  useEffect(() => {
     
    console.log("work");

    getAllTaskById();
    fetchTeamMembers();
  }, [projectId]);




//   useEffect(() => {
//     // Simulating fetching user details from an API
//     const getAllTaskById = async () => {
//         try {

//           const response = await fetch(`${API_BASE_URL}/api/task/${projectId}/${task}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${access_token}`,
//             },
//           });
//             if (response.status === 200) {
//                 const data = await response.json();
//                 console.log(data);
//             } else {
//                 const data = await response.json();
//                 console.log(data);
//                 console.error('Failed to fetch task');
//             }
//         } catch (error) {
//             console.error('Error fetching task:', error);
//         }
//     };

//     getAllTaskById();
// }, []);

  if(!open) return null

   return ReactDOM.createPortal (
      <>
        <div className='modalOv'>
           <div className='modalSt2'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='taskHeader'>Add Users</p>
              <p>Here you can add team member and assign task</p>
              <hr className='dashHr'></hr>
              <div className='creatTask'>
                <div className='taskList'>
                    <p className='timeTxt'>Task</p>
                   
                    <div ref={dropdownRef} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">{selectedOption|| "Name"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1Tk ${isDropdownOpen ? 'menu-open1Tk' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("UI")}>UI</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("UX")}>UX</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Development")}>Development</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Testing")}>Testing</li>
                </ul>                                 
                </div>
                </div>
                <div className='taskList'>
                    <p className='timeTxt'>User</p>
                    {/* <input className='inpTask'></input> */}
                    <div ref={dropdownRef1} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen1 ? 'select-clicked1' : ''}`} onClick={toggleDropdown1}>
                  <span classname="selected">{selectedOption1|| "Name"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1Tk ${isDropdownOpen1 ? 'menu-open1Tk' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Jide Arowolo")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("David Arowolo")}>David Arowolo</li>
                </ul>                                 
                </div>
                </div>
                
              </div>
          
           <div className='shareImageDiv'><button type="submit" className="btn btn-primary curveImage" disabled={loading}>{ loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Proceed</span>}
                
              </button>
                    </div>
           </div> 
           
             <Toaster  position="top-right" />
        </div>
        </>,
        document.getElementById('portal')
     );
}