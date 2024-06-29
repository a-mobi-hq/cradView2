import React, {useEffect,useState,useRef} from 'react';
import { CiApple,CiMemoPad ,CiPaperplane,CiPen,CiEdit,CiLaptop,CiBank,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';


function MenuHome () {
  const [isClosed, setIsClosed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
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


  return(
  
  <div className='col-md-3'>
  <div className='newMHold'>


    <div className='newMHold1'>
    <ul className='newMUl'>
        
        <li className="dropdown-trigger2"> <span className='iconS'><CiMicrochip /></span> Team Management</li>
        <li className="dropdown-trigger2"> <span className='iconS'><CiUser /></span> Profile</li>
        <li className="dropdown-trigger2"> <span className='iconS'><CiSettings /></span>Craddule Hub</li>
       
        {/* Add more items as needed */}
    </ul>


    

</div>
</div>
</div>
  )
}


export default MenuHome;