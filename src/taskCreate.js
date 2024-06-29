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
import OrangeCheckbox from './component/checkBox';
const CreateTask = () => {
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
      const [teamMembers, setTeamMembers] = useState([]);
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
 
       
         // Function to toggle dropdown visibility
         const toggleDropdown1 = () => {
           setIsDropdownOpen1(!isDropdownOpen1);
         };
       
         // Function to handle option selection
         const handleOptionSelect1 = (option) => {
           setSelectedOption1(option);
           setIsDropdownOpen1(false);
           
         };
 
                 // Function to handle date selection
      const handleDateSelect1 = (date) => {
         setSelectedDate1(date);
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
 
   const handleButtonClick = () => {
     setShowPicker(!showPicker); // Toggle color picker visibility
   };
 
   const handleColorChange = (color) => {
     setSelectedColor(color.hex); // Update selected color
   };
   
 
   const [formData, setFormData] = useState({
       task: '',
      
   });
 
   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.id]: e.target.value,
     });
   };

   const handleChangeStage = (event) => {
    setSelectStage(event.target.value);
  };

  const handleChangeUsers = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedU, setIsCheckedU] = useState(false);

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  };
  const handleCheckboxChangeU = (e) => {
    console.log(e.target.checked);
    setIsCheckedU(e.target.checked);
  };

   const handleSubmit = (e) => {
     e.preventDefault();
     const projectId = localStorage.getItem('nProject');
 
     const updatedFormData = {
       color: selectedColor,
       startDate: selectedDate,
       endDate: selectedDate1,
       projectId: projectId,
       phase: selectStage,
       users: selectedUsers,
       question:isChecked,
       upload:isCheckedU,
       ...formData,
     };
    
     console.log(updatedFormData);
    createTask(updatedFormData);
 
    
   };

 

   useEffect(() => {
    fetchTeamMembers();
}, []);
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
        const userOptions = data.data.map(user => ({
            value: user.userId,
            label: user.userDetails.firstName
          }));
          console.log(userOptions);
          setUsers(userOptions);
        
        console.log(teamMembers)
        setLoading(false);
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
     
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

 
  
   const createTask = async (data) => {
    console.log("here");
     setLoading(true);

     try {
       console.log(data);
       console.log(JSON.stringify(data));
       const response = await fetch(API_BASE_URL+'/api/timeline',{
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${access_token}`,
         },
         body: JSON.stringify(data),
       });
       if (response.status === 200) {
         setLoading(false);
         console.log(response.status);
         console.log(response);   
         // window.location.reload();
         toast.success('Task Added');
  
         console.log('Task created successfully');
       } else {
         const result = await response.json();
         setLoading(false);
         toast.error(result['error']);
           console.error('Error:', result['error']);        
       }
     } catch (error) {
       setLoading(false);
       console.error('An error occurred:', error);
       console.log(error.response.data);
     }
   };
 

  return (

   
    <div className="">
    
    <div className='const'>
      <div className='row'>
      <form onSubmit={handleSubmit}>
        <div className='text-center'>
              <p className='taskHeader'>Create Task</p>
              <p>Here you can create and assign task</p>
        </div>
           <div className='modalStTask'>
               
            <div className='row'>
              <div className='col-md-6'>
                <p htmlFor="task" className='timeTxt'>Task</p>
                      <input 
                      className='inpTask'
                      type="text"
                    id="task"
                    value={formData.task}
                    onChange={handleChange}
                      />
              </div>

              <div className='col-md-6'>
                    <p className='timeTxt'>Color</p>
                          {/* <input className='inpTask'></input> */}
                          <input
                          id="color"
                          className='inpColor'
                          placeholder='Select Color'
                          readOnly
                          value={selectedColor} // Display selected color in the input field
                        />
                        <button
                          className="btn btn-primary forColor"
                          onClick={handleButtonClick}
                          type='button'
                        >
                          {showPicker ? 'Add Color' : 'Select Color'}
                        
                        </button>
              </div>


              <div className='col-md-4'>
                  <select value={selectStage} 
                    onChange={handleChangeStage}
                    className='dropT'
                    >
                          <option value="" disabled>Select an option</option>
                          <option value="BusinessCaseBuilder">Business Case Builder</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                          <option value="option5">Option 5</option>
                          <option value="option6">Option 6</option>
                          <option value="option7">Option 7</option>
                      </select>


                    {showPicker && (
                      <div className="pickerStylesT">
                        <SketchPicker
                          color={selectedColor}
                          onChange={handleColorChange}
                          presetColors={[]}
                          disableAlpha
                        />
                        
                      
                      </div>
                    )}
              </div>

              <div className='col-md-4'>
                      <p className='timeTxt'>Start Date</p>
                            <div ref={dropdownRef} className="dropdown1">
                        <div className={`select1 ${isDropdownOpen ? 'select-clicked2' : ''}`} onClick={toggleDropdown}>
                          <span classname="selected">{selectedDate ? selectedDate.toLocaleDateString() : "Start Date"}</span>
                            <div class="caret1"></div>
                        </div>
                        {isDropdownOpen && (
                        <div className="calendar-dropdownT">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                  setSelectedDate(date);
                                  setIsDropdownOpen(false);
                                }}
                                inline
                            />
                        </div>
                    )}                                
                        </div>
              </div>


              <div className='col-md-4'>
                          <p className='timeTxt'>End Date</p>
                                <div ref={dropdownRef1} className="dropdown1">
                                        <div className={`select1 ${isDropdownOpen1 ? 'select-clicked1' : ''}`} onClick={toggleDropdown1}>
                                          <span classname="selected">{selectedDate1 ? selectedDate1.toLocaleDateString() : "End Date"}</span>
                                            <div className="caret1"></div>
                                        </div>
                                        {isDropdownOpen1 && (
                                        <div className="calendar-dropdownT">
                                            <DatePicker
                                                selected={selectedDate1}
                                                onChange={(date) => {
                                                  setSelectedDate1(date);
                                                  setIsDropdownOpen1(false);
                                                }}
                                                inline
                                            />
                                        </div>
                                    )} 

                     
                                                    
                                </div>

              </div>

              <div className='col-md-12'>
                      <Select
                isMulti
                options={users}
                value={selectedUsers}
                onChange={handleChangeUsers}
                className='dropT2'
              />
              </div>

              <div className='col-md-2'>
              <input 
                type="checkbox" 
                label="Questions"
                name="terms"
                checked={isChecked} // Bind checked attribute to state
                onChange={handleCheckboxChange}
              />
              <span style={{paddingLeft:10}}>Questions</span>
              </div>

              <div className='col-md-2'>
              <input 
                type="checkbox" 
                label="Uploads"
                name="terms"
                checked={isCheckedU} // Bind checked attribute to state
                onChange={handleCheckboxChangeU}
              />
              <span style={{paddingLeft:10}}>Upload</span>
               </div>

              


            </div>
              
        
           <div className='taskButtonDiv'><button type="submit" className="btn btn-primary curveImage" disabled={loading}>
            { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Proceed</span>}
                
              </button>
                    </div>
           </div> 
           </form>
             <Toaster  position="top-right" />
        </div>

      </div>
    </div>

   
  );
};

export default CreateTask;
