import React, { useState, useEffect }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import YouTube from 'react-youtube';

export default function ModalVideo({ open, onClose}){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  
    
     
   
  
    useEffect(() => {
      // Set loading to true initially
      setLoading(true);
  
      // After ten seconds, set loading to false and show the button
      const timer = setTimeout(() => {
        setLoading(false);
        setShowButton(true);
      }, 10000);
  
      // Clear the timer when the component unmounts to avoid memory leaks
      return () => clearTimeout(timer);
    }, []); 
   
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="modalOv"></div>
            <div className="modalSt mdN">
            { errorMessage &&  <p className="createER">Project name is empty</p>}
               
            <YouTube videoId={'2lj31MHBgWM?si=p1u2RVuEXIvdO9C3?si=A18rj2PVfaowOWQj'} />
            
            {/* {showButton && ( */}
            <p onClick={onClose} className="closeMMM">Proceed</p>
              
            {/* )} */}
                
                
               
            </div>
        </>,
        document.getElementById('portalH')
    )

}