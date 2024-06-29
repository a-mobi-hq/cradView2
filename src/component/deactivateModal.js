import React, { useState } from 'react';
import closeB from './closeB.png'
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from '../config/apiConfig';
import { Toaster, toast } from 'sonner'


export default function DeactivateModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/login`)

    const [loading, setLoading] = useState(false);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const deactivate = async () => {
      setLoading(true);
      console.log("at change");
      try {
        
      
        const requestBody = { status: 'deactivated' };
        const response = await fetch(API_BASE_URL+'/api/user/status/'+userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify(requestBody),
        });

       // const data = response.json();
  
        if (response.status === 200) {
          console.log(response.status);
          console.log(response);
          const responseData = await response.json(); // Parse JSON response
          console.log(responseData);
          navigate('/login')
          //const { token } = responseData; // Access token directly from response
          setLoading(false);
          // Save access token to local storage
  
       
        } else {
          const result = await response.json();
          setLoading(false);
          toast.error(result['error']);
            console.error('Error:', result['error']);
          //console.error('Failed to create User');
        }
      } catch (error) {
        setLoading(false);
        console.error('An error occurred:', error);
      }
    };
    if(!open) return null
    return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt'>
              <div className='aboutDelete'>
                <p className='inviteTi'>Deactivate Account</p>
              <p className='subInvite'>Are you sure you want to temporarily Deactivate your Account?</p></div>
                <div className='deleteOption'>
                
                <button className="btn btn-primary deleteButtonDe"  disabled={loading} onClick={deactivate}>
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
              { !loading && <span>Deactivate Account</span>}
              
            </button>
                <button className="btn btn-primary deleteNoButton" onClick={onClose}>No</button>
                </div>
               
           </div>
           </div> 

          </>,   
            document.getElementById('portal')      
     );
}
