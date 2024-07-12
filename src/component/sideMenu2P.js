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
  const onClickCF = () => navigate(`/customFinancial`);

  const onClickCB = () => navigate(`/questionBapEs`);

  const onClickCV = () => navigate(`/questionVppVs`);

  const onClickS = () => navigate(`/questionSucIo`);

  const onClickD = () => navigate(`/questionDmaMa`);

  const onClickB = () => navigate(`/branding`);
  const onClickT = () => navigate(`/teamView`);


  const onClickCG = () => navigate(`/go`);

  const onClickCH = () => navigate(`/start`);

  const updateStreak = async () => {
    try {
     const projectId = localStorage.getItem('nProject');
      const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

      const response = await axios.post(API_BASE_URL+'/api/streak/', { userId,projectId });
      console.log(response);
      // setStreak(response.data.streak);
      // setLoading(false);
    } catch (error) {
      console.log(error.response)
    }
  };

  // Fetch streak when component mounts
  useEffect(() => {
    updateStreak();
  }, []);


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
            <span className='menuHeader'>Product Definition</span>
        </div>
       )}

        <li onClick={onClickCH}> 
          <CiBoxes />
          {!isCollapsed && <span>Home</span>}
        </li>

        <li onClick={onClickCB}> 
          <CiBoxes />
          {!isCollapsed && <span>Business Analysis Pack</span>}
        </li>
        <li onClick={onClickCV}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Value Proposition Pack (VPP)</span>}
        </li>

        <li onClick={onClickS}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Success Matrix</span>}
        </li>

        <li onClick={onClickT}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Getting Your Team</span>}
        </li>

        <li onClick={onClickD}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Detailed Marketing Strategies</span>}
        </li>

        <li onClick={onClickB}>
            <CiCalculator1 />
          
          {!isCollapsed && <span>Branding</span>}
        </li>

        <li onClick={onClickCG}>
        <CiGrid2V />
          {!isCollapsed && <span>Go no Go</span>}
        </li>

        {/* <li>

          <CiViewTimeline />
          {!isCollapsed && <span>Timeline Builder</span>}
        </li> */}
        
        <li>
            <CiServer />
          {!isCollapsed && <span>Summary Pdf</span>}
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
