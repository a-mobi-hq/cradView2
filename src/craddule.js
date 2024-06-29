import React, { useCallback, useState, useRef,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import fol from './images/fol.png'; 

const Craddule = () => {
  const navigate = useNavigate()
 
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;
   const [selectedUsers, setSelectedUsers] = useState([]);

   const [showPicker, setShowPicker] = useState(false);
   const [selectedColor, setSelectedColor] = useState(''); // Initial color value
 
      // State variables to manage dropdown behavior
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedDate1, setSelectedDate1] = useState(null);
      const dropdownRef = useRef(null);
      const [types, setTypes] = useState([]);
      const [setError, error] = useState('');

      const [users, setUsers] = useState([]);
      
      
 
   const [loading, setLoading] = useState(false);
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
 
      // Function to handle date selection
      const handleDateSelect = (date) => {
       setSelectedDate(date);
       setIsDropdownOpen(false);
   };
 
 
   //Second Dropdown
 
         // State variables to manage dropdown behavior
         const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
         const [selectedOption1, setSelectedOption1] = useState('');
         const [selectStage, setSelectStage] = useState('');
         const dropdownRef1 = useRef(null);
 
         useEffect(() => {
          const fetchTypes = async () => {
              try {
                  const response = await axios.get(`${API_BASE_URL}/api/hub/types/${projectId}`);
                  console.log(response.data);
                  setTypes(response.data);
                 
              } catch (error) {
                  console.error('Error fetching types:', error);
                  
                 
              }
          };
       
          fetchTypes();
       }, []);


 


  return (

   
    <div className="">
    
    <div className='const'>
      <div className='row'>
      
        <div className='text-center'>
              <p className='taskHeader'>Craddule Hub</p>
              <p>View uploaded files</p>
        </div>
           <div className='modalStTask'>
              <div className='row'>
                  <div className='col-md-3'>
                    {types.map((type) => (
                      <div key={type} className='grid-item'>
                          <Link to={`/types/${type.timelineId}`} className='dd'>
                          <img src={fol} className='fol' ></img>
                            <p className='folP'>{type.task}</p>
                          </Link>
                      </div>
                  ))}
                  </div>
              </div>
           </div> 
          
             <Toaster  position="top-right" />
        </div>

      </div>
    </div>

   
  );
};

export default Craddule;
