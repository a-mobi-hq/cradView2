import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import logobg from './images/logobg.png'; 
import ModalVideo from './component/modalVideo';
import ModalQuestion from './component/modalQuestion';

function CreateProject() {


  const [isOpen, setIsOpen]= useState(true);
  const [isOpen2, setIsOpen2]= useState(true);
    

  return (
    <div>
      <div className='createPG'>
        {/* <img src={logobg} className='createPI'></img> */}
      </div>

      <ModalVideo open={isOpen} onClose={() => setIsOpen(true)}>

      </ModalVideo>
  
    </div>
  );
}

export default CreateProject;
