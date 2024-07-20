import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { faHome, faUser, faCog, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";

const SideMenu2 = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const navigate = useNavigate();

  const onClickCB = () => navigate(`/questionBusMain/InitialDesign/DomainName`);

  const onClickCV = () => navigate(`/questionBusMain/InitialDesign/TrademarkOrCopyright`);

  const onClickD = () => navigate(`/questionBusMain/InitialDesign/StakeholdersEngagement`);

  const onClickCH = () => navigate(`/start`);
  const onClickCG = () => navigate(`/go/InitialDesign`);




  function handleLogout() {
    // Clear local storage
    localStorage.clear();
    
    // Redirect to login page or any other appropriate action
    window.location.href = '/login';
  }

  return (
    <>
    
    <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isCollapsed ? faPlus : faTimes} className='close2'/>
      </div>
      <ul>
      {!isCollapsed && (
        <div className='text-center'>
            <span className='menuHeader'>Initial Design</span>
        </div>
       )}

        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={onClickCB}> 
          <CiBoxes />
          {!isCollapsed && <span>Domain Name</span>}
        </li>

      

        <li onClick={onClickD}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Stakeholders Engagement</span>}
        </li>

        <li>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Summary Pdf</span>}
        </li>


        <li onClick={onClickCG}>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
        </li>

      
       
        {!isCollapsed && (
        <div className='text-center'>
            <hr className='buiy'></hr>
            <p style={{paddingTop:0}}>Account</p>
        </div>
        )}
        {/* <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Change Password</span>}
        </li>

        <li>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Edit Profile</span>}
        </li> */}

        <li onClick={handleLogout}>
          <FontAwesomeIcon icon={faCog} />
          {!isCollapsed && <span>Logout</span>}
        </li>

      </ul>
    </div>
    </>
  );
};

export default SideMenu2;
