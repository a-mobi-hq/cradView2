import React, {useEffect,useState,useRef} from 'react';
import { CiApple,CiMemoPad ,CiPaperplane,CiPen,CiEdit,CiLaptop,CiBank,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './deleteModal';
import DeactivateModal from './deactivateModal';


function SettingMenu () {
  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/generalSetting`);
  const onClickHandler1 = () => navigate(`/login`);
  const onClickHandler2 = () => navigate(`/privacy`);
  const onClickHandler3 = () => navigate(`/termAgreement`);
  const onClickHandler4 = () => navigate(`/pageSub`);
 {/*} const onClickHandler4 = () => navigate(`/deleteModal`);*/}


  const [isClosed, setIsClosed] = useState(false);
  const [isOpen, setIsOpen]= useState(false);
  const [isOpen1, setIsOpen1]= useState(false);
  const openNav = () => {
    console.log("here");
    setIsOpen(true);
  }
  
  const closeNav = () => {
    setIsOpen(false);
  }


  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSubmenuOpen1, setIsSubmenuOpen1] = useState(false);
  const [isSubmenuOpen2, setIsSubmenuOpen2] = useState(false);
  const [isSubmenuOpen3, setIsSubmenuOpen3] = useState(false);
  const [isSubmenuOpen4, setIsSubmenuOpen4] = useState(false);
  const [isSubmenuOpen5, setIsSubmenuOpen5] = useState(false);

  // Function to toggle the visibility of the submenu
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSubmenu1 = () => {
    setIsSubmenuOpen1(!isSubmenuOpen1);
  };

  const toggleSubmenu2 = () => {
    setIsSubmenuOpen2(!isSubmenuOpen2);
  };

  const toggleSubmenu3 = () => {
    setIsSubmenuOpen3(!isSubmenuOpen3);
  };

  const toggleSubmenu4 = () => {
    setIsSubmenuOpen4(!isSubmenuOpen4);
  };

  const toggleSubmenu5 = () => {
    setIsSubmenuOpen5(!isSubmenuOpen5);
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    navigate(`/login`);
}

  return(
  
  <div className='col-md-3'>
  <div className='newMHold'>

  
    <div className='newMHold2'>
       
      <ul className='newMUl'>
      {/*<h3>Setting</h3>*/}
          <li  className={isSubmenuOpen ? 'dropdown-trigger2-open' : 'dropdown-trigger2'} onClick={onClickHandler}> 
          <span>
            <span className={isSubmenuOpen ? 'iconS-open' : 'iconS'}><CiMemoPad /></span> Change Password
          </span>
          </li>

          <li  className={isSubmenuOpen1 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'} onClick={onClickHandler4}> 
            <span>
              <span className={isSubmenuOpen1 ? 'iconS-open' : 'iconS'}>< CiPaperplane /></span> Subscription and Billing
            </span>
          </li>

          <li className={isSubmenuOpen2 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'} onClick={onClickHandler3}> 
            <span>
              <span className={isSubmenuOpen2 ? 'iconS-open' : 'iconS'} ><CiPen /></span> Terms and Agreement
            </span>
          </li>

          <li className={isSubmenuOpen3 ? 'dropdown-trigger2-open' : 'dropdown-trigger2'} onClick={onClickHandler2}> 
            <span>
              <span className={isSubmenuOpen3 ? 'iconS-open' : 'iconS'}><CiEdit /></span> Privacy policy
            </span>
          </li>

      </ul>
    </div>

    <div className='newMHold1'>
    <ul className='newMUl'>
        
        <li className="dropdown-trigger2" onClick={logout}> <span className='iconS'><CiMicrochip /></span> Log Out</li>
        <li className="dropdown-trigger2" onClick={()=>setIsOpen1(true)}> <span className='iconS'><CiUser /></span>Deactivate</li>       
        <li className="dropdown-trigger2" onClick={()=>setIsOpen(true)}> <span className='iconS'><CiUser /></span>Delete Account</li>   
        {/* Add more items as needed */}
    </ul>
</div>
<DeleteModal open={isOpen} onClose={() => setIsOpen(false)}>

    </DeleteModal>
    <DeactivateModal open={isOpen1} onClose={() => setIsOpen1(false)}>

    </DeactivateModal>
</div>
</div>
  )
}


export default SettingMenu;
