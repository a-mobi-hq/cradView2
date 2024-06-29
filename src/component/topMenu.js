import React, { useState, useEffect, useRef } from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import logo from './../images/CradduleL.png';
import { CiBellOn ,CiUser, CiChat2} from 'react-icons/ci';
import ChatToolModal from './chatToolModal';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { checkTokenValidity } from '../util/auth';

const TopMenu = () => {
    const [isOpen, setIsOpen]= useState(false);
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


  return (
    <div className="top-menu">
      <div className="menu-content">
        <div className="logo">
            <img src={logo} alt="Circular Image" className="mlogo"/>
        </div>
        <div className='fll'>
                    {/* <span className='iconS2 mr'><CiBellOn /></span> */}
                    <div ref={dropdownRef} className="dropdown5 iconS2 mr">
                <div className={`select0 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected" style={{color:"#000"}}>{selectedOption || <CiBellOn />}</span>
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
                   <span className='iconS2' type='button' style={{color:"#000"}} onClick={()=>setIsOpen(true)}><CiChat2 /></span>
                </div>
      </div>
    </div>
  );
};

export default TopMenu;
