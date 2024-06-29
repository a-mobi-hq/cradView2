// import React, { useState, useEffect, useRef } from 'react';
// import {CiCamera, CiShare1, CiFaceSmile, CiUndo, CiMobile1, CiPaperplane, CiCircleRemove, CiFolderOn} from 'react-icons/ci';
// import { useNavigate } from 'react-router-dom';
// import ReactDOM from "react-dom";
// import close from './closeB.png';




// export default function NotificationModal ({open, onClose}) {

//   //first dropdown
//     // State variables to manage dropdown behavior
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const dropdownRef = useRef(null);

  
//     // Function to toggle dropdown visibility
//     const toggleDropdown = () => {
//       setIsDropdownOpen(!isDropdownOpen);
//     };
  
//     // Function to handle option selection
//     const handleOptionSelect = (option) => {
//       setSelectedOption(option);
//       setIsDropdownOpen(false);
//     };

// //second dropdown
//     // State variables to manage dropdown behavior
//     const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
//     const [selectedOption1, setSelectedOption1] = useState('');
//     const dropdownRef1 = useRef(null);

  
//     // Function to toggle dropdown visibility
//     const toggleDropdown1 = () => {
//       setIsDropdownOpen1(!isDropdownOpen1);
//     };
  
//     // Function to handle option selection
//     const handleOptionSelect1 = (option) => {
//       setSelectedOption1(option);
//       setIsDropdownOpen1(false);
//     };


// // Close dropdown when clicking outside of it 1
// useEffect(() => {
//   const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setIsDropdownOpen(false);
//       }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);

// // Close dropdown when clicking outside of it 2
// useEffect(() => {
//   const handleClickOutside = (event) => {
//       if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
//           setIsDropdownOpen1(false);
//       }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);


//     const [isOpen, setIsOpen]= useState(false);
//     const navigate = useNavigate()
//     const onClickHandler = () => navigate(`/login`)
//     if(!open) return null
//     return ReactDOM.createPortal(
//     <>
//   <div className='container-fluid1 chat modalOv1'>
//   <div className='col-lg-3'>
//   <div className='newMHold'>
//   <div className='newMHold3'>
//     <div className='chatIcon1'>

//       <img src={close} className='iconSs3' onClick={onClose} type='button'></img>
//     </div>
   
  
 

      
      
      


   

  
//   </div>
//   </div>
//   </div>
//   </div>
//   </>,
//   document.getElementById('portal')
//   )
// }



