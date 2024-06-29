import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import closeB from './closeB.png';
import SectionInviteModal from './sectionInviteModal';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';






export default function CollaboratorModal ({open, onClose})  {
       // State variables to manage dropdown behavior
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const dropdownRef = useRef(null);


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


      //Third Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
        const [selectedOption2, setSelectedOption2] = useState('');
        const dropdownRef2 = useRef(null);

      
        // Function to toggle dropdown visibility
        const toggleDropdown2 = () => {
          setIsDropdownOpen2(!isDropdownOpen2);
        };
      
        // Function to handle option selection
        const handleOptionSelect2 = (option) => {
          setSelectedOption2(option);
          setIsDropdownOpen2(false);
          
        };

        //Fourth Dropdown

        // State variables to manage dropdown behavior
        const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
        const [selectedOption3, setSelectedOption3] = useState('');
        const [selectedDate3, setSelectedDate3] = useState(null);
        const dropdownRef3 = useRef(null);

      
        // Function to toggle dropdown visibility
        const toggleDropdown3 = () => {
          setIsDropdownOpen3(!isDropdownOpen3);
        };
      
        // Function to handle option selection
        const handleOptionSelect3 = (option) => {
          setSelectedOption3(option);
          setIsDropdownOpen3(false);
          
        };

             // Function to handle date selection
     const handleDateSelect3 = (date) => {
      setSelectedDate3(date);
      setIsDropdownOpen3(false);
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

// Close dropdown when clicking outside of it 3
useEffect(() => {
const handleClickOutside = (event) => {
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsDropdownOpen2(false);
    }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

// Close dropdown when clicking outside of it 4
useEffect(() => {
const handleClickOutside = (event) => {
  if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
      setIsDropdownOpen3(false);
  }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, []);


    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
  
    const onClickHandler = () => navigate(`/shareFile`)
   if(!open) return null
    return ReactDOM.createPortal (
        <>
        <div className='modalOv' >
           <div className='modalSt1'>
               <img src={closeB} className='closeB' type='button' onClick={onClose}></img>
        
               <div className='titleCenter'><p className='txtA'>Team Management</p>
              <p className='txtB'>Manage, assign and send invites</p></div>
              <input type="text" className='input' placeholder="Search.."></input>
              <hr></hr>
              <p className='txtS'>Add Collaborator</p>
              <div className='emailInvite'>
                <div ref={dropdownRef} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen ? 'select-clicked1' : ''}`} onClick={toggleDropdown}>
                  <span classname="selected">{selectedOption|| "Name"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Jide Arowolo")}>Jide Arowolo</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("David Arowolo")}>David Arowolo</li>
                </ul>                                 
                </div>
                <div ref={dropdownRef1} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen1 ? 'select-clicked1' : ''}`} onClick={toggleDropdown1}>
                  <span classname="selected">{selectedOption1|| "Select Task"}</span>
                    <div class="caret1"></div>
                 </div>
                 <ul className={`menu1 ${isDropdownOpen1 ? 'menu-open1' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("UI")}>UI</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("UX")}>UX</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Development")}>Development</li>
                </ul>                                 
                </div>
                <div ref={dropdownRef2} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen2 ? 'select-clicked2' : ''}`} onClick={toggleDropdown2}>
                  <span classname="selected">{selectedDate ? selectedDate.toLocaleDateString() : "Start Date"}</span>
                    <div class="caret1"></div>
                 </div>
                 {isDropdownOpen2 && (
                <div className="calendar-dropdown">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        inline
                    />
                </div>
            )}                                
                </div>
                <div ref={dropdownRef3} className="dropdown1">
                 <div className={`select1 ${isDropdownOpen3 ? 'select-clicked1' : ''}`} onClick={toggleDropdown3}>
                  <span classname="selected">{selectedDate3 ? selectedDate3.toLocaleDateString() : "End Date"}</span>
                    <div class="caret1"></div>
                 </div>
                 {isDropdownOpen3 && (
                <div className="calendar-dropdown">
                    <DatePicker
                        selected={selectedDate3}
                        onChange={handleDateSelect3}
                        inline
                    />
                </div>
            )}                                
                </div>
           </div>
           <div className='shareButtonDiv'>
           <button className="btn btn-primary curveInviteA" onClick={()=>setIsOpen(true)}>Add</button>
           </div>
           </div>       
           <SectionInviteModal open={isOpen} onClose={() => setIsOpen(false)}>

            </SectionInviteModal>   
        </div>
        </>,
            document.getElementById('portal')

     );
}

{/*<div className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">Select from team member</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Option 1")}>Jide Arowolo</li>
                </ul>
</div>*/}